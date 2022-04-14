import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

/**
 * ProgressBarProps represents the props required for a ProgressBar.
 */
type ProgressBarProps = {
  /** Represents the number of seconds that have elapsed since the video began. */
  secondsElapsed: number;
  /** Represents the length of the video, in seconds. */
  videoLengthSeconds: number;
  /** A function to be called upon the time being changed by clicking or seeking on the slider. */
  onTimeChange: (seconds: number) => void;
};

/**
 * A component which represents the time elapsed for a video, and allows the user
 * to change the current time elapsed in the video.
 * @param props the props for this ProgressBar 
 */
export default function ProgressBar(
  { secondsElapsed, videoLengthSeconds, onTimeChange }: ProgressBarProps,
): JSX.Element {

  const [sliderValue, setSliderValue] = React.useState(0);

  React.useEffect(() => {
    if (videoLengthSeconds === 0) {
      setSliderValue(0);
    } else {
      setSliderValue((secondsElapsed / videoLengthSeconds) * 100);
    }
  }, [secondsElapsed, videoLengthSeconds]);

  return (
    <Slider
      aria-label='progress-bar'
      value={sliderValue}
      colorScheme='red'
      maxWidth='650px'
      onChange={(percentage) => {
        const seconds = (percentage * videoLengthSeconds) / 100;
        onTimeChange(seconds);
        onTimeChange(seconds);
      }}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );

}
