import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.tsx';
import { UsersPage } from './pages/UsersPage.tsx';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store.ts';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './theme/ThemeContext.tsx';
import { RootState } from './store/store.ts';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
  }
`;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </Provider>
);

export default App;
