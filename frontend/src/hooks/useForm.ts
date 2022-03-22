import React, { useState } from "react";

export default function useForm(callback: any, initialState = {}): 
{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  values: {};
}
{
  const [values, setValues] = useState(initialState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };
  return {
    onChange,
    onSubmit,
    values,
  };
}
