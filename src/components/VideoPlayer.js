import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const VideoPlayer = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>←</Text>
      </TouchableOpacity>
      <Text style={styles.courseTitle}>Principle of Java Language</Text>
      <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.videoThumbnail} />
      <Text style={styles.title}>Introduction</Text>
      <Text style={styles.subtitle}>Tutor - John Doe</Text>
      <Text style={styles.subtitle}>9 Lessons   1:10mins</Text>
      <View style={styles.lessonItem}>
        <Text style={styles.lessonNumber}>01</Text>
        <View>
          <Text style={styles.lessonTitle}>Introduction</Text>
          <Text style={styles.lessonDescription}>Introduction to the interface</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Text>▶</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lessonItem}>
        <Text style={styles.lessonNumber}>02</Text>
        <View>
          <Text style={styles.lessonTitle}>Getting Started</Text>
          <Text style={styles.lessonDescription}>Getting to know how to navigate</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Text>▶</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lessonItem}>
        <Text style={styles.lessonNumber}>03</Text>
        <View>
          <Text style={styles.lessonTitle}>Layers</Text>
          <Text style={styles.lessonDescription}>How layers work</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Text>▶</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  lessonNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonDescription: {
    fontSize: 14,
    color: 'gray',
  },
  playButton: {
    marginLeft: 'auto',
  },
});

export default VideoPlayer;
