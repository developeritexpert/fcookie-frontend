import * as Yup from "yup";

export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  description: Yup.string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .nullable(),

  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE"], "Invalid status")
    .required("Status is required"),
});