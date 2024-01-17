import React, { useRef } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_ROLE, API_ROLE_GET, API_USERS, ROLE_LIST } from '../links';
import { api } from "../api";
import { useEffect } from 'react';

import { Card, Button, Form, message, Row, Col } from 'antd';
import { Space, Select, Input } from 'antd';

export default ({ isNewRecord }) => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const history = useNavigate();
    const { id } = useParams()
    const onFinish = (e) => {
        if (isNewRecord) {
            api.post(API_ROLE, e)
                .then(e => {
                    history(ROLE_LIST)
                });
        } else {
            api.put(API_ROLE + "/" + id, e)
                .then(e => {
                    history(ROLE_LIST)
                });
        }

    }

    useEffect(() => {
        api.get(API_USERS)
            .then(e => {
                const user = e.data.data?.map(e => {
                    return { label: e.name, value: e.id };
                })
                setUsers(user);
            })
        if (id) {
            api.get(API_ROLE_GET.replace(":id", id))
                .then(e => {
                    if (e.data.flag) {
                        form.setFieldValue("name", e.data.data.name)
                        form.setFieldValue("users", e.data.data.users)
                    }
                })
        }
    }, [])
    return (
        <Card title={isNewRecord ? "Add Role" : "Update Role"} extra={
            <Link to={ROLE_LIST}>
                <Button type="primary">Back</Button>
            </Link>
        }>
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Name"
                            name={"name"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Name cannot be empty',
                                },
                            ]}
                        >
                            <Input type='text' placeholder="Enter Role Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Users"
                            name={"users"}
                            rules={[
                                {
                                    required: true,
                                    message: 'User cannot be empty',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="select users"
                                optionLabelProp="label"
                                options={users}
                                optionRender={(option) => (
                                    <Space>
                                        {option.label}
                                    </Space>
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button htmlType="submit" type={isNewRecord ? "primary" : "default"}>{isNewRecord ? "Add" : "Update"}</Button>
                </Form.Item>
            </Form>
        </Card>
    );

}