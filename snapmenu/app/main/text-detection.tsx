import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DetectedText } from '../../types';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Mock data for development until we can fix the text recognition module
const MOCK_MENU_ITEMS = [
  { text: "Margherita Pizza", bounds: { origin: { x: 10, y: 10 }, size: { width: 100, height: 20 }}},
  { text: "Pepperoni Pizza", bounds: { origin: { x: 10, y: 40 }, size: { width: 100, height: 20 }}},
  { text: "Caesar Salad", bounds: { origin: { x: 10, y: 70 }, size: { width: 100, height: 20 }}},
  { text: "Garlic Bread", bounds: { origin: { x: 10, y: 100 }, size: { width: 100, height: 20 }}},
  { text: "Spaghetti Carbonara", bounds: { origin: { x: 10, y: 130 }, size: { width: 100, height: 20 }}},
  { text: "Tiramisu", bounds: { origin: { x: 10, y: 160 }, size: { width: 100, height: 20 }}},
];

export default function TextDetectionScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [loading, setLoading] = useState(true);
  const [detectedTexts, setDetectedTexts] = useState<DetectedText[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!imageUri) {
      setError('No image provided');
      setLoading(false);
      return;
    }

    // Simulate text recognition with a delay
    const recognizeText = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Use mock data for development
        setDetectedTexts(MOCK_MENU_ITEMS);
      } catch (err) {
        console.error('Text recognition error:', err);
        setError('Failed to recognize text. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    recognizeText();
  }, [imageUri]);

  const handleSelectDish = (dishName: string) => {
    router.push({
      pathname: '/main/dish-selection',
      params: { dishName },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detected Dishes</Text>
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Analyzing menu...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={48} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : detectedTexts.length === 0 ? (
        <View style={styles.errorContainer}>
          <MaterialIcons name="search-off" size={48} color="#e74c3c" />
          <Text style={styles.errorText}>No menu items detected</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.instruction}>
            Select a dish from the detected menu items:
          </Text>
          {detectedTexts.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.textItem}
              onPress={() => handleSelectDish(item.text)}
            >
              <Text style={styles.textItemContent}>{item.text}</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#3498db" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  textItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textItemContent: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
}); 