import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ServiceSelection'>;

interface Props {
  navigation: NavigationProp;
}

const services = [
  {
    id: 'hair' as const,
    title: 'Hair Stylist',
    description: 'Find your perfect hairstyle',
    icon: 'content-cut',
    gradient: colors.gradients.purplePink,
  },
  {
    id: 'nails' as const,
    title: 'Nail Artist',
    description: 'Design beautiful nails',
    icon: 'hand-wave',
    gradient: colors.gradients.pinkCoral,
  },
  {
    id: 'tryon' as const,
    title: 'Virtual Try-On',
    description: 'Try outfits instantly',
    icon: 'tshirt-crew',
    gradient: colors.gradients.coralYellow,
  },
];

export default function ServiceSelectionScreen({ navigation }: Props) {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleServiceSelect = (service: 'hair' | 'nails' | 'tryon') => {
    navigation.navigate('Camera', { service });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={colors.gradients.purplePink}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name="sparkles" size={40} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.title}>AI Stylist Studio</Text>
        <Text style={styles.subtitle}>Choose your styling service</Text>
      </Animated.View>

      {/* Service Cards */}
      <Animated.View
        style={[
          styles.servicesContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {services.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            activeOpacity={0.9}
            onPress={() => handleServiceSelect(service.id)}
          >
            <Animated.View
              style={[
                styles.serviceCard,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 50 + index * 20],
                      }),
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={[...service.gradient, service.gradient[1] + '20']}
                style={styles.serviceIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={service.icon} size={32} color="#FFFFFF" />
              </LinearGradient>

              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>

              <Icon name="chevron-right" size={24} color="#9CA3AF" />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Stats */}
      <Animated.View style={[styles.stats, { opacity: fadeAnim }]}>
        <View style={styles.stat}>
          <LinearGradient
            colors={colors.gradients.purplePink}
            style={styles.statGradient}
          >
            <Text style={styles.statValue}>98%</Text>
          </LinearGradient>
          <Text style={styles.statLabel}>Match Rate</Text>
        </View>
        <View style={styles.stat}>
          <LinearGradient
            colors={colors.gradients.pinkCoral}
            style={styles.statGradient}
          >
            <Text style={styles.statValue}>500K+</Text>
          </LinearGradient>
          <Text style={styles.statLabel}>Styles</Text>
        </View>
        <View style={styles.stat}>
          <LinearGradient
            colors={colors.gradients.coralYellow}
            style={styles.statGradient}
          >
            <Text style={styles.statValue}>4.9★</Text>
          </LinearGradient>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  servicesContainer: {
    flex: 1,
    gap: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  stat: {
    alignItems: 'center',
  },
  statGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});
