import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { GenericListView } from '@/components/lists';
import { fetchUsersTable, restoreUser, UserRecord } from '@/services/usersService';
import { useUiStore } from '@/store/uiStore';
import AddUserDialog from '@/components/dialogs/AddUserDialog';
import EditUserDialog from '@/components/dialogs/EditUserDialog';
import DeleteUserDialog from '@/components/dialogs/DeleteUserDialog';
import type { AddUserFormValues, EditUserFormValues } from '@/utils/formSchemas';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useUiStore();
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [refreshKey, setRefreshKey] = useState<number | undefined>(undefined);

  // Row handlers - actions for each row
  const handleViewUser = useCallback(
    (row: UserRecord) => {
      // Navigate to user details page, pass row data via state
      const userId = row.id || row.email; // Use ID if available, otherwise email as fallback
      navigate(`/app/users/${userId}`, { state: { user: row } });
    },
    [navigate]
  );

  const handleEditUser = useCallback((row: UserRecord) => {
    // Open edit dialog with user data
    setSelectedUser(row);
    setEditUserDialogOpen(true);
  }, []);

  const handleDeleteUser = useCallback((row: UserRecord) => {
    // Open delete confirmation dialog
    setSelectedUser(row);
    setDeleteUserDialogOpen(true);
  }, []);

  const handleRestoreUser = useCallback(
    async (row: UserRecord) => {
      if (!row.id) {
        addToast({
          id: crypto.randomUUID(),
          message: 'Brak identyfikatora użytkownika',
          severity: 'error'
        });
        return;
      }

      try {
        await restoreUser(row.id);
        addToast({
          id: crypto.randomUUID(),
          message: `Użytkownik ${row.full_name} został przywrócony`,
          severity: 'success'
        });
        setRefreshKey(Date.now());
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Wystąpił błąd podczas przywracania';
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
    setAddUserDialogOpen(true);
  }, []);

  // Handle dialog close
  const handleAddUserDialogClose = useCallback(() => {
    setAddUserDialogOpen(false);
  }, []);

  // Handle user created successfully
  const handleUserCreated = useCallback((data: AddUserFormValues, generatedPassword: string) => {
    // Optionally refresh the list or show additional feedback
    console.log('User created:', data.email, 'Password:', generatedPassword);
  }, []);

  // Handle dialog close
  const handleEditUserDialogClose = useCallback(() => {
    setEditUserDialogOpen(false);
    setSelectedUser(null);
  }, []);

  // Handle user updated successfully
  const handleUserUpdated = useCallback(
    (data: EditUserFormValues) => {
      addToast({
        id: crypto.randomUUID(),
        message: `Użytkownik ${data.email} został zaktualizowany`,
        severity: 'success'
      });
    },
    [addToast]
  );

  // Handle delete dialog close
  const handleDeleteUserDialogClose = useCallback(() => {
    setDeleteUserDialogOpen(false);
    setSelectedUser(null);
  }, []);

  // Handle user deleted successfully
  const handleUserDeleted = useCallback(async () => {
    if (!selectedUser) return;

    try {
      addToast({
        id: crypto.randomUUID(),
        message: `Użytkownik ${selectedUser.full_name} został usunięty`,
        severity: 'success'
      });
      setRefreshKey(Date.now());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Wystąpił błąd podczas usuwania';
      addToast({
        id: crypto.randomUUID(),
        message,
        severity: 'error'
      });
    }
  }, [selectedUser, addToast]);

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
    'view-user': handleViewUser,
    edit: handleEditUser,
    'edit-user': handleEditUser,
    delete: handleDeleteUser,
    'delete-user': handleDeleteUser,
    'restore-user': handleRestoreUser,
    // General actions (from backend generalActions[])
    'create-user': handleCreateUser
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
        refreshKey={refreshKey}
      />

      <AddUserDialog
        open={addUserDialogOpen}
        onClose={handleAddUserDialogClose}
        onSuccess={handleUserCreated}
      />

      <EditUserDialog
        open={editUserDialogOpen}
        onClose={handleEditUserDialogClose}
        user={selectedUser}
        onSuccess={handleUserUpdated}
      />

      <DeleteUserDialog
        open={deleteUserDialogOpen}
        onClose={handleDeleteUserDialogClose}
        user={selectedUser}
        onSuccess={handleUserDeleted}
      />
    </Box>
  );
};

export default UsersPage;
