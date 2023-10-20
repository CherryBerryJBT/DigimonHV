// Calculator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Calculator = () => {
  const [value, setValue] = useState('0');
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);

  const handlePress = (type, val) => {
    if (type === 'number') {
      if (value === '0') {
        setValue(`${val}`);
      } else {
        setValue(`${value}${val}`);
      }
    } else if (type === 'operator') {
      setOperator(val);
      setMemory(value);
      setValue('0');
    } else if (type === 'equal') {
      const current = parseFloat(value);
      const mem = parseFloat(memory);

      if (operator === '+') {
        setValue(String(mem + current));
      } else if (operator === '-') {
        setValue(String(mem - current));
      } else if (operator === '/') {
        setValue(String(mem / current));
      } else if (operator === '*') {
        setValue(String(mem * current));
      }
      setMemory(null);
      setOperator(null);
    } else if (type === 'clear') {
      setValue('0');
      setMemory(null);
      setOperator(null);
    }
  };

  return (
    <View style={styles.screen}>
            <Text style={styles.title}>DigiCalculator</Text>
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{value}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('clear', 'AC')}>
          <Text style={styles.text}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('operator', '+')}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('operator', '-')}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('operator', '*')}>
          <Text style={styles.text}>*</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handlePress('operator', '/')}>
          <Text style={styles.text}>/</Text>
        </TouchableOpacity>
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <TouchableOpacity key={num} style={styles.button} onPress={() => handlePress('number', num)}>
            <Text style={styles.text}>{num}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => handlePress('equal')}>
          <Text style={styles.text}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
};

{/**/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  displayText: {
    fontSize: 28,
  },
  buttons: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '25%', // for four columns
    minHeight: '20%', // for five rows
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#663399', 
  },
  text: {
    fontSize: 24,
  },
});

export default Calculator;
