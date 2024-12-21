import React from 'react';
import { Text, Button, Group } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

const Phonetics = ({ text, audioUrl, playAudio }) => (
  <Group align="center">
    {text && <Text size="sm" style={{display:'inline-block'}} >{text}</Text>}
    {audioUrl && (
      <Button
        size="xs"
        variant="subtle"
        onClick={() => playAudio(audioUrl)}
        style={{display:'inline-block', marginLeft:"5px"}}
      >
        <FontAwesomeIcon icon={faVolumeHigh} />
      </Button>
    )}
  </Group>
);

export default Phonetics;