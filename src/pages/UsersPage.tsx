import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/Button';
import * as FaIcons from 'react-icons/fa';
import { ActionButtons } from '../components/ActionButtons';
import CardGrid from './CardGrid';
import { TableRowSkeleton, CardSkeleton } from '../components/Skeleton';
import { CreateUser } from './Adduser';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { TopBar } from '../components/TopBar';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/usersApi';
import { logoutUser } from '../api/authApi';
import { RootState, AppDispatch } from '../store/store';

/* ======================= STYLES ======================= */

const PageWrapper = styled.div`
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.text};
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadows.md};
  margin: 2rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1rem;
  }
`;

const PageHeader = styled.h2`
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ControlsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }
`;

const ViewSwitch = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid #dee2e6;
    background: #fff;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background: #f1f3f5;
    }
  }
`;
const SearchControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 100%;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }
`;

const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 0.4rem 2.5rem 0.4rem 0.8rem;
    width: 180px; /* 🔹 compact width on desktop */
    outline: none;
    transition: width 0.3s ease;

    &:focus {
      width: 220px; /* expand slightly on focus */
    }

    @media (max-width: 768px) {
      width: 100%; /* 🔹 full width on mobile */
    }
  }

  button {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #6c757d;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
  }
`;

const SmallButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    flex-shrink: 0;
  }
`;


const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  background: #fff;
  -webkit-overflow-scrolling: touch;
  max-height: calc(100vh - 320px);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: ${props => props.theme.colors.gray100};
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${props => props.theme.colors.gray100};
`;

const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  vertical-align: middle;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  border-top: 1px solid #dee2e6;
  padding: 0.8rem 0;
  gap: 0.4rem;
  position: sticky;
  bottom: 0;
  z-index: 5;

  button {
    border: 1px solid #dee2e6;
    background: #fff;
    border-radius: 4px;
    padding: 0.3rem 0.7rem;
    cursor: pointer;

    &:hover {
      background: #f1f3f5;
    }

    &.active {
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

/* ======================= COMPONENT ======================= */

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.users
  );
  const [view, setView] = useState<'table' | 'card'>('table');
  const [search, setSearch] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; userId: number | null }>({
    show: false,
    userId: null,
  });

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchUsers(page));
  };

  const handleEdit = (id: number) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setEditingUser({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        profileImageLink: user.avatar,
      });
      setShowAddUser(true);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteConfirm({ show: true, userId: id });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.userId) {
      try {
        await dispatch(deleteUser(deleteConfirm.userId)).unwrap();
        toast.success('User deleted successfully!');
      } catch {
        toast.error('Failed to delete user.');
      }
    }
    setDeleteConfirm({ show: false, userId: null });
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully!');
    } catch {
      toast.error('Logout failed.');
    }
  };

  const handleCreateUser = async (payload: any) => {
    try {
      if (editingUser?.id) {
        await dispatch(updateUser({ id: editingUser.id, userData: payload })).unwrap();
        toast.success('User updated successfully!');
      } else {
        await dispatch(createUser(payload)).unwrap();
        toast.success('User created successfully!');
      }
      setShowAddUser(false);
      setEditingUser(null);
      dispatch(fetchUsers(currentPage));
    } catch {
      toast.error('Failed to save user.');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(search.toLowerCase()) ||
      u.last_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <TopBar userName="Emma" onLogout={handleLogout} />
      <CardWrapper>
        <PageHeader>Users List</PageHeader>

        <ControlsBar>
          <ViewSwitch>
            <button onClick={() => setView('table')}>
              <FaIcons.FaThList /> Table
            </button>
            <button onClick={() => setView('card')}>
              <FaIcons.FaThLarge /> Card
            </button>
          </ViewSwitch>

          <SearchControls>
            <SearchBar>
              <input
                type="text"
                placeholder="input search text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button><FaIcons.FaSearch /></button>
            </SearchBar>
            <SmallButton onClick={() => setShowAddUser(true)}>Create User</SmallButton>
          </SearchControls>
        </ControlsBar>

        {loading ? (
          view === 'table' ? (
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th></Th>
                    <Th>Email</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRowSkeleton key={i} />
                  ))}
                </tbody>
              </Table>
            </TableContainer>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem',
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )
        ) : view === 'table' ? (
          <>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <Th></Th>
                    <Th>Email</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <Td><Avatar src={u.avatar} alt={u.first_name} /></Td>
                      <Td><a href={`mailto:${u.email}`}>{u.email}</a></Td>
                      <Td>{u.first_name}</Td>
                      <Td>{u.last_name}</Td>
                      <Td>
                        <ActionButtons onEdit={() => handleEdit(u.id)} onDelete={() => handleDelete(u.id)} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableContainer>
            <Pagination>
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
            </Pagination>
          </>
        ) : (
          <CardGrid users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </CardWrapper>

      {showAddUser && (
        <ModalOverlay onClick={() => setShowAddUser(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <CreateUser
              loading={loading}
              initialValues={editingUser}
              onSubmit={handleCreateUser}
              onClose={() => {
                setShowAddUser(false);
                setEditingUser(null);
              }}
            />
          </div>
        </ModalOverlay>
      )}

      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ show: false, userId: null })}
      />

      <ToastContainer />
    </PageWrapper>
  );
};
