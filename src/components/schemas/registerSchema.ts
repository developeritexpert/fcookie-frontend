import * as Yup from "yup";

export const registerInitialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  terms: false,
};

export const registerValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  phone: Yup.string().required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  terms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});
