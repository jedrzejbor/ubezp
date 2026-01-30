import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  IconButton,
  Chip,
  Skeleton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { ColumnDef, GenericRecord, ActionDef } from '@/types/genericList';

interface MobileCardListRendererProps<T extends GenericRecord = GenericRecord> {
  columns: ColumnDef[];
  data: T[];
  loading: boolean;
  onRowAction: (handler: string, row: T) => void;
  getRowId: (row: T) => string;
}

// Get status chip color
const getStatusColor = (status: string): 'success' | 'error' | 'warning' | 'info' | 'default' => {
  const lowerStatus = status?.toLowerCase() || '';
  if (lowerStatus.includes('aktywny') || lowerStatus.includes('active')) return 'success';
  if (
    lowerStatus.includes('nieaktywny') ||
    lowerStatus.includes('inactive') ||
    lowerStatus.includes('nie aktywny')
  )
    return 'error';
  if (lowerStatus.includes('pending') || lowerStatus.includes('oczekuje')) return 'warning';
  return 'default';
};

export const MobileCardListRenderer = <T extends GenericRecord = GenericRecord>({
  columns,
  data,
  loading,
  onRowAction,
  getRowId
}: MobileCardListRendererProps<T>) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRow, setMenuRow] = useState<T | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuRow(null);
  };

  const handleMenuAction = (handler: string) => {
    if (menuRow) {
      onRowAction(handler, menuRow);
    }
    handleMenuClose();
  };

  // Loading skeleton
  if (loading) {
    return (
      <Stack spacing={2}>
        {[...Array(3)].map((_, index) => (
          <Card key={index} sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="60%" height={24} />
                  <Skeleton width="40%" height={20} />
                  <Skeleton width="80%" height={16} sx={{ mt: 1 }} />
                  <Skeleton width="50%" height={16} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Brak danych do wyświetlenia
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Spróbuj zmienić filtry lub dodaj nowe rekordy
        </Typography>
      </Box>
    );
  }

  // Find title column (full_name or first text column)
  const titleColumn =
    columns.find((c) => c.type === 'full_name') || columns.find((c) => c.type === 'text');

  // Find subtitle column (company or second column)
  const subtitleColumn = columns.find((c) => c.property === 'company' || c.property === 'position');

  // Other columns to display (excluding title, subtitle, and actions)
  const detailColumns = columns.filter(
    (c) =>
      c.type !== 'actions' &&
      c.property !== titleColumn?.property &&
      c.property !== subtitleColumn?.property
  );

  return (
    <Stack spacing={2}>
      {data.map((row) => {
        const rowId = getRowId(row);
        const rowActions = (row.actions as ActionDef[]) || [];

        // Get title value
        const titleValue = titleColumn?.property ? String(row[titleColumn.property] || '') : '';
        const subtitleValue = subtitleColumn?.property
          ? String(row[subtitleColumn.property] || '')
          : '';

        return (
          <Card
            key={rowId}
            sx={{
              bgcolor: 'background.paper',
              borderRadius: '12px',
              boxShadow: 'none',
              border: '1px solid',
              borderColor: '#E5E7EB',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }
            }}
          >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Stack spacing={1.5}>
                {/* Header row: Title + Menu */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '18px',
                      lineHeight: '24px',
                      color: '#1E1F21',
                      flex: 1,
                      pr: 1
                    }}
                  >
                    {titleValue || '—'}
                  </Typography>

                  {rowActions.length > 0 && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, row)}
                      sx={{ color: '#74767F', mt: -0.5 }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>

                {/* Metadata row */}
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  {subtitleValue && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#74767F',
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}
                    >
                      {subtitleColumn?.label}: {subtitleValue}
                    </Typography>
                  )}
                </Stack>

                {/* Status badges and chips */}
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                  {detailColumns.map((column) => {
                    if (!column.property) return null;
                    const value = row[column.property];
                    if (value === null || value === undefined || value === '') return null;

                    // Show status as dot + text, other fields as outlined chips
                    if (column.type === 'status' || column.property === 'status') {
                      const statusColor = getStatusColor(String(value));
                      const dotColor =
                        statusColor === 'success'
                          ? '#10B981'
                          : statusColor === 'error'
                            ? '#EF4444'
                            : statusColor === 'warning'
                              ? '#F59E0B'
                              : '#6B7280';

                      return (
                        <Stack
                          key={column.property}
                          direction="row"
                          spacing={0.75}
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: dotColor
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#32343A',
                              fontSize: '14px',
                              lineHeight: '20px'
                            }}
                          >
                            {String(value)}
                          </Typography>
                        </Stack>
                      );
                    }

                    // Other fields as chips
                    return (
                      <Chip
                        key={column.property}
                        label={String(value)}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: '6px',
                          borderColor: '#E5E7EB',
                          color: '#74767F',
                          fontSize: '12px',
                          height: '24px',
                          '& .MuiChip-label': {
                            px: 1
                          }
                        }}
                      />
                    );
                  })}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      })}

      {/* Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: 160
          }
        }}
      >
        {menuRow?.actions?.map((action: ActionDef) => (
          <MenuItem
            key={action.handler}
            onClick={() => handleMenuAction(action.handler)}
            sx={{
              color: action.type === 'button_delete' ? '#EF4444' : '#32343A',
              fontSize: '14px',
              py: 1.5
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default MobileCardListRenderer;
