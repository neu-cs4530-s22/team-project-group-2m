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

/**
 * Displays a form which a users can input and submit text in the form of a url
 * 
 * Input field holds placeholder text as an example to user of what input should look like
 * 
 * Form is labeled with instructions "Enter Video Link Below", submit button is labeled "Submit"
 * 
 */
export default function URLForm() {

  // TODO: Possibly replace useForm with a custom useContext wrapper, similar to other hooks
  const { handleSubmit } = useForm();
  // TODO: handling onSubmit
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
