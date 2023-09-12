import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {

  // tạo kết nối giả đến server để lấy dữ liệu
  await fakeNetwork(`getContacts:${query}`);
  
  // lấy contacts đã được lưu ở indexDB (1 database ảo mà website tạo để lưu dữ liệu của trang mà ta truy cập)
  // tạo 1 mảng contacts
  let contacts = await localforage.getItem("contacts");

  // Kiểm tra nếu mảng contacts không có dữ liệu thì trả về mảng rỗng
  if (!contacts) contacts = [];

// Sử dụng hàm matchSorter để lọc và sắp xếp danh sách contacts dựa trên từ khóa tìm kiếm (query), với các trường "first" và "last"
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }

  // Sắp xếp danh sách contacts theo họ và thời điểm tạo, sau đó trả về kết quả
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  // tạo 1 kết nối giả lập
  await fakeNetwork();
  // Tạo 1 chuỗi id duy nhất 
  let id = Math.random().toString(36).substring(2, 9);
  //tạo 1 object contact với id và createdAt
  // Với id gán với id ngẫu nhiên bên trên (viết tắt id ~ id : id)
  // và createdAt: gán với giá trị thời gian hiện tại
  let contact = { id, createdAt: Date.now() };
  // lấy ra một danh sách mảng contacts
  let contacts = await getContacts();
  // thêm object contact vừa tạo vào mảng đã get ra vào đầu
  contacts.unshift(contact);
  // set lại mảng contacts với dữ liệu mới
  await set(contacts);
  // trả về contact mới tạo
  return contact;
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`); // tạo kết nối giả lập
  let contacts = await localforage.getItem("contacts"); //lấy mảng contacts ra
  let contact = contacts?.find(contact => contact.id === id); // lấy contact trong mảng contact có id cần tìm, nếu không có thì không tìm
  return contact ?? null; // nếu có thì trả ra contact, không thì trả ra chính nó (null)
}

export async function updateContact(id, updates) {
  await fakeNetwork(); // tạo kết nối giả lập
  // lấy ra một danh sách contacts
  let contacts = await localforage.getItem("contacts");
  // tìm object contact với id tương ứng với list contact bên trên
  let contact = contacts.find(contact => contact.id === id);
  // nếu không có thì báo lỗi
  if (!contact) throw new Error("No contact found for", id);
  // nếu tìm được thì gán contact tìm được bằng cái object updates mà mình thêm vào form khi nãy
  Object.assign(contact, updates);
  // thực hiện set lại giá trị trong mảng contacts
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  // gọi list contacts ra
  let contacts = await localforage.getItem("contacts");
  // tìm contact có id tương ứng trong list contacts
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}