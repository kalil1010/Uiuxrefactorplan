import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceSelectionScreen from '../screens/ServiceSelectionScreen';
import CameraScreen from '../screens/CameraScreen';
import AnalyzingScreen from '../screens/AnalyzingScreen';
import BrowseScreen from '../screens/BrowseScreen';
import PreviewScreen from '../screens/PreviewScreen';

export type RootStackParamList = {
  ServiceSelection: undefined;
  Camera: {
    service: 'hair' | 'nails' | 'tryon';
  };
  Analyzing: {
    service: 'hair' | 'nails' | 'tryon';
    imageUri: string;
  };
  Browse: {
    service: 'hair' | 'nails' | 'tryon';
    imageUri: string;
  };
  Preview: {
    service: 'hair' | 'nails' | 'tryon';
    style: any;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="ServiceSelection" component={ServiceSelectionScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Analyzing" component={AnalyzingScreen} />
      <Stack.Screen name="Browse" component={BrowseScreen} />
      <Stack.Screen 
        name="Preview" 
        component={PreviewScreen}
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
