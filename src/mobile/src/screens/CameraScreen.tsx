import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import colors from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;
type CameraRouteProp = RouteProp<RootStackParamList, 'Camera'>;

interface Props {
  navigation: NavigationProp;
  route: CameraRouteProp;
}

const serviceConfig = {
  hair: {
    title: 'Hair Stylist',
    icon: 'content-cut',
    gradient: colors.gradients.purplePink,
    tip: 'Face forward with hair visible',
  },
  nails: {
    title: 'Nail Artist',
    icon: 'hand-wave',
    gradient: colors.gradients.pinkCoral,
    tip: 'Show your hands clearly',
  },
  tryon: {
    title: 'Virtual Try-On',
    icon: 'tshirt-crew',
    gradient: colors.gradients.coralYellow,
    tip: 'Full body photo works best',
  },
};

export default function CameraScreen({ navigation, route }: Props) {
  const { service } = route.params;
  const config = serviceConfig[service];
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.front;
  const [hasPermission, setHasPermission] = useState(false);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const handleTakePhoto = async () => {
    if (!camera.current) return;

    try {
      // Haptic feedback
      ReactNativeHapticFeedback.trigger('impactMedium');

      const photo = await camera.current.takePhoto({
        flash: 'off',
        qualityPrioritization: 'quality',
      });

      // Navigate to analyzing screen
      navigation.navigate('Analyzing', {
        service,
        imageUri: `file://${photo.path}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handleGallery = () => {
    // TODO: Implement image picker
    Alert.alert('Coming Soon', 'Gallery selection will be available soon');
  };

  const handleSample = () => {
    // Use a sample image
    navigation.navigate('Analyzing', {
      service,
      imageUri: 'sample',
    });
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Camera permission required</Text>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Camera Guide Overlay */}
      <View style={styles.guideOverlay}>
        <View style={styles.guideFrame} />
      </View>

      {/* Top Bar */}
      <SafeAreaView edges={['top']} style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-left" size={32} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{config.title}</Text>
        <View style={{ width: 40 }} />
      </SafeAreaView>

      {/* Bottom Controls */}
      <SafeAreaView edges={['bottom']} style={styles.bottomControls}>
        {/* Tip Banner */}
        <View style={styles.tipBanner}>
          <Icon name="lightbulb-outline" size={20} color="#FFFFFF" />
          <Text style={styles.tipText}>{config.tip}</Text>
        </View>

        {/* Capture Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleTakePhoto}
          style={styles.captureButtonContainer}
        >
          <LinearGradient
            colors={config.gradient}
            style={styles.captureButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="camera" size={32} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.captureText}>Take Photo</Text>
        </TouchableOpacity>

        {/* Secondary Actions */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleGallery}
          >
            <Icon name="image-outline" size={24} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSample}
          >
            <Icon name="star-outline" size={24} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Sample</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  guideOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: 280,
    height: 360,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 16,
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    backdropFilter: 'blur(10px)',
  },
  tipText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  captureButtonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  captureText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
