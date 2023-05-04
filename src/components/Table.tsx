import { Table } from "antd";
import userStore from '../Store/Store';
import { useEffect } from "react";


const MyTable = () => {
    const { users, loading, error, fetchUsers } = userStore();

    useEffect(()=>{
       fetchUsers();
    }, [])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: 'Street',
          dataIndex: 'street',
          key: 'street',
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
      ];

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
  
    return <Table dataSource={users} columns={columns}/>;
  }
  
  export default MyTable;