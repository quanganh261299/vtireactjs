import axios from 'axios';
import * as React from "react";
import { useState } from "react";
import { Form, useParams, redirect, useNavigate } from 'react-router-dom';
import { envApi } from "../../enviroment";

import { Button, Divider, Space, notification } from 'antd';
import { RadiusUpleftOutlined } from '@ant-design/icons';

// redirect data
import { Navigate } from 'react-router-dom';

import { useRef, useContext } from 'react';
import { Context } from '../../routes/root';

export default function DataEditComponent() {

    const [contact, setContact] = useState({ name: '', address: '', avatar: '', phone: '' });
    const paramUrl = useParams('dataId');

    // const theme = useContext(Context);

    //khai báo context khởi tạo
    const [api, contextHolder] = notification.useNotification();
    //khởi tạo mở ra thông báo lấy dữ liệu từ context
    const openNotification = (placement) => {
        api.info({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement,
        });
    };

    const navigate = useNavigate();

    // khai bao input ref name
    const inputRefName = useRef(null);
    const inputRefAress = useRef(null);
    const inputRefAvatar = useRef(null);
    const inputRefPhone = useRef(null);

    React.useEffect(() => {
        // call api get lay ra chi tiet cua item user data
        if (paramUrl?.dataId) {
            axios.get(envApi + `/${paramUrl?.dataId}`).then(res => setContact(res.data));
        }
    }, []);

    const handlePostData = async () => {
        // lay name tuong ung khi nhap
        console.log('handlePostData', inputRefName.current.value);
        // btvn kiem tra du lieu dung dang so hay bat buoc nhap chua thi moi gui api
        const dataPost = {
            name: inputRefName.current.value,
            phone: inputRefPhone.current.value,
            address: inputRefAress.current.value,
            avatar: inputRefAvatar.current.value
        }

        // call api
        await axios.put(envApi + `/${paramUrl?.dataId}`, dataPost).then(res => {
            console.log('oke');
            openNotification('topLeft');
        }).then(() => {
            setTimeout(() => {
                navigate('/data');
            }, 1500);
        })
            .catch(err => console.log(err, 'opp'));

        // return redirect('/data');

        return;

    }

    return (
        <>
            {contextHolder}
            <Button
                type="primary"
                onClick={() => openNotification('topLeft')}
                icon={<RadiusUpleftOutlined />}
            >
                topLeft
            </Button>
            <Form id="contact-form">
                <label>
                    <span>Name</span>
                    <input
                        placeholder="name"
                        aria-label="Last name"
                        type="text"
                        name="name"
                        ref={inputRefName}
                        defaultValue={contact.name}
                    />
                </label>
                <label>
                    <span>Adress</span>
                    <input
                        type="text"
                        name="address"
                        placeholder="@jack"
                        defaultValue={contact.address}
                        ref={inputRefAress}
                    />
                </label>
                <label>
                    <span>Avatar</span>
                    <input
                        placeholder="https://example.com/avatar.jpg"
                        aria-label="Avatar URL"
                        type="text"
                        name="avatar"
                        defaultValue={contact.avatar}
                        ref={inputRefAvatar}
                    />
                </label>
                <label>
                    <span>phone</span>
                    <input
                        type="text"
                        name="phone"
                        placeholder="@098"
                        defaultValue={contact.phone}
                        ref={inputRefPhone}
                    />
                </label>
                <p>
                    <button type="button" onClick={handlePostData}>Save</button>
                    <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                </p>
            </Form>
        </>
    )
} 