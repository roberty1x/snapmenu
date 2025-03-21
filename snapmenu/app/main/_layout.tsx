import React from 'react';
import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="camera" />
      <Stack.Screen name="crop-image" />
      <Stack.Screen name="text-detection" />
      <Stack.Screen name="dish-selection" />
    </Stack>
  );
} 