import React from 'react';
import styled from 'styled-components';
import { FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../theme/ThemeContext.tsx';

const Header = styled.header`
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  height: 35px;
  box-shadow: ${props => props.theme.shadows.sm};
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }
`;

const Brand = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const IconButton = styled.button`
  background: #e63946;
  color: #fff;
  border: none;
  padding: 0.4rem 0.7rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;

  &:hover {
    background: #c72c3a;
  }
`;

const ThemeButton = styled.button`
  background: #ffc107;
  color: #000;
  border: none;
  padding: 0.4rem 0.7rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;

  &:hover {
    background: #e0a800;
  }
`;

interface TopBarProps {
  userName: string;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ userName, onLogout }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Header>
      <Brand>User List</Brand>

      <RightSection>
        <UserName>{userName}</UserName>
        <ThemeButton onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeButton>
        <IconButton onClick={onLogout}>
          <FaSignOutAlt />
        </IconButton>
      </RightSection>
    </Header>
  );
};
