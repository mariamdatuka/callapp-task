import { Table,Button,Modal, Input,Select,Form} from "antd";
import 'antd/dist/antd.css';
import userStore,{User} from '../Store/Store';
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const MyTable = () => {
    const {users, loading, error, fetchUsers, addUser, deleteUser, updateUser} = userStore();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        address: {
          street: "",
          city: "",
        },
        phone: "",
        id: 0,
      });

    const { Option } = Select;
    const [form] = Form.useForm();

    //get all data on initial rendering
    useEffect(()=>{
       fetchUsers();
    }, [])

    //open Modal on button Click
    const openModal=()=>{
        setIsOpen(true);
    }

    //close Modal on "cancel" button and mask click
    const closeModal=()=>{
        setIsOpen(false);
    }

  //handle form on submit
  const handleSubmitForm = async() => {
    try {
      const values= await form.validateFields();
      const newUser: User = {
        ...values,
        id: users.length + 1, // Generate a unique ID based on the current number of users
      };
      console.log(newUser);
      await addUser(newUser);
      closeModal();
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  //handle delete on button click
  const handleDelete=async(id:number)=>{
    try {
      await deleteUser(id);
    } catch (error) {
       console.log(error);
    }
  }

  //handle update when user changes existing info 
  const handleUpdate=async(id:number, newData:User)=>{
    try {
      const values= await form.validateFields();
      const updateValues:User={...values}
      await updateUser(id,updateValues);
      setIsModalOpen(false);
    } catch (error) {
       console.log(error);
    }
  }

  //handle double click
  const handleDoubleClick=(record:User)=>{
       setSelectedUser(record);
       setFormData(record);
       setIsModalOpen(true);
  }
 
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
        {
          title: 'Actions',
          key: 'actions',
          render: (text: string, record: User) => (
            <Button type="link" danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          ),
        },
      ];

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
  
    return (
    <>
<Button onClick={openModal}>Add Item</Button>
<Button>
      <Link to="/pieChart">PieChart</Link>
  </Button>
<Modal title='Add Item'
            open={isOpen}
            onCancel={closeModal}
            onOk={handleSubmitForm}
            >
   <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onFinish={handleSubmitForm}
     >
    <Form.Item
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please enter a name' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please enter an email' }]}
    >
      <Input type="email" />
    </Form.Item>
    <Form.Item
      label="Gender"
      name="gender"
      rules={[{ required: true, message: 'Please select a gender' }]}
    >
      <Select>
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
      </Select>
    </Form.Item>
    <Form.Item
      label="Street"
      name={['address', 'street']}
      rules={[{ required: true, message: 'Please enter a street address' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="City"
      name={['address', 'city']}
      rules={[{ required: true, message: 'Please enter a city' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please enter a phone number' }]}
    >
      <Input />
    </Form.Item>
  </Form>
</Modal>
<Modal
  title='update Info'
  open={isModalOpen}
  onOk={()=>handleUpdate(selectedUser.id, formData)}
  onCancel={() => {
          setSelectedUser(null);
          setIsModalOpen(false);
        }}>
    <Form
  form={form}
  layout="vertical"
  initialValues={formData}
>
  <Form.Item
    label="Name"
    name="name"
    rules={[{ required: true, message: 'Please enter a name' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Email"
    name="email"
    rules={[{ required: true, message: 'Please enter an email' }]}
  >
    <Input type="email" />
  </Form.Item>
  <Form.Item
    label="Gender"
    name="gender"
    rules={[{ required: true, message: 'Please select a gender' }]}
  >
    <Select>
      <Option value="male">Male</Option>
      <Option value="female">Female</Option>
    </Select>
  </Form.Item>
  <Form.Item
    label="Street"
    name={['address', 'street']}
    rules={[{ required: true, message: 'Please enter a street address' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="City"
    name={['address', 'city']}
    rules={[{ required: true, message: 'Please enter a city' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Phone"
    name="phone"
    rules={[{ required: true, message: 'Please enter a phone number' }]}
  >
    <Input />
  </Form.Item>
</Form>

</Modal>
<Table onRow={(record:User) => ({
    onDoubleClick: () => handleDoubleClick(record),
  })} dataSource={users} columns={columns} rowKey='id'/>
    </>
    )
  }
  
  export default MyTable