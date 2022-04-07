import React from 'react';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

type ProgressBarProps = {
  secondsElapsed: number;
  videoLengthSeconds: number;
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
      onChange={(percentage) => {
        const seconds = (percentage * videoLengthSeconds) / 100;
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
