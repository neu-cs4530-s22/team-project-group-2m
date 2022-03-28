import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Input,
  FormLabel,
} from "@chakra-ui/react";

const FORM_LABEL_TEXT = "Enter Video Link Below"
const PLACEHOLDER_STR = "Example: https://www.youtube.com/..."
const COLOR_SCHEME_STR = "green"
const BUTTON_TYPE_STR = "submit"
const BUTTON_TEXT = "Submit"

export default function URLForm() {

  const { handleSubmit } = useForm();
  // TODO handling onSubmit
  const onSubmit = async (data: SubmitHandler<any>) => { console.log(data); };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>
        {FORM_LABEL_TEXT}
      </FormLabel>
      <Input placeholder={PLACEHOLDER_STR}/>
      <Button colorScheme={COLOR_SCHEME_STR} type={BUTTON_TYPE_STR}>
        {BUTTON_TEXT}
      </Button>
    </form>
  );
}
