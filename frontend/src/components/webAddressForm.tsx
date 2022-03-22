import React, { useState } from "react";

import useForm from '../hooks/useForm';

const PLACEHOLDER_STR = 'Example: \'youtube.com\''

export default function WebAddressForm() {
  const initialState = { webAddress: "", };

  const { onChange, onSubmit, values } = useForm(
    webAddressFormUserCallback,
    initialState
  );

  async function webAddressFormUserCallback() {}

  return <form onSubmit={onSubmit}>
           <div>
             <input
               name='webAddress'
               id='webAddress'
               type='webAddress'
               placeholder={PLACEHOLDER_STR}
               onChange={onChange}
               required
             />
            <button type='submit'>Search</button>
            </div>
         </form>
}
