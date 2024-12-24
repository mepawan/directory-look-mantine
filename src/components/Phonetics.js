import { Button,  Group, Text} from '@mantine/core';
import { IconVolume } from '@tabler/icons-react';

const Phonetics = ({ phonetics }) => {
    const playAudio = (audioUrl) => {
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play().catch(err => console.error('Error playing audio:', err));
    }
};
    return (
      <>
        {phonetics?.length > 0 && (
          <>
            <Text weight={500} size="md" mt="md" fw="bold">Phonetics</Text>
            {phonetics.map((phonetic, index) => (
              <Group key={index} mt="sm" style={{ borderBottom: '1px solid #eee', paddingBottom: '2px' }}>
                {phonetic.text && <Text>{phonetic.text}</Text>}
                {phonetic.audio && (
                  <Button variant="light" size="compact-xs">
                    <IconVolume onClick={() => playAudio(phonetic.audio)} />
                  </Button>
                )}
              </Group>
            ))}
          </>
        )}
      </>
    );
  };
  
  export default Phonetics;
