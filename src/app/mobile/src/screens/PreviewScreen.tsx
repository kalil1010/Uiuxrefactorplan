import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import colors from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Preview'>;
type PreviewRouteProp = RouteProp<RootStackParamList, 'Preview'>;

interface Props {
  navigation: NavigationProp;
  route: PreviewRouteProp;
}

export default function PreviewScreen({ navigation, route }: Props) {
  const { style } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this style: ${style.name}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    ReactNativeHapticFeedback.trigger('notificationSuccess');
    Alert.alert('Saved!', 'Style has been added to your favorites');
    navigation.goBack();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    ReactNativeHapticFeedback.trigger('impactLight');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Icon name="chevron-down" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={toggleFavorite}
          >
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? '#EF4444' : '#FFFFFF'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Icon name="share-variant" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="fullscreen" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: style.image }}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Match Score Badge */}
        {style.matchScore && (
          <LinearGradient
            colors={colors.gradients.purplePink}
            style={styles.matchBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="star" size={16} color="#FFFFFF" />
            <Text style={styles.matchText}>
              {style.matchScore}% Perfect Match
            </Text>
          </LinearGradient>
        )}
      </View>

      {/* Scrollable Details */}
      <ScrollView
        style={styles.detailsContainer}
        contentContainerStyle={styles.detailsContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Category */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{style.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{style.category}</Text>
            </View>
          </View>
          <Text style={styles.description}>{style.description}</Text>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Icon name="trending-up" size={20} color={colors.primary} />
            <Text style={styles.statText}>{style.popularity}% Popular</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="thumb-up" size={20} color={colors.primary} />
            <Text style={styles.statText}>Highly Rated</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Style Tags</Text>
          <View style={styles.tagsContainer}>
            {style.tags.map((tag: string) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Why It Works */}
        <View style={styles.section}>
          <LinearGradient
            colors={[colors.primary + '20', colors.accent + '20']}
            style={styles.whyCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.whyHeader}>
              <Icon name="lightbulb" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Why This Works for You</Text>
            </View>
            <View style={styles.whyList}>
              <View style={styles.whyItem}>
                <Icon name="check-circle" size={20} color="#10B981" />
                <View style={styles.whyText}>
                  <Text style={styles.whyTitle}>Complements Your Features</Text>
                  <Text style={styles.whyDescription}>
                    This style enhances your natural features and proportions
                  </Text>
                </View>
              </View>
              <View style={styles.whyItem}>
                <Icon name="check-circle" size={20} color="#10B981" />
                <View style={styles.whyText}>
                  <Text style={styles.whyTitle}>Matches Your Tone</Text>
                  <Text style={styles.whyDescription}>
                    Works beautifully with your undertones
                  </Text>
                </View>
              </View>
              <View style={styles.whyItem}>
                <Icon name="check-circle" size={20} color="#10B981" />
                <View style={styles.whyText}>
                  <Text style={styles.whyTitle}>Suits Your Lifestyle</Text>
                  <Text style={styles.whyDescription}>
                    Easy to maintain and versatile
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Similar Styles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar Styles</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarContainer}
          >
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} style={styles.similarItem}>
                <Image
                  source={{ uri: style.image }}
                  style={styles.similarImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom spacing for action bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <SafeAreaView edges={['bottom']} style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="message-text" size={20} color={colors.primary} />
          <Text style={styles.actionButtonText}>Ask Expert</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <LinearGradient
            colors={colors.gradients.purplePink}
            style={styles.primaryAction}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="bookmark" size={20} color="#FFFFFF" />
            <Text style={styles.primaryActionText}>Save Style</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  imageContainer: {
    height: '50%',
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    bottom: 16,
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
    fontSize: 16,
    fontWeight: '600',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  detailsContent: {
    padding: 24,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 14,
    color: '#6B7280',
  },
  whyCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  whyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  whyList: {
    gap: 12,
  },
  whyItem: {
    flexDirection: 'row',
    gap: 12,
  },
  whyText: {
    flex: 1,
  },
  whyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  whyDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  similarContainer: {
    gap: 12,
    paddingRight: 24,
  },
  similarItem: {
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
  },
  similarImage: {
    width: '100%',
    height: '100%',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  primaryAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
