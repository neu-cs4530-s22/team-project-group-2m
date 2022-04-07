import React, { useState, useCallback } from "react";
import { FormLabel, FormControl, Input, Button, ModalBody, ModalFooter, useToast } from "@chakra-ui/react"

export const YOUTUBE_URL_PATTERN = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/gm;
const FORM_LABEL_TEXT = "Enter a link to a video you would like to watch"
const INVALID_URL_MESSAGE = "You entered an unsupported video link, please try again"
const EXAMPLE_INPUT = "Example: https://www.youtube.com/..."

/**
 * Performs some action with a given url
 */
export type OnURLUpdated = (url: string) => void;

/**
 * Represents props required to pass to URLForm
 */
export type URLFormProps = {
  onURLUpdated: OnURLUpdated;
  /** a regular expression which accepts strings in the form of video links * */
  regExpPattern: RegExp;
}

/**
   * Validates whether a given url is a url to a publicly available video streaming website
   * @param url - a publicly accessible web address
   * @param regExpPattern - a regular expression which accepts strings in the form of video links
   * @returns - a valid url or undefined
   */
 export function validURL(url: string, pattern: RegExp): boolean {
  return url.match(pattern) != null;
}

/**
 * Displays a form which a users can input and submit text in the form of a url
 * 
 * Input field holds placeholder text as an example to user of what input should look like
 * 
 * Form is labeled with instructions "Enter Video Link Below", submit button is labeled "Submit"
 * 
 * @param props - URLProps
 * 
 */
export default function URLForm(props: URLFormProps): JSX.Element {

  const [url, setURL] = useState<string>('');
  const toast = useToast();

  const handleSubmit = useCallback(async () => {
    const { onURLUpdated, regExpPattern } = props;
    if (validURL(url, regExpPattern)) {
      onURLUpdated(url);
    } else {
      toast({
        title: INVALID_URL_MESSAGE,
        status: 'error',
      });
    }
  }, [props, url, toast]);

  return (
    <form
      onSubmit={ev => {
        ev.preventDefault();
        handleSubmit();
      }}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel htmlFor='url'>{FORM_LABEL_TEXT}</FormLabel>
          <Input
            id='url'
            placeholder={EXAMPLE_INPUT}
            name='url'
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
          Submit
        </Button>
      </ModalFooter>
    </form>
  );
}
