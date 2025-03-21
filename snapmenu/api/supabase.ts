import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Alert } from 'react-native';
import Constants from 'expo-constants';

// Replace with your Supabase URL and anon key
const supabaseUrl = 'https://bgbhxhwxjyglvlvydtsn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYmh4aHd4anlnbHZsdnlkdHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MTY2NzAsImV4cCI6MjA1ODA5MjY3MH0.i5Bvc1-iEZfez5MlXLc9teQ89oU6dadr27AL3XXFtfo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const handleSupabaseError = (error: Error) => {
  console.error('Supabase error:', error);
  Alert.alert('Error', error.message || 'An unexpected error occurred');
}; 