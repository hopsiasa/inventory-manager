import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams
} from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { PencilAlt as PencilAltIcon } from '../../icons/pencil-alt';
import type { User } from '../../types/user';
import { Scrollbar } from '../scrollbar';

interface UserListTableProps {
  users: User[];
  isLoading: boolean;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  rowCount: number;
  onPaginationModelChange: (newModel: any) => void;
}

export const UserListTable: FC<UserListTableProps> = (props) => {
  const {
    users,
    isLoading,
    paginationModel,
    onPaginationModelChange,
    rowCount,
    ...other
  } = props;
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150, flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) => (
        <Link href={`/users/${params.id}`} passHref>
          {params.row.name}
        </Link>
      )
    },
    { field: 'email', headerName: 'Email', width: 150, flex: 1 },
    { field: 'role', headerName: 'Role', width: 150, flex: 1 },
    { field: 'created_at', headerName: 'Date created', width: 150, flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={params.id}
          icon={<PencilAltIcon />}
          label='Edit'
          onClick={() => router.push(`/users/${params.id}/edit`)}
        />
      ]
    }
  ];

  return (
    <Scrollbar>
      <DataGrid
        rows={users}
        rowCount={rowCount}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        loading={isLoading}
        pageSizeOptions={[15, 25, 50, 100]}
        paginationModel={paginationModel}
        paginationMode='server'
        onPaginationModelChange={onPaginationModelChange}
      />
    </Scrollbar>
  );
};
