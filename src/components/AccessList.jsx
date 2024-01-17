import { useRef, useState } from "react"
import { API_ACCESS, API_ROLE_ACCESS, API_ROLE_ACCESS_GET, API_ROLE_ACCESS_ID, ROLE_LIST } from "../links";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { api } from "../api";
import { Input, Switch } from "antd";
import { Card, Button, message } from 'antd';
import { Space, Table } from 'antd';
const { Column } = Table;

export default () => {
    const [accessList, setAccess] = useState([]);
    const [role, setRole] = useState({});
    const refdata = useRef([]);
    const { id } = useParams()
    const getList = () => {
        api.get(API_ACCESS)
            .then(e => {
                return api.get(API_ROLE_ACCESS_ID.replace(":id", id))
                    .then(a => {
                        setRole(a.data.role)
                        return e.data.data.map(aa => {
                            return {
                                ...aa,
                                status: !a.data.data.some(f => f.access_id == aa.name),
                                role_access: a.data.data.find(f => f.access_id == aa.name)?.id
                            }
                        })
                    })
            })
            .then(e => {
                refdata.current = e
                setAccess(e)
            }).catch(reason => {

            });
    }
    useEffect(() => {
        getList()
        return () => setAccess([])
    }, []);

    const switchAccess = (access) => {
        if (!access.status) {
            api.delete(API_ROLE_ACCESS_GET.replace(":id", access.role_access))
                .then(e => {
                    getList();
                    message.success("Access Granted")
                });
        } else {
            api.post(API_ROLE_ACCESS, { role_id: id, access_id: access.name })
                .then(e => {
                    getList();
                    message.warning("Access Denied")
                });
        }
        return false
    }

    const onFilter = (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
            || record.uri.toLowerCase().includes(value.toLowerCase())
            || record.method.toLowerCase().includes(value.toLowerCase());
    };

    const onSearch = (value) => {
        const filtered = refdata.current.filter((record) => onFilter(value.target.value, record));
        setAccess(filtered);
    };
    return (
        <Card title={'Access List For Role : ' + role.name} extra={
            <Space direction="horizontal">
                <Input.Search
                    placeholder="Search name"
                    onChange={onSearch}
                />
                <Link to={ROLE_LIST}>
                    <Button type="primary">Role List</Button>
                </Link>
            </Space>
        }>

            <Table dataSource={accessList}>
                <Column title="Name" dataIndex="name" key="name" filterSearch />
                <Column title="Method" dataIndex="method" key="method" filterSearch />
                <Column filterSearch
                    title="Path"
                    dataIndex="uri"
                    key="uri"
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Switch checked={record.status} onChange={() => {
                            switchAccess(record)
                        }} />
                    )}
                />
            </Table>
        </Card>
    )
}