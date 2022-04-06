import React, { useState, useCallback } from "react";
import { FormLabel, FormControl, Input, Button, ModalBody, ModalFooter, useToast } from "@chakra-ui/react"

const YOUTUBE_URL_PATTERN = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;
const FORM_LABEL_TEXT = "Enter a link to a video you would like to watch"
const INVALID_URL_MESSAGE = "You entered an unsupported video link, please try again"
const EXAMPLE_INPUT = "Example: https://www.youtube.com/..."

/**
 * Performs some action with a given url
 */
type OnURLUpdated = (url: string) => void;

/**
 * Represents props required to pass to URLForm
 */
type URLProps = {
  onURLUpdated: OnURLUpdated;
  /** a regular expression which accepts strings in the form of video links * */
  regExpPattern: RegExp;
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
export default function URLForm(props: URLProps): JSX.Element {

  const [url, setURL] = useState<string>('');
  const toast = useToast();

  function isVideoURL(url: string, pattern: RegExp): string | undefined {
    if (url.match(pattern) != null) {
      return url;
    }
    return undefined;
  }

  const handleSubmit = useCallback(async () => {
    const { onURLUpdated, regExpPattern } = props;
    if (isVideoURL(url, regExpPattern)) {
      onURLUpdated(url);
    } else {
      toast({
        title: INVALID_URL_MESSAGE,
        status: 'error',
      });
    }
  }, [url]);

  return (<form
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
  )
}
