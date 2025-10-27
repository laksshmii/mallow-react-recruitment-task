import * as React from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";

const ActionContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 20px;
  cursor: pointer;
  transition: background 0.3s ease, opacity 0.2s ease;
`;

const EditBtn = styled(ActionBtn)`
  background-color: #007bff;

  &:hover {
    background-color: #0069d9;
  }
`;

const DeleteBtn = styled(ActionBtn)`
  background-color: #ff4d4f;

  &:hover {
    background-color: #e04344;
  }
`;

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <ActionContainer>
      <EditBtn onClick={onEdit}>
        <FaIcons.FaEdit size={14} />
        Edit
      </EditBtn>
      <DeleteBtn onClick={onDelete}>
        <FaIcons.FaTrash size={14} />
        Delete
      </DeleteBtn>
    </ActionContainer>
  );
};
