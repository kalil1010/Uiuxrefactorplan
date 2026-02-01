import React, { useState } from 'react';
import { Trophy, Users, Calendar, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TopBar } from '../layout/TopBar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/components/ui/utils';
import { Progress } from '@/components/ui/progress';

const challenges = [
  {
    id: 1,
    title: '30-Day Capsule Wardrobe',
    description: 'Create outfits using only 30 essential pieces for an entire month',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
    participants: 2840,
    deadline: '2024-02-15',
    status: 'active',
    category: 'Lifestyle',
    reward: '500 Points',
    progress: 45
  },
  {
    id: 2,
    title: 'Sustainable Style Week',
    description: 'Showcase eco-friendly outfits and sustainable fashion choices',
    coverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop',
    participants: 4120,
    deadline: '2024-02-08',
    status: 'active',
    category: 'Sustainability',
    reward: '750 Points',
    progress: 72
  },
  {
    id: 3,
    title: 'Thrift Flip Challenge',
    description: 'Transform thrifted finds into trendy outfits',
    coverImage: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=400&fit=crop',
    participants: 1680,
    deadline: '2024-02-20',
    status: 'upcoming',
    category: 'DIY',
    reward: '1000 Points',
    progress: 0
  },
  {
    id: 4,
    title: 'Monochrome Mastery',
    description: 'Create stunning single-color outfits for 7 days',
    coverImage: 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?w=600&h=400&fit=crop',
    participants: 3250,
    deadline: '2024-01-25',
    status: 'past',
    category: 'Style',
    reward: '500 Points',
    progress: 100
  },
  {
    id: 5,
    title: 'Winter Layering',
    description: 'Master the art of layering with creative winter outfits',
    coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
    participants: 5890,
    deadline: '2024-02-12',
    status: 'active',
    category: 'Seasonal',
    reward: '650 Points',
    progress: 58
  },
  {
    id: 6,
    title: 'Accessory Adventure',
    description: 'Show how accessories can transform basic outfits',
    coverImage: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=400&fit=crop',
    participants: 2340,
    deadline: '2024-02-18',
    status: 'upcoming',
    category: 'Accessories',
    reward: '800 Points',
    progress: 0
  },
];

interface ChallengesPageProps {
  onChallengeClick?: (challenge: typeof challenges[0]) => void;
}

export function ChallengesPage({ onChallengeClick }: ChallengesPageProps) {
  const [filter, setFilter] = useState<'active' | 'upcoming' | 'past'>('active');

  const filteredChallenges = challenges.filter(challenge => challenge.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'past':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Challenges" />

      {/* Background Orbs */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text-purple-pink">Challenges</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Join fashion challenges and earn rewards
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-bg-purple-pink flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text-purple-pink">12</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-bg-pink-coral flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text-purple-pink">3</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-bg-coral-yellow flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text-purple-pink">8,450</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            className={cn(filter === 'active' && "gradient-bg text-white")}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            className={cn(filter === 'upcoming' && "gradient-bg text-white")}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            className={cn(filter === 'past' && "gradient-bg text-white")}
            onClick={() => setFilter('past')}
          >
            Past
          </Button>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Card 
              key={challenge.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => {
                if (onChallengeClick) {
                  onChallengeClick(challenge);
                } else {
                  // Fallback for standalone usage
                  console.log('Navigate to challenge:', challenge.id);
                  alert(`View ${challenge.title} challenge (challenge-detail page)`);
                }
              }}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={challenge.coverImage}
                  alt={challenge.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Status Badge */}
                <Badge className={cn("absolute top-3 right-3", getStatusColor(challenge.status))}>
                  {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                </Badge>

                {/* Category Badge */}
                <Badge className="absolute top-3 left-3 glass">
                  {challenge.category}
                </Badge>

                {/* Reward */}
                <div className="absolute bottom-3 right-3">
                  <Badge className="gradient-bg text-white border-0">
                    <Trophy className="w-3 h-3 mr-1" />
                    {challenge.reward}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {challenge.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {challenge.description}
                </p>

                {/* Progress Bar (for active challenges) */}
                {challenge.status === 'active' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Your Progress</span>
                      <span className="font-semibold">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {(challenge.participants / 1000).toFixed(1)}K
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(challenge.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {challenge.status === 'active' && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getDaysRemaining(challenge.deadline)}d left
                    </span>
                  )}
                </div>

                {/* Action Button */}
                {challenge.status === 'active' && (
                  <Button className="w-full gradient-bg text-white">
                    Continue Challenge
                  </Button>
                )}
                {challenge.status === 'upcoming' && (
                  <Button variant="outline" className="w-full">
                    Set Reminder
                  </Button>
                )}
                {challenge.status === 'past' && (
                  <Button variant="outline" className="w-full">
                    View Results
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No {filter} challenges</h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new challenges
            </p>
          </div>
        )}
      </div>
    </div>
  );
}