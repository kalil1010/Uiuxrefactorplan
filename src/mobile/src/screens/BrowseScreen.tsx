import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import colors from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Browse'>;
type BrowseRouteProp = RouteProp<RootStackParamList, 'Browse'>;

interface Props {
  navigation: NavigationProp;
  route: BrowseRouteProp;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

// Mock data
const STYLES = [
  {
    id: '1',
    name: 'Long Layers',
    category: 'Long',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=600&fit=crop',
    matchScore: 98,
    description: 'Flowing layers with natural movement',
    tags: ['versatile', 'elegant', 'easy-maintain'],
  },
  {
    id: '2',
    name: 'Bob Cut',
    category: 'Medium',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=600&fit=crop',
    matchScore: 94,
    description: 'Classic bob with modern twist',
    tags: ['professional', 'chic', 'low-maintenance'],
  },
  {
    id: '3',
    name: 'Beach Waves',
    category: 'Long',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    matchScore: 96,
    description: 'Effortless wavy texture',
    tags: ['casual', 'romantic', 'textured'],
  },
];

export default function BrowseScreen({ navigation, route }: Props) {
  const { service } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  const position = useRef(new Animated.ValueXY()).current;
  const swipeIndicator = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
        
        // Animate swipe indicator
        const direction = gesture.dx > 0 ? 1 : -1;
        Animated.timing(swipeIndicator, {
          toValue: direction,
          duration: 100,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe Right - Like
          handleSwipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe Left - Pass
          handleSwipeLeft();
        } else {
          // Return to center
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
          swipeIndicator.setValue(0);
        }
      },
    })
  ).current;

  const handleSwipeRight = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    
    const currentStyle = STYLES[currentIndex];
    setFavorites(prev => new Set([...prev, currentStyle.id]));

    swipeCard('right');
  };

  const handleSwipeLeft = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    swipeCard('left');
  };

  const swipeCard = (direction: 'left' | 'right') => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      swipeIndicator.setValue(0);
      setCurrentIndex(prev => prev + 1);
    });
  };

  const handlePreview = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    navigation.navigate('Preview', {
      service,
      style: STYLES[currentIndex],
    });
  };

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = swipeIndicator.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const passOpacity = swipeIndicator.interpolate({
    inputRange: [-1, 0],
    outputRange: [1, 0],
  });

  if (currentIndex >= STYLES.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Icon name="check-circle" size={64} color={colors.primary} />
          <Text style={styles.emptyTitle}>All Done!</Text>
          <Text style={styles.emptyText}>You've seen all styles</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setCurrentIndex(0)}
          >
            <LinearGradient
              colors={colors.gradients.purplePink}
              style={styles.resetGradient}
            >
              <Icon name="refresh" size={20} color="#FFFFFF" />
              <Text style={styles.resetText}>Start Over</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentStyle = STYLES[currentIndex];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Recommended for You</Text>
          <Text style={styles.headerSubtitle}>
            {STYLES.length - currentIndex} styles remaining
          </Text>
        </View>
        <TouchableOpacity>
          <Icon name="dots-horizontal" size={28} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Card Stack */}
      <View style={styles.cardContainer}>
        {/* Background Cards */}
        {STYLES.slice(currentIndex + 1, currentIndex + 3).map((style, index) => (
          <View
            key={style.id}
            style={[
              styles.card,
              {
                transform: [
                  { scale: 1 - (index + 1) * 0.05 },
                  { translateY: (index + 1) * 10 },
                ],
                opacity: 1 - (index + 1) * 0.2,
              },
            ]}
          >
            <Image source={{ uri: style.image }} style={styles.cardImage} />
          </View>
        ))}

        {/* Active Card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { rotate },
              ],
            },
          ]}
        >
          <Image
            source={{ uri: currentStyle.image }}
            style={styles.cardImage}
          />

          {/* Match Score Badge */}
          {currentStyle.matchScore >= 90 && (
            <LinearGradient
              colors={colors.gradients.purplePink}
              style={styles.matchBadge}
            >
              <Icon name="star" size={16} color="#FFFFFF" />
              <Text style={styles.matchText}>
                {currentStyle.matchScore}% Match
              </Text>
            </LinearGradient>
          )}

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              setFavorites(prev => {
                const newSet = new Set(prev);
                if (newSet.has(currentStyle.id)) {
                  newSet.delete(currentStyle.id);
                } else {
                  newSet.add(currentStyle.id);
                }
                return newSet;
              });
              ReactNativeHapticFeedback.trigger('impactLight');
            }}
          >
            <Icon
              name={favorites.has(currentStyle.id) ? 'heart' : 'heart-outline'}
              size={28}
              color={favorites.has(currentStyle.id) ? '#EF4444' : '#FFFFFF'}
            />
          </TouchableOpacity>

          {/* Swipe Indicators */}
          <Animated.View style={[styles.likeIndicator, { opacity: likeOpacity }]}>
            <Text style={styles.indicatorText}>LOVE</Text>
          </Animated.View>

          <Animated.View style={[styles.passIndicator, { opacity: passOpacity }]}>
            <Text style={styles.indicatorText}>PASS</Text>
          </Animated.View>

          {/* Card Info */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.cardInfo}
          >
            <View style={styles.cardInfoContent}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{currentStyle.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{currentStyle.category}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                {currentStyle.description}
              </Text>
              <View style={styles.tagsContainer}>
                {currentStyle.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSwipeLeft}
        >
          <View style={[styles.actionIconContainer, styles.passAction]}>
            <Icon name="close" size={32} color="#EF4444" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePreview}
        >
          <LinearGradient
            colors={colors.gradients.purplePink}
            style={styles.previewAction}
          >
            <Icon name="eye" size={36} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSwipeRight}
        >
          <View style={[styles.actionIconContainer, styles.likeAction]}>
            <Icon name="heart" size={32} color="#10B981" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Swipe Hint */}
      <Text style={styles.hint}>
        Swipe right to save • Swipe left to skip • Tap to preview
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 32,
    height: SCREEN_HEIGHT * 0.65,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  matchText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIndicator: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  passIndicator: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#10B981',
    transform: [{ rotate: '12deg' }],
    borderWidth: 8,
    borderColor: '#10B981',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  cardInfoContent: {
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  passAction: {
    borderColor: '#EF4444',
  },
  likeAction: {
    borderColor: '#10B981',
  },
  previewAction: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6B7280',
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  resetButton: {
    marginTop: 24,
  },
  resetGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
  },
  resetText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
