import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const ReportProblemPage = () => {
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmit = () => {
    if (!problemDescription.trim()) {
      Alert.alert('Error', 'Please enter a problem description.');
      return;
    }
    
    // Handle submission logic (e.g., API call to report problem)
    // console.log('Submitting problem:', problemDescription);
    // Optionally, clear the input field after submission
    setProblemDescription('');
    Alert.alert('Success', 'Problem reported successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report a Problem</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe the problem..."
        multiline
        numberOfLines={4}
        value={problemDescription}
        onChangeText={text => setProblemDescription(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ReportProblemPage;
