import * as React from "react";
// antd
import { Avatar, List, Modal } from "antd";
import { Link, NavLink } from 'react-router-dom';

// axios call API
import axios, { isCancel, AxiosError } from "axios";

import { useEffect, useState } from "react";

//enviroment
import { envApi } from "../../enviroment";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateText } from "../../couter/couterSlice";
import { updateBg } from "../../couter/bgSlice";


export default function DataComponent() {
    const [data, setData] = useState([]);

    const callApi = () => {
        const data = axios
            .get(envApi)
            .then((res) => {
                console.log("res", res);
                setData(res?.data);
            })
            .catch((err) => console.log(err));
        return () => data;
    }

    useEffect(() => {
        callApi();
    }, []);

    // khai báo store và lấy dữ liệu từ store
    // lấy ra giá trị từ store
    const count = useSelector((state) => state.counter.name);
    // lấy ra hành động tăng giảm store
    const dispatch = useDispatch();

    const [value, setValue] = useState('');


    const handleUpdateStore = (e) => {
        e.preventDefault();
        dispatch(updateText(value));
    }

    const handleChangeColorSearch = (e) => {
        e.preventDefault();
        dispatch(updateBg('green'));
    }

    const handleChangeColorSearchOriginal = (e) => {
        e.preventDefault();
        dispatch(updateBg('red'));git 
    }

    //show item
    const [itemInfor, setItemInfor] = useState(null);

    //show modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [itemDelete, setItemDelete] = useState(null);

    const handleShowModal = (item, index) => {
        setIsModalOpen(true);
        setItemInfor(item);
    }

    const handleOk = () => {
        setItemInfor(null);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setItemInfor(null);
        setIsModalOpen(false);
    };

    const handleDelete = (item, index) => {
        setItemDelete(item);
        setIsModalOpenDelete(true);
    }

    const handleDeleteOk = (item) => {
        axios
            .delete(envApi + `/${item.id}`)
            .then(res => {
                console.log('res', res);
            })
            .then(() => {
                callApi();
                setIsModalOpenDelete(false);
            })
            .catch(err => console.log(err));
    };

    const handleDeleteCancel = () => {
        setIsModalOpenDelete(false);
    };

    return (
        <>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item actions={[
                        <NavLink to={`dataDetail/${item.id}`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                        >
                            <p key="list-loadmore-edit">edit</p>
                        </NavLink>,
                        <p key="list-loadmore-more" onClick={() => handleShowModal(item, index)}>more</p>,
                        <p key="list-loadmore-more" onClick={() => handleDelete(item, index)}>delete</p>
                    ]}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                />
                            }
                            title={item.name}
                            description={item.address + '--' + item.phone}
                        />
                    </List.Item>
                )}
            />

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>This is state of Store: {count}</p>
                <form>
                    <input type="text" value={value} name="name" onChange={(e) => setValue(e.target.value)} />
                    <button type="submit" onClick={(e) => handleUpdateStore(e)}>Click me!</button>
                </form>

                <button type="button" onClick={(e) => handleChangeColorSearch(e)}>Change Color</button>
                <button type="button" onClick={(e) => handleChangeColorSearchOriginal(e)}>Change Color</button>
            </Modal>

            <Modal title="Cảnh báo" open={isModalOpenDelete} onOk={() => handleDeleteOk(itemDelete)} onCancel={handleDeleteCancel}>
                <p>Bạn có chắc muốn xóa không?</p>
            </Modal>
        </>
    );
}
