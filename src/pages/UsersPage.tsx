import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { GenericListView } from '@/components/lists';
import { fetchUsersTable, deleteUser, UserRecord } from '@/services/usersService';
import { useUiStore } from '@/store/uiStore';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useUiStore();

  // Row handlers - actions for each row
  const handleViewUser = useCallback(
    (row: UserRecord) => {
      // Navigate to user details page
      const userId = row.id || row.email; // Use ID if available, otherwise email as fallback
      navigate(`/app/users/${userId}`);
    },
    [navigate]
  );

  const handleEditUser = useCallback(
    (row: UserRecord) => {
      // Navigate to edit user page
      const userId = row.id || row.email;
      navigate(`/app/users/${userId}/edit`);
    },
    [navigate]
  );

  const handleDeleteUser = useCallback(
    async (row: UserRecord) => {
      // Confirm deletion
      const confirmed = window.confirm(`Czy na pewno chcesz usunąć użytkownika ${row.full_name}?`);
      if (!confirmed) return;

      try {
        const userId = row.id || row.email;
        await deleteUser(userId as string);

        addToast({
          id: crypto.randomUUID(),
          message: `Użytkownik ${row.full_name} został usunięty`,
          severity: 'success'
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Wystąpił błąd podczas usuwania';
        addToast({
          id: crypto.randomUUID(),
          message,
          severity: 'error'
        });
      }
    },
    [addToast]
  );

  // General handlers - actions in toolbar
  const handleCreateUser = useCallback(() => {
    navigate('/app/users/create');
  }, [navigate]);

  // Bulk handlers - actions for selected rows
  const handleBulkNotify = useCallback(
    async (rows: UserRecord[]) => {
      // Send notification to selected users
      addToast({
        id: crypto.randomUUID(),
        message: `Wysłano powiadomienie do ${rows.length} użytkowników`,
        severity: 'success'
      });
    },
    [addToast]
  );

  // Combined handlers map
  const handlers = {
    // Row actions (from backend actions[])
    view: handleViewUser,
    edit: handleEditUser,
    delete: handleDeleteUser,
    // General actions (from backend generalActions[])
    create: handleCreateUser
  };

  // Bulk handlers map
  const bulkHandlers = {
    'bulk-notify': handleBulkNotify
  };

  // Bulk actions definition
  const bulkActions = [
    {
      label: 'Wyślij powiadomienie zbiorcze',
      handler: 'bulk-notify',
      variant: 'outlined' as const,
      icon: <CheckBoxOutlinedIcon />
    }
  ];

  return (
    <Box>
      <GenericListView<UserRecord>
        title="Lista Użytkowników"
        fetcher={fetchUsersTable}
        handlers={handlers}
        bulkActions={bulkActions}
        bulkHandlers={bulkHandlers}
        rowKey={(row) => String(row.id || row.email)}
        initialPerPage={10}
      />
    </Box>
  );
};

export default UsersPage;
