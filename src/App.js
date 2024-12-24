import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextInput, Button, Loader, Card, Group, Text, List, ActionIcon, Center } from '@mantine/core';
import { IconSearch,IconVolume } from '@tabler/icons-react';

function App() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const fetchWordDefinition = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setResult(response.data[0]);
    } catch (err) {
      setError('Word not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };
  const playAudio = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(err => console.error('Error playing audio:', err));
    }
  };
  return (
    <Container size="md" my="xl">
      <h1>Dictionary Word Lookup</h1>
      <form onSubmit={fetchWordDefinition}>
        <TextInput
          style={{'--hover-color':'red'}}
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
          rightSection={<ActionIcon size={30} variant="light" onClick={fetchWordDefinition}><IconSearch size="xs" /></ActionIcon>}
        />
        </form>
      {loading && <Loader mt="md" />}
      {error && <Text style={{color:'red'}} mt="md">{error}</Text>}
      {result && (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md" mb="xs">
          <Text size="xl" ta="center" fw="bold" style={{borderBottom:'1px solid #eee'}}>{result.word}</Text>
          {result.phonetics?.length > 0 && (
            <>
              <Text weight={500} size="md" mt="md" fw="bold" > Phonetics </Text>
              {result.phonetics.map((phonetic, index) => (
                  <Group key={index} mt="sm" style={{borderBottom:'1px solid #eee',paddingBottom:'2px'}}>
                    {phonetic.text && <Text>{phonetic.text}</Text>}
                    {phonetic.audio && <Button variant="light" size="compact-xs"><IconVolume onClick={() => playAudio(phonetic.audio)} /></Button>} 
                  </Group>
              ))}
            </>
          )}
          
            <Text mt="md" style={{borderBottom:'1px solid #eee',paddingBottom:'2px'}}><Text style={{fontWeight:'bold'}}>Origin: </Text>{result.origin || "Origin not found"}</Text>
          
          <Text mt="md"  style={{fontWeight:"bold"}}>Meanings</Text>
          {result.meanings.map((meaning, index) => (
            <div key={index} style={{ marginTop: 20 }}>
              <Text style={{color:"#228be6"}}>{meaning.partOfSpeech}</Text>
              <List spacing="xs" style={{listStyle:"none", paddingLeft:"10px",}}>
                {meaning.definitions.map((def, i) => (
                  <List.Item key={i} style={{listStyle:"none", borderBottom:"1px solid #eee", paddingBlock:"5px"}}>
                    <Text>{def.definition}</Text>
                    {def.example && <Text color="dimmed">Example: {def.example}</Text>}
                  </List.Item>
                ))}
              </List>
            </div>
          ))}
        </Card>
      )}
    </Container>
  );
}

export default App;