import { StyledTextField } from "@/components/FormStyledComponents/FormStyledComponents";
import { useAppDispatch } from "@/store";
import { postUser, putUser } from "@/store/users";
import { UserType } from "@/types/data.types";
import {
  Button,
  Card,
  Divider,
  Input,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserFormInput, UserFormData } from "./types";
import { userSchema } from "@/validations/userSchema";

interface UserFormProps {
  userData?: UserType;
}

export const UserForm = ({ userData }: UserFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cancelButtonHandler = () => {
    router.push("/users");
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserFormData>({
    defaultValues: {
      name: userData?.name || "",
      username: userData?.username || "",
      email: userData?.email || "",
      city: userData?.city || "",
    },
    resolver: yupResolver(userSchema),
  });
  const onSubmit: SubmitHandler<IUserFormInput> = async (data) => {
    const model: Omit<UserType, "id"> = {
      ...data,
    };

    if (userData) {
      await dispatch(putUser({ ...model, id: userData.id })).unwrap();
    } else {
      await dispatch(postUser(model)).unwrap();
    }

    router.push("/users");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: (theme) => theme.spacing(1),
          minWidth: 350,
        }}
      >
        <Typography variant={"h4"} p={2}>
          {userData ? "Edit User" : "Add User"}
        </Typography>
        <Divider />
        <Stack p={2} gap={2} width="100%">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <StyledTextField
                error={errors.name?.message}
                label="Name"
                {...field}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <StyledTextField
                error={errors.username?.message}
                label="Username"
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <StyledTextField
                error={errors.email?.message}
                label="E-mail"
                {...field}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <StyledTextField
                error={errors.city?.message}
                label="City"
                {...field}
              />
            )}
          />
        </Stack>

        <Divider />
        <Stack flexDirection="row" p={2} justifyContent="end" gap={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={cancelButtonHandler}
          >
            Cancel
          </Button>
          <Button
            disabled={!isDirty}
            variant="contained"
            color="success"
            type="submit"
          >
            Save
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
