import React from 'react';
import { Card, Button } from 'antd';
import { HeartOutlined, HeartFilled, EditOutlined, DeleteFilled, MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';

const { Meta } = Card;

const UserCard = ({ user, onDelete, onEdit, onLike }) => {
  const { id, name, email, phone, website, username, isLiked } = user;
  const avatarUrl = `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;

  const actions = [
    <Button 
      type="link" 
      icon={isLiked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} 
      onClick={() => onLike(id)}
    />,
    <Button 
      type="link" 
      icon={<EditOutlined />} 
      onClick={() => onEdit(user)}
    />,
    <Button 
      type="link" 
      icon={<DeleteFilled />} 
      onClick={() => onDelete(id)}
    />
  ];

  return (
    <Card
      style={{ width: '100%' }}
      cover={<img alt="example" src={avatarUrl} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />}
      actions={actions}
    >
      <Meta
        title={name}
        description={
          <div>
            <p><MailOutlined /> {email}</p>
            <p><PhoneOutlined /> {phone}</p>
            <p><GlobalOutlined /> {website}</p>
          </div>
        }
      />
    </Card>
  );
};

export default UserCard;