import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

const reviews = [
  {
    id: 1,
    product: 'Premium Leather Jacket',
    productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100',
    customer: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    comment: 'Absolutely love this jacket! The quality is outstanding and it fits perfectly. Highly recommend!',
    date: '2024-02-01',
    helpful: 12
  },
  {
    id: 2,
    product: 'Slim Fit Denim Jeans',
    productImage: 'https://images.unsplash.com/photo-1542272454315-7fbb7cda0d4d?w=100',
    customer: 'Liam Chen',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4,
    comment: 'Great jeans, very comfortable. The fit is good but I wish they came in more colors.',
    date: '2024-01-31',
    helpful: 8
  },
  {
    id: 3,
    product: 'Wool Blend Sweater',
    productImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100',
    customer: 'Sophia Martinez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    comment: 'Perfect for winter! Soft, warm, and stylish. Will definitely buy more from this seller.',
    date: '2024-01-30',
    helpful: 15
  },
];

export function ReviewsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <p className="text-4xl font-bold">4.8</p>
                <Star className="w-8 h-8 fill-yellow-500 text-yellow-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">from 1,247 reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">5 Stars</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '85%' }} />
              </div>
              <span className="text-sm font-semibold">85%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">4 Stars</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '12%' }} />
              </div>
              <span className="text-sm font-semibold">12%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">3 Stars & Below</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '3%' }} />
              </div>
              <span className="text-sm font-semibold">3%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 rounded-lg border">
              <div className="flex items-start gap-4">
                <img
                  src={review.productImage}
                  alt={review.product}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{review.product}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.customer[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{review.customer}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-foreground">{review.comment}</p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful} helpful</span>
                    </button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Respond
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
