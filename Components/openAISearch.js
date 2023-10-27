import React, { useState } from 'react';
import { View, TextInput, Button, Text, } from 'react-native';
import { styles } from '../Style/Stylesheet';

const openAISearch = async (query) => {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: 'POST',
        headers: {
          'Authorization': "Bearer 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",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: query,
          max_tokens: 150
        })
      });
  
      if (!response.ok) {
        throw new Error(`API responded with status code: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data.choices || !data.choices[0] || !data.choices[0].text) {
        throw new Error("Unexpected API response structure");
      }
  
      return data.choices[0].text.trim();
    } catch (error) {
      console.error("Error fetching data from OpenAI:", response.data);
      return "Error fetching data. Please try again.";
    }
};

const OpenAISearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    const response = await openAISearch(query);
    setResult(response);
  };

  return (
    <View style={styles.screen}>
          <Text style={styles.title}>DigiWeb</Text>
    <View style={styles.container}>
    <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Lokilok for Digimon and more..."
          style={[styles.input, { width: '100%', marginBottom: 10 }]}
      />
      <Button title="send" color="#ffa500" onPress={handleSearch} />
      <Text>{result}</Text>
    </View>
    </View>
  );
};


export default OpenAISearch;
