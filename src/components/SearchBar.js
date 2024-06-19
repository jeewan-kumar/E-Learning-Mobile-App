import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <Icon name="search" size={24} color="#888" />
      <TextInput
        placeholder="Search your courses"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#333',
  },
});

export default SearchBar;
