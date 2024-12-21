import React from 'react';
import { Text, Stack } from '@mantine/core';

const Definition = ({ partOfSpeech, definitions }) => (
  <Stack  mt="md">
    <Text  size="lg" color="blue" style={{color:"blue"}}>
      {partOfSpeech}
    </Text>
    <ul style={{ paddingLeft: '1.5rem' }}>
      {definitions.map((def, index) => (
        <li key={index} style={{ marginBottom: '1rem' }}>
          <Text >{def.definition}</Text>
          {def.example && (
            <Text size="sm" color="dimmed">
              Example: {def.example}
            </Text>
          )}
        </li>
      ))}
    </ul>
  </Stack>
);

export default Definition;