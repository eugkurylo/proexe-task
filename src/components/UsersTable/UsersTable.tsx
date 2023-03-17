import { useAppDispatch } from "@/store";
import { deleteUser, getUsersSelector, sortUsers } from "@/store/users";
import { UserType } from "@/types/data.types";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SortMethod } from "@/types/common.types";

interface Column {
  id: "id" | "name" | "username" | "email" | "city" | "actions";
  label: string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "username", label: "Username" },
  {
    id: "email",
    label: "E-mail",
  },
  {
    id: "city",
    label: "City",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

interface UserTableProps {
  users: UserType[];
}

export const UsersTable = ({ users }: UserTableProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { sortMethod } = useSelector(getUsersSelector);

  const [openDeleteModal, setOpenDeleteModal] = useState<UserType | undefined>(
    undefined
  );
  const handleOpenDeleteModal = (user: UserType) => setOpenDeleteModal(user);
  const handleCloseDeleteModal = () => setOpenDeleteModal(undefined);

  const editButtonHandler = (user: UserType) => {
    router.push(`/edit/${user.id}`);
  };

  const onDelete = (user: UserType) => {
    dispatch(deleteUser(user.id));
    return handleCloseDeleteModal();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSortTable = () => dispatch(sortUsers());

  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="left">
                  {column.label}
                  {column.id === "username" && (
                    <IconButton disableRipple onClick={handleSortTable}>
                      {sortMethod === SortMethod.DESC ? (
                        <ArrowUpwardIcon />
                      ) : (
                        <ArrowDownwardIcon />
                      )}
                    </IconButton>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell key={user.id} align="left">
                      {user.id}
                    </TableCell>
                    <TableCell key={user.name} align="left">
                      {user.name}
                    </TableCell>
                    <TableCell key={user.username} align="left">
                      {user.username}
                    </TableCell>
                    <TableCell key={user.email} align="left">
                      {user.email}
                    </TableCell>
                    <TableCell key={user.city} align="left">
                      {user.city}
                    </TableCell>
                    <TableCell key={`actions-${user.id}`} align="left">
                      <Stack flexDirection="row" gap={1}>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => editButtonHandler(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleOpenDeleteModal(user)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openDeleteModal && (
        <Modal keepMounted open={!!open} onClose={handleCloseDeleteModal}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: theme.spacing(0.5),
              boxShadow: 12,
            }}
          >
            <Typography variant="h4" component="h2" p={2}>
              Delete
            </Typography>
            <Divider />
            <Typography p={2}>
              Do you want to delete user: {openDeleteModal.name}?
            </Typography>
            <Divider />
            <Stack flexDirection="row" p={2} justifyContent="end" gap={2}>
              <Button variant="outlined" onClick={handleCloseDeleteModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(openDeleteModal)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Modal>
      )}
    </>
  );
};
