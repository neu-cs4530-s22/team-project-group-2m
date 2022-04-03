import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  FormLabel,
} from "@chakra-ui/react";

const YOUTUBE_URL_PATTERN = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
const URL_PATTERNS = [YOUTUBE_URL_PATTERN];
const FORM_LABEL_TEXT = "Enter Video Link Below"
const PLACEHOLDER_STR = "Example: https://www.youtube.com/..."
const COLOR_SCHEME_STR = "green"
const BUTTON_TYPE_STR = "submit"
const BUTTON_TEXT = "Submit"
const INVALID_URL_MESSAGE = "You entered an invalid video url, please try again"

type FormValues = {
  url: string;
};

const validURL = require("valid-url");
const isValidURL = ({ url }: FormValues): boolean => {
  if (!validURL.isUri(url)) {
    return false;
  }
  return URL_PATTERNS.find(pattern => url.match(pattern) != null) ? true : false;
}

/**
 * Displays a form which a users can input and submit text in the form of a url
 * 
 * Input field holds placeholder text as an example to user of what input should look like
 * 
 * Form is labeled with instructions "Enter Video Link Below", submit button is labeled "Submit"
 * 
 */
export default function URLForm() {

  const { register, handleSubmit, errors } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <FormLabel>
        {FORM_LABEL_TEXT}
      </FormLabel>
      <Input placeholder={PLACEHOLDER_STR} type="string"
      ref={register({
        required: true,
        validate: isValidURL })}
      />
      {
      errors.url && errors.url.type === "validate" && (
        <div className="error">{INVALID_URL_MESSAGE}</div>
      )
      }
      <Button colorScheme={COLOR_SCHEME_STR} type={BUTTON_TYPE_STR}>
        {BUTTON_TEXT}
      </Button>
    </form>
  );
}
