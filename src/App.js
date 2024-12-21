import React, { useState } from 'react';

import {
  MantineProvider,
  Container,
  Title,
  Text,
  TextInput,
  Button,
  Loader,
  Alert,
  Card,
  Group,
  Stack,
} from '@mantine/core';
import Definition from './components/Definition';
import Phonetics from './components/Phonetics';

const DictionaryApp = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWord = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data = await response.json();
      setResults(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error('Error playing audio:', err));
    }
  };
  

  return (
    <MantineProvider>
      <Container size="md" py="xl" >
       <div style={{width: "80%",margin:"auto", maxWidth:"500px"}}>
          <Title order={1} mb="xl"> <div style={{fontWeight:'bold'}}>Dictionary Word Lookup</div> </Title>
          <Group align="center" position="center" spacing="xs" mb="xl">
              <form onSubmit={searchWord} style={{marginTop:"20px"}}>
                <Group position="apart" mb="md">
                  <TextInput
                    placeholder="Enter a word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    style={{ display:"inline-block", padding:"10px", width:'250px', borderColor:"grey" }}
                  />
                  <Button type="submit" size="md" loading={loading} style={{ display:"inline-block",marginLeft:"5px" }}>
                    {loading ? <Loader size="sm" /> : 'Search'}
                  </Button>
                  <Loader size="sm" />
                </Group>
              </form>
          </Group>
          {error && (
            <Alert color="red" mb="md">
              {error}
            </Alert>
          )}

          {results && (
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Stack>
                <div>
                  <Title order={2} >{results.word}</Title>
                  {results.phonetics?.length > 0 && (
                    <div style={{display:'inline-block'}}>
                      <Phonetics
                        text={results.phonetics[0].text}
                        audioUrl={results.phonetics[0].audio}
                        playAudio={playAudio}
                      />
                    </div>
                  )}
                </div>

                {results.origin && (
                  <div>
                    <Text weight={500} size="md" mt="md" >
                      Origin
                    </Text>
                    <Text>{results.origin}</Text>
                  </div>
                )}

                <div>
                  <Text weight={500} size="md" mt="md" style={{fontWeight:"bold", marginTop:"20px"}}>
                    Meanings
                  </Text>
                  {results.meanings?.map((meaning, index) => (
                    <Definition
                      key={index}
                      partOfSpeech={meaning.partOfSpeech}
                      definitions={meaning.definitions}
                    />
                  ))}
                </div>
              </Stack>
            </Card>
          )}
        </div>

      </Container>
    </MantineProvider>
  )
};

export default DictionaryApp;
