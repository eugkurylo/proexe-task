import { UsersTable } from "@/components/UsersTable/UsersTable";
import { useAppDispatch } from "@/store";
import { getUsers, getUsersSelector } from "@/store/users";
import { NextPageWithData, LayoutStyles } from "@/types/Layout";
import {
  Button,
  Card,
  Divider,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Users: NextPageWithData = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const router = useRouter();

  const { data: users, error, isLoading } = useSelector(getUsersSelector);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const linkHandlerAdd = () => {
    router.push(`/add`);
  };

  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: (theme) => theme.spacing(1),
      }}
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        p={theme.spacing(2, 2, 0, 2)}
      >
        <Typography variant={"h4"}>Users List</Typography>
        <Button variant="contained" onClick={linkHandlerAdd}>
          Add User
        </Button>
      </Stack>
      <Divider />
      {users && !isLoading ? (
        <UsersTable users={users} />
      ) : isLoading && !error ? (
        <LinearProgress />
      ) : (
        "Users not found"
      )}
    </Card>
  );
};

Users.metadata = {
  layout: LayoutStyles.default,
  pageTitle: "Home",
};

Users.getInitialProps = async () => {
  return {};
};

export default Users;
