import React, { useState, useCallback } from "react";
import { FormLabel, FormControl, Input, Button, ModalBody, ModalFooter, useToast } from "@chakra-ui/react"
import { validURL, fetchVideoDuration } from "../../Utils";
import useCoveyAppState from '../../hooks/useCoveyAppState';
import { VideoStatus } from "../../CoveyTypes";

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
  const {apiClient, sessionToken, currentTownID} = useCoveyAppState();
  const toast = useToast();

  const handleSubmit = useCallback(async () => {
    const { onURLUpdated, regExpPattern } = props;
    if (validURL(url, regExpPattern)) {
      onURLUpdated(url);
      try {
        const videoDuration = await fetchVideoDuration(url);
        const videoStatusToCreate: VideoStatus = { url, length: videoDuration, elapsed: 0, isPaused: false };
        await apiClient.createVideoStatus({
          sessionToken,
          coveyTownID: currentTownID,
          videoStatus: videoStatusToCreate,
        });
        toast({
          title: 'Video will begin shortly!',
          status: 'success',
        });
      } catch (err) {
        toast({
          title: 'Unable to start video',
          description: err.toString(),
          status: 'error',
        });
      }
    } else {
      toast({
        title: INVALID_URL_MESSAGE,
        status: 'error',
      });
    }
  }, [props, url, apiClient, sessionToken, currentTownID, toast]);

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
