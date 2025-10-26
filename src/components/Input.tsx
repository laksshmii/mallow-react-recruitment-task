import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <Wrapper>
    {label && <Label>{label}</Label>}
    <StyledInput {...props} />
  </Wrapper>
);
