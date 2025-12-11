// components/schemas/assetSchema.ts
import * as Yup from "yup";

export const AssetSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters")
    .required("Name is required"),
  
  description: Yup.string().optional(),
  
  details: Yup.string().optional(),
  
  meta_title: Yup.string()
    .max(60, "Meta title must be less than 60 characters")
    .optional(),
  
  meta_description: Yup.string()
    .max(160, "Meta description must be less than 160 characters")
    .optional(),
  
  categoryId: Yup.string().required("Category is required"),
  
  price: Yup.number()
    .positive("Price must be positive")
    .required("Price is required"),
  
  listing_price: Yup.number()
    .positive("Listing price must be positive")
    .optional(),
  
  currency: Yup.string()
    .oneOf(["USD", "EUR", "GBP"], "Invalid currency")
    .required("Currency is required"),
  
  quantity: Yup.number()
    .integer("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  
  status: Yup.string()
    .oneOf(["ACTIVE", "INACTIVE", 'ARCHIVED'], "Invalid status")
    .required("Status is required"),
  
  visibility: Yup.string()
    .oneOf(["PUBLIC", "PRIVATE", "DRAFT"], "Invalid visibility")
    .required("Visibility is required"),
  
  grading: Yup.object().shape({
    grader: Yup.string().optional(),
    grade: Yup.string().optional(),
    cert_number: Yup.string().optional(),
    population: Yup.number().optional(),
  }),
  
  attributes: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Attribute key is required"),
      value: Yup.string().required("Attribute value is required"),
    })
  ),
  
  filters: Yup.array().of(
    Yup.object().shape({
      groupId: Yup.string().required("Filter group is required"),
      valueId: Yup.string().required("Filter value is required"),
    })
  ),
});