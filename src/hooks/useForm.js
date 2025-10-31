import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const setValue = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
    setFormData(initialState);
  };

  return { formData, setFormData, setValue, resetForm };
};