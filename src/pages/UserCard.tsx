import React from "react";
import styled from "styled-components";
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

interface UserCardProps {
  avatar: string;
  name: string;
  email: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  padding: 24px 16px;
  transition: 0.3s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.15);

    .overlay {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
`;

const Name = styled.h3`
  font-size: 18px;
  color: #111;
  margin: 0;
`;

const Email = styled.p`
  font-size: 14px;
  color: #666;
  margin: 6px 0 0 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  opacity: 0;
  visibility: hidden;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: 0.3s ease;
`;

const IconButton = styled.button<{ color: string }>`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: ${(p) => p.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const UserCard: React.FC<UserCardProps> = ({ avatar, name, email, onEdit, onDelete }) => (
  <Card>
    <Avatar src={avatar} alt={name} />
    <Name>{name}</Name>
    <Email>{email}</Email>
    <Overlay className="overlay">
      <IconButton color="#7b6ef6" onClick={onEdit}>
        <FiEdit />
      </IconButton>
      <IconButton color="#e74c3c" onClick={onDelete}>
        <FaTrashAlt />
      </IconButton>
    </Overlay>
  </Card>
);

export default UserCard;
