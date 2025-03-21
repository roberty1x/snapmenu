import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { searchDishImage, saveDish } from '../../api/dishService';
import { useAuth } from '../../contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function DishSelectionScreen() {
  const { dishName } = useLocalSearchParams<{ dishName: string }>();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadDishImage = async () => {
      if (!dishName) {
        return;
      }

      try {
        setLoading(true);
        const url = await searchDishImage(dishName);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading dish image:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDishImage();
  }, [dishName]);

  const handleSaveDish = async () => {
    if (!user || !imageUrl || !dishName) {
      return;
    }

    try {
      setSaving(true);
      await saveDish(user.id, dishName, imageUrl);
      setSaved(true);
    } catch (error) {
      console.error('Error saving dish:', error);
    } finally {
      setSaving(false);
    }
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
        <Text style={styles.headerTitle}>{dishName || 'Dish Details'}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Finding dish image...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.dishImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.dishInfoContainer}>
            <Text style={styles.dishName}>{dishName}</Text>
          </View>

          {!saved ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveDish}
              disabled={saving || !user}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialIcons name="favorite" size={20} color="#fff" />
                  <Text style={styles.saveButtonText}>Save to My Dishes</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.savedContainer}>
              <MaterialIcons name="check-circle" size={24} color="#2ecc71" />
              <Text style={styles.savedText}>Saved to My Dishes</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.newScanButton}
            onPress={() => router.push('/tabs')}
          >
            <MaterialIcons name="camera-alt" size={20} color="#fff" />
            <Text style={styles.newScanButtonText}>Scan Another Dish</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
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
  content: {
    flex: 1,
    padding: 20,
  },
  dishImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  dishInfoContainer: {
    marginBottom: 25,
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  savedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  savedText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  newScanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
  },
  newScanButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
}); 