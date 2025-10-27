
import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";

interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  profileImageLink: string;
}

interface Props {
  initialValues?: Partial<UserFormValues>;
  loading?: boolean;
  onSubmit?: (values: UserFormValues) => void;
  onClose?: () => void;
}

const Container = styled.div`
  width: 560px;
  max-width: calc(100% - 32px);
  max-height: 90vh;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 90vw;
    max-width: 500px;
    max-height: 75vh;
  }
  
  @media (max-width: 480px) {
    width: 95vw;
    max-width: 350px;
    max-height: 80vh;
    margin: 0.5rem;
  }
`;

const Header = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 480px) {
    padding: 16px 20px;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
`;

const ScrollableFormWrapper = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

const Body = styled.div`
  padding: 22px 24px;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 480px) {
    padding: 18px 20px;
  }
`;

const FieldWrapper = styled.div`
  margin-bottom: 22px;
  width: 100%;
  
  @media (max-width: 480px) {
    margin-bottom: 18px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
  }
`;

const Footer = styled.div`
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  background: #fff;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    padding: 10px 16px;
    flex-direction: column;
    gap: 6px;
  }
`;

const SmallButton = styled(Button)`
  padding: 6px 16px;
  font-size: 14px;
  min-width: 80px;
  width: auto;
  
  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const RequiredStar = styled.span`
  color: #d32f2f;
  margin-right: 8px;
`;

const generatePassword = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  profileImageLink: Yup.string().url("Must be a valid URL").required("Profile image link is required"),
});

export const CreateUser: React.FC<Props> = ({
  initialValues,
  loading = false,
  onSubmit,
  onClose,
}) => {
  const isEditing = !!initialValues?.email;
  const defaults: UserFormValues = {
    firstName: initialValues?.firstName ?? "",
    lastName: initialValues?.lastName ?? "",
    email: initialValues?.email ?? "",
    profileImageLink: initialValues?.profileImageLink ?? "",
  };

  return (
    <Container role="dialog" aria-labelledby="create-user-title">
      <Header>
        <Title id="create-user-title">{isEditing ? 'Edit User' : 'Create New User'}</Title>
        <CloseBtn aria-label="Close" onClick={onClose}>
          ✕
        </CloseBtn>
      </Header>

      <ScrollableFormWrapper>
        <Formik
          initialValues={defaults}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            
            let payload;
            if (isEditing) {
              payload = {
                name: `${values.firstName} ${values.lastName}`,
                job: "Developer" 
              };
            } else {
              payload = {
                email: "eve.holt@reqres.in",
                password: "pistol"
              };
            }
            
            if (onSubmit) {
              onSubmit(payload as any);
            } else {
              console.log(isEditing ? "Update user" : "Create user", payload);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form id="user-form">
              <Body>
                <FieldWrapper>
                  <label htmlFor="firstName">
                    <RequiredStar>*</RequiredStar>
                    First Name
                  </label>
                  <FormField name="firstName" label="" placeholder="Please enter first name" />
                </FieldWrapper>

                <FieldWrapper>
                  <label htmlFor="lastName">
                    <RequiredStar>*</RequiredStar>
                    Last Name
                  </label>
                  <FormField name="lastName" label="" placeholder="Please enter last name" />
                </FieldWrapper>

                <FieldWrapper>
                  <label htmlFor="email">
                    <RequiredStar>*</RequiredStar>
                    Email
                  </label>
                  <FormField name="email" label="" type="email" placeholder="Please enter email" />
                </FieldWrapper>

                <FieldWrapper>
                  <label htmlFor="profileImageLink">
                    <RequiredStar>*</RequiredStar>
                    Profile Image Link
                  </label>
                  <FormField name="profileImageLink" label="" placeholder="Please enter profile image link" />
                </FieldWrapper>

              </Body>
            </Form>
          )}
        </Formik>
      </ScrollableFormWrapper>

      <Footer>
        <SmallButton type="button" onClick={onClose} disabled={loading} style={{ background: '#6c757d' }}>
          Cancel
        </SmallButton>
        <SmallButton type="submit" form="user-form" disabled={loading}>
          {isEditing ? 'Update' : 'Submit'}
        </SmallButton>
      </Footer>
    </Container>
  );
};

export default CreateUser;
