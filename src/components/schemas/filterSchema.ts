// components/schemas/filterSchema.ts

import * as Yup from 'yup';

export const FilterGroupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Name is required'),
  slug: Yup.string()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain only lowercase letters, numbers, and hyphens'
    )
    .min(2, 'Slug must be at least 2 characters')
    .max(100, 'Slug must be less than 100 characters')
    .optional(),
  type: Yup.string()
    .oneOf(['single', 'multi', 'number', 'text'], 'Invalid filter type')
    .optional(), // Made optional since we default to 'single'
  required: Yup.boolean(),
  status: Yup.string()
    .oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status')
    .required('Status is required'),
  protected: Yup.boolean(),
  order: Yup.number().integer().optional(),
});

export const FilterValueSchema = Yup.object().shape({
  groupId: Yup.string().required('Group ID is required'),
  label: Yup.string()
    .min(1, 'Label is required')
    .max(100, 'Label must be less than 100 characters')
    .required('Label is required'),
  valueKey: Yup.string()
    .min(1, 'Value key is required')
    .max(100, 'Value key must be less than 100 characters')
    .required('Value key is required'),
  status: Yup.string()
    .oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status')
    .required('Status is required'),
  order: Yup.number().integer().optional(),
});