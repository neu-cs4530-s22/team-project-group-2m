import React from "react";
import { FormControl, Input, Button, toast } from "@chakra-ui/react"
import {
  FormLabel,
  FormErrorMessage,
} from  "@chakra-ui/form-control";
import validURL from "valid-url";
import { SubmitHandler, useForm } from "react-hook-form";

const YOUTUBE_URL_PATTERN = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;
const URL_PATTERNS = [YOUTUBE_URL_PATTERN];
const FORM_LABEL_TEXT = "Enter a link to a video you would like to watch"
const INVALID_URL_MESSAGE = "You entered an invalid video link, please try again"
const EXAMPLE_INPUT = "Example: https://www.youtube.com/..."

function isVideoURL(url: string): string | undefined {
  if (URL_PATTERNS.find(pattern => url.match(pattern) != null)) {
    return url
  }
  return undefined
}

type FormValues = {
  url: string
}

/**
 * Displays a form which a users can input and submit text in the form of a url
 * 
 * Input field holds placeholder text as an example to user of what input should look like
 * 
 * Form is labeled with instructions "Enter Video Link Below", submit button is labeled "Submit"
 * 
 */
export default function URLForm(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  function onSubmit(data: SubmitHandler<FormValues>) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        alert("submitted");
        resolve(data)
      }, 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!validURL.isUri || !isVideoURL}>
        <FormLabel htmlFor='url'>{FORM_LABEL_TEXT}</FormLabel>
        <Input
          id='url'
          placeholder={EXAMPLE_INPUT}
          /* eslint-disable react/jsx-props-no-spreading */
          {...register('url', {
            minLength: 20,
            validate: {
              validURL: (url: string) => validURL.isUri(url),
              videoURL: (url: string) => isVideoURL(url),
            }
          })}
        />
        <FormErrorMessage>
          {INVALID_URL_MESSAGE}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  )
}
