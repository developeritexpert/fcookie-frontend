export interface SubmitMyCollectiblesFormSteps {
  id: number;
  title: string;
  description?: string;
  fieldType: 'text' | 'number' | 'url' | 'textarea' | 'file' | 'info' | 'list';
  fieldName: keyof SubmitMyCollectiblesFormData;
  required?: boolean;
  placeholder?: string;
  validation?: (value: any) => boolean;
  options?: string[];
  content?: React.ReactNode;
}

export interface SubmitMyCollectiblesFormData {
  itemsCount: string;
  itemsScreenshot: File | null;
  receiptScreenshot: File | null;
  country: string;
  trackingUrl: string;
  additionalInfo: string;
}