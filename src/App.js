import React, { useState, useEffect } from 'react';
import { Row, Col, Modal, Form, Input, Button } from 'antd';
import UserCard from './UserCard';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Add isLiked property to each user object
        setUsers(data.map(user => ({ ...user, isLiked: false })));
        setIsLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleLike = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isLiked: !user.isLiked } : user
    ));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
  };

  const handleModalOk = (values) => {
    const updatedUsers = users.map(user => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          name: values.name,
          email: values.email,
          phone: values.phone,
          website: values.website,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* You can replace this with an Ant Design Spinner if you prefer */}
        <div className="sk-chase">...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {users.map(user => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <UserCard
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onLike={handleLike}
            />
          </Col>
        ))}
      </Row>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleModalCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleModalOk}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email', message: 'Please input a valid Email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your Phone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: 'Please input your Website!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;