import {
  darken,
  FormLabel,
  FormLabelProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC } from "react";

type StyledTextFieldProps = Omit<TextFieldProps, "error"> & {
  error?: string | boolean;
};

export const StyledTextField: FC<StyledTextFieldProps> = ({
  error,
  ...props
}) => {
  const { sx, ...rest } = props;
  return (
    <>
      <TextField
        margin="dense"
        size="small"
        fullWidth={true}
        variant={"outlined"}
        error={!!error}
        sx={{
          "& label": {
            fontSize: 15,
          },
          backgroundColor: (theme) =>
            !props.disabled
              ? theme.palette.background.paper
              : theme.palette.mode === "light"
              ? darken(theme.palette.background.paper, 0.05)
              : darken(theme.palette.background.paper, 0.25),
          ...sx,
        }}
        {...rest}
      />
      {!!error && typeof error === "string" && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
};

export const ErrorLabel: FC<FormLabelProps> = (props) => (
  <FormLabel sx={{ color: (theme) => theme.palette.error.main }} {...props} />
);
