import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 8px;
`;

export const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = props => (
  <Wrapper>
    <input type="checkbox" {...props} />
    <span>Remember me</span>
  </Wrapper>
);
