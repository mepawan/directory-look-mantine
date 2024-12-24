
import { Text, List } from '@mantine/core';

const Meanings = ({meanings}) => {
    return(
        <>
            <Text mt="md"  style={{fontWeight:"bold"}}>Meanings</Text>
            {meanings.map((meaning, index) => (
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
        </>
    )
}
export default Meanings;