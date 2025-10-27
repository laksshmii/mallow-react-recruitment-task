import React from "react";
import styled from "styled-components";
import UserCard from "./UserCard";

interface CardGridProps {
  users: {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  }[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const CardGrid: React.FC<CardGridProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Grid>
      {users.map((user) => (
        <UserCard
          key={user.id}
          avatar={user.avatar}
          name={`${user.first_name} ${user.last_name}`}
          email={user.email}
          onEdit={() => onEdit(user.id)}
          onDelete={() => onDelete(user.id)}
        />
      ))}
    </Grid>
  );
};

export default CardGrid;
