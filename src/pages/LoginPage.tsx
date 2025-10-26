import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../theme/styled.d.ts';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormField } from '../components/FormField.tsx';
import { Button } from '../components/Button.tsx';
import { Skeleton } from '../components/Skeleton.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../features/auth/authThunks.ts';
import { RootState, AppDispatch } from '../store/store';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
`;

const Card = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  width: 100%;
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.lg};
    max-width: 350px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.sm};
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
  margin: 0;
`;

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    if (token) {
      toast.success('Login successful! Welcome back.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/users');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(loginThunk(values));
  };

  return (
    <Container>
      <Card>
        <Title>Log in</Title>
        <Formik
          initialValues={{ email: 'eve.holt@reqres.in', password: 'cityslicka' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {loading ? (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <Skeleton height="16px" width="60px" />
                  <div style={{ marginTop: '0.5rem' }}>
                    <Skeleton height="40px" />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <Skeleton height="16px" width="80px" />
                  <div style={{ marginTop: '0.5rem' }}>
                    <Skeleton height="40px" />
                  </div>
                </div>
                <Skeleton height="40px" />
              </>
            ) : (
              <>
                <FormField name="email" label="Email" type="email" />
                <FormField name="password" label="Password" type="password" />
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit" disabled={loading}>
                  Log in
                </Button>
              </>
            )}
          </Form>
        </Formik>
      </Card>
      <ToastContainer />
    </Container>
  );
};
