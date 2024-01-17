import { useState } from "react"
import { API_ROLE, API_ROLE_GET, ROLE_ACCESS, ROLE_ADD, ROLE_UPDATE } from "../links";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api";
import { Card, Button, Popconfirm, message } from 'antd';
import { Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, KeyOutlined } from "@ant-design/icons";
const { Column } = Table;


export default () => {
    const [roles, setRoles] = useState([]);
    const history = useNavigate()
    const getList = () => {
        api.get(API_ROLE)
            .then(e => {
                if (e.data.flag) {
                    setRoles(e.data.data)
                }
            });
    }
    useEffect(() => {
        getList()
        return () => setRoles([])
    }, []);

    const deleteConfirm = (id) => {

        api.delete(API_ROLE_GET.replace(":id", id))
            .then(e => {
                message.success('Role deleted');
                getList();
            });
        return false
    }

    return (
        <Card title="Role List" extra={
            <Link to={ROLE_ADD}>
                <Button type="primary">Add Role</Button>
            </Link>
        }>

            <Table dataSource={roles}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                    title="Users"
                    dataIndex="users"
                    key="users"
                    render={(users) => (
                        <>
                            {users.map((user) => (
                                <Tag color="blue" key={user.id}>
                                    {user.name}
                                </Tag>
                            ))}
                        </>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button shape="circle" onClick={() => { history(ROLE_UPDATE.replace(":id", record.id)) }} icon={<EditOutlined />} />
                            <Button shape="circle" onClick={() => { history(ROLE_ACCESS.replace(":id", record.id)) }} icon={<KeyOutlined />} />
                            <Popconfirm
                                title="Delete"
                                description={`Are you sure you want to delete role '${record.name}'?`}
                                onConfirm={() => { deleteConfirm(record.id) }}
                            >
                                <Button danger shape="circle" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </Card>
    )
}