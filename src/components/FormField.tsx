import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const ErrorText = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type = 'text', placeholder }) => {
  return (
    <FieldContainer>
      <Label htmlFor={name}>{label}</Label>
      <StyledField
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={ErrorText} />
    </FieldContainer>
  );
};