import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleScanMenu = () => {
    router.push("/main/camera" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>SnapMenu</Text>
        <Text style={styles.subtitle}>Find pictures of any dish on a menu</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop' }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <MaterialIcons name="camera-alt" size={24} color="#3498db" />
            </View>
            <Text style={styles.stepText}>1. Take a photo of any restaurant menu</Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <MaterialIcons name="crop" size={24} color="#3498db" />
            </View>
            <Text style={styles.stepText}>2. Crop and select dish name</Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepIcon}>
              <MaterialIcons name="image" size={24} color="#3498db" />
            </View>
            <Text style={styles.stepText}>3. See what the dish looks like</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.scanButton} onPress={handleScanMenu}>
          <MaterialIcons name="restaurant-menu" size={24} color="#fff" />
          <Text style={styles.scanButtonText}>Scan Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    marginTop: 'auto',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 