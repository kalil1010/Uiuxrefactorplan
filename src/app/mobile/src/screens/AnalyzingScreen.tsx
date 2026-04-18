import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Analyzing'>;
type AnalyzingRouteProp = RouteProp<RootStackParamList, 'Analyzing'>;

interface Props {
  navigation: NavigationProp;
  route: AnalyzingRouteProp;
}

const steps = [
  'Detecting features',
  'Analyzing proportions',
  'Matching styles',
  'Generating results',
];

export default function AnalyzingScreen({ navigation, route }: Props) {
  const { service, imageUri } = route.params;
  const rotateAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);
  const fadeAnims = steps.map(() => new Animated.Value(0));

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Fade in steps sequentially
    fadeAnims.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 400,
        useNativeDriver: true,
      }).start();
    });

    // Navigate to browse after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Browse', { service, imageUri });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ rotate }, { scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={colors.gradients.purplePink}
          style={styles.iconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name="auto-fix" size={48} color="#FFFFFF" />
        </LinearGradient>
      </Animated.View>

      {/* Title */}
      <Text style={styles.title}>Analyzing...</Text>
      <Text style={styles.subtitle}>
        Our AI is analyzing your photo to find perfect matches
      </Text>

      {/* Progress Dots */}
      <View style={styles.dotsContainer}>
        {[0, 1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                opacity: rotateAnim.interpolate({
                  inputRange: [0, 0.33, 0.66, 1],
                  outputRange: i === 0 ? [0.3, 1, 0.3, 0.3] : i === 1 ? [0.3, 0.3, 1, 0.3] : [0.3, 0.3, 0.3, 1],
                }),
              },
            ]}
          />
        ))}
      </View>

      {/* Analysis Steps */}
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <Animated.View
            key={step}
            style={[
              styles.step,
              {
                opacity: fadeAnims[index],
                transform: [
                  {
                    translateX: fadeAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.stepIcon}>
              <Icon name="check-circle" size={20} color={colors.primary} />
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </Animated.View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 48,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  stepsContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
});
