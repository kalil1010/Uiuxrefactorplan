import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Calendar, Users, Share2, Medal, Clock } from 'lucide-react';

const participants = [
  { id: 1, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=1', score: 2450, rank: 1 },
  { id: 2, name: 'Liam Chen', avatar: 'https://i.pravatar.cc/150?img=12', score: 2340, rank: 2 },
  { id: 3, name: 'Sophia Martinez', avatar: 'https://i.pravatar.cc/150?img=5', score: 2280, rank: 3 },
  { id: 4, name: 'Noah Anderson', avatar: 'https://i.pravatar.cc/150?img=13', score: 2150, rank: 4 },
  { id: 5, name: 'Olivia Taylor', avatar: 'https://i.pravatar.cc/150?img=9', score: 2090, rank: 5 },
];

const submissions = [
  { id: 1, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400', author: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=1', likes: 234 },
  { id: 2, image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400', author: 'Liam Chen', avatar: 'https://i.pravatar.cc/150?img=12', likes: 198 },
  { id: 3, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400', author: 'Sophia Martinez', avatar: 'https://i.pravatar.cc/150?img=5', likes: 267 },
  { id: 4, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', author: 'Noah Anderson', avatar: 'https://i.pravatar.cc/150?img=13', likes: 156 },
];

export default function ChallengeDetailPage() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      {/* Background Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="sticky top-0 z-40 glass-effect border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold gradient-text-coral-yellow">Challenge Details</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Challenge Hero */}
        <Card className="glass-effect mb-8">
          <div className="aspect-[21/6] relative overflow-hidden rounded-t-lg">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea628c8d?w=1200"
              alt="Challenge cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="bg-brand-yellow text-black mb-2">
                <Trophy className="w-3 h-3 mr-1" />
                Active Challenge
              </Badge>
            </div>
          </div>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-bold mb-3 gradient-text-coral-yellow">
                      #SummerStyleChallenge
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                      Show us your best summer outfit! Create a fresh, vibrant look that captures the essence of summer fashion. 
                      Mix patterns, play with colors, and let your creativity shine!
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg border">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">3,847</p>
                      <p className="text-sm text-muted-foreground">Participants</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border">
                    <Calendar className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Days left</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg border">
                    <Trophy className="w-8 h-8 text-brand-yellow" />
                    <div>
                      <p className="text-2xl font-bold">$500</p>
                      <p className="text-sm text-muted-foreground">Prize pool</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Challenge progress</span>
                    <span className="font-semibold">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>

                <div className="flex gap-3">
                  <Button className="gradient-bg-coral-yellow flex-1 sm:flex-none">
                    <Trophy className="w-4 h-4 mr-2" />
                    Join Challenge
                  </Button>
                  <Button variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Remind Me
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Rules */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="w-5 h-5" />
                  Challenge Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-muted-foreground">Create an original summer outfit photo</li>
                  <li className="text-muted-foreground">Use hashtag #SummerStyleChallenge in your post</li>
                  <li className="text-muted-foreground">Submit before the deadline (June 30, 2024)</li>
                  <li className="text-muted-foreground">One submission per participant</li>
                  <li className="text-muted-foreground">Follow ZokaiHub Community Guidelines</li>
                </ol>
              </CardContent>
            </Card>

            {/* Submissions */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Top Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                      <img
                        src={submission.image}
                        alt={submission.author}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={submission.avatar} />
                            <AvatarFallback>{submission.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-white text-sm font-medium">{submission.author}</span>
                        </div>
                        <p className="text-white/80 text-xs">{submission.likes} likes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Leaderboard */}
          <div className="space-y-6">
            <Card className="glass-effect sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-brand-yellow" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 font-bold text-primary">
                      #{participant.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{participant.name}</p>
                      <p className="text-sm text-muted-foreground">{participant.score} pts</p>
                    </div>
                    {participant.rank <= 3 && (
                      <Medal className={`w-5 h-5 ${
                        participant.rank === 1 ? 'text-yellow-500' :
                        participant.rank === 2 ? 'text-gray-400' :
                        'text-orange-600'
                      }`} />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
