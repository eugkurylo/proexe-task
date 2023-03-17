import { userSchema } from "@/validations/userSchema";
import * as yup from "yup";

export interface IUserFormInput {
  name: string;
  username: string;
  email: string;
  city: string;
}

export type UserFormData = yup.InferType<typeof userSchema>;
