import { Outlet, NavLink, Form, useLoaderData, redirect, useNavigation } from "react-router-dom";
import { createContact, getContacts } from "../contacts";

//import antd
import React, { useMemo } from 'react';
import { useAuth } from '../main';

import { useSelector } from "react-redux";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
  // return {contact};
}

//khởi tạo giá trị lưu giữ context name ban đầu
//nơi lưu trữ ngoài root khởi tạo
export const Context = React.createContext(null);

export default function Root() {
  const { contacts } = useLoaderData();
  let authStore = useAuth();

  //khai báo 1 function hook
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  //kiểm tra xem đã điều hướng loading được dữ liệu lên hết chưa
  const navigation = useNavigation();
  console.log('authStore', authStore);

  const user = localStorage.getItem('user');

  const logout = () => {
    authStore.signout();
    navigation('/login');
  }


  const bg = useSelector((state) => state.bg.backgroundColor);

  return (
    <>
      <Context.Provider value={contextValue}>
        <div id="sidebar">
          <h1 onClick={() => logout()}>Logout</h1>
          <div className={bg}>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <div className="data-res">
            <h5>{user ? `Xin chao ${user} !` : ''}</h5>
          </div>
          <div className="data-res">
            <h4 style={{ color: 'blue' }}>
              <NavLink to={`data`}>
                Click me send data
              </NavLink>
            </h4>
          </div>
          <nav>
            <ul>
              {contacts.length ? (
                <ul>
                  {contacts.map((contact) => (
                    <li key={contact.id}>
                      <NavLink to={`contacts/${contact.id}`}
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "active"
                            : isPending
                              ? "pending"
                              : ""
                        }
                      >

                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  <i>No contacts</i>
                </p>
              )}
            </ul>
          </nav>
        </div>
        <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
          <Outlet />
        </div>
      </Context.Provider>
    </>
  );
}