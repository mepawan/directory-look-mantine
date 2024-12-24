import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextInput, Button, Loader, Card, Group, Text, List, ActionIcon, Center } from '@mantine/core';
import Phonetics from './components/Phonetics'
import Meanings from './components/Meanings'

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
  
  return (
    <Container size="md" my="xl">
      <h1>Dictionary Word Lookup</h1>
      <form onSubmit={fetchWordDefinition}>
      <Group ta="center" style={{textAlign:"center"}}>
          <TextInput
            style={{width:"85%"}}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
          />
          <Button onClick={fetchWordDefinition}>Search</Button>
        </Group>
        </form>

      {loading && <Loader mt="md" />}
      {error && <Text style={{color:'red'}} mt="md">{error}</Text>}
      {result && (
        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md" mb="xs">
          <Text size="xl" ta="center" fw="bold" style={{borderBottom:'1px solid #eee'}}>{result.word}</Text>
          <Phonetics phonetics={result.phonetics} />
          <Text mt="md" style={{borderBottom:'1px solid #eee',paddingBottom:'2px'}}><Text style={{fontWeight:'bold'}}>Origin: </Text>{result.origin || "Origin not found"}</Text>
          <Meanings meanings={result.meanings}/>
        </Card>
      )}
    </Container>
  );
}

export default App;