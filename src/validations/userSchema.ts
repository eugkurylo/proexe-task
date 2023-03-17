import * as yup from "yup";

export const userSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("E-mail is not valid")
      .required("E-mail is required"),
    city: yup.string().required("City is required"),
  })
  .required();
