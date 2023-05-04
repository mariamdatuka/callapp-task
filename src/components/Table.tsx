import { Table,Button,Modal} from "antd";
import userStore from '../Store/Store';
import { useEffect,useState } from "react";


const MyTable = () => {
    const { users, loading, error, fetchUsers } = userStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(()=>{
       fetchUsers();
    }, [])

 /*   const addUser=()=>{
        setIsOpen(true);
    }

    const closeModal=()=>{
        setIsOpen(false);
    }
  
*/
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
          dataIndex: ['address', 'street'],
          key: 'street',
        },
        {
          title: 'City',
          dataIndex: ['address', 'city'],
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
    
  
    return <Table dataSource={users} columns={columns} rowKey='id'/>;
  }
  
  export default MyTable;