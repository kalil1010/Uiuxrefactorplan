import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle2, Package, ShoppingBag, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type OrderItem = {
  id: string;
  title: string;
  qty: number;
  price: number;
  image: string;
};

type Order = {
  number: string;
  estimatedDelivery: number;
  total: number;
  currency: string;
  items: OrderItem[];
};

interface Props {
  order?: Order;
}

export default function MobileOrderConfirmation({ order }: Props) {
  const t = useTranslations('orderConfirmation');
  const locale = useLocale();

  // TODO(integration): replace with real order from API/route param
  const data: Order =
    order ?? {
      number: 'ZH-23847',
      estimatedDelivery: Date.now() + 4 * 24 * 60 * 60 * 1000,
      total: 219,
      currency: 'USD',
      items: [
        {
          id: '1',
          title: 'Linen Summer Shirt',
          qty: 1,
          price: 79,
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200',
        },
        {
          id: '2',
          title: 'Wide-Leg Trousers',
          qty: 1,
          price: 110,
          image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200',
        },
      ],
    };

  const fmt = (price: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: data.currency }).format(price);

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pt-[env(safe-area-inset-top)] pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {/* Hero */}
        <div className="px-6 py-12 text-center">
          <div className="w-20 h-20 rounded-full gradient-bg-purple-pink flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
          <p className="text-muted-foreground mb-6">{t('subtitle')}</p>
          <div className="bg-muted/50 rounded-lg p-4 max-w-xs mx-auto space-y-1">
            <p className="font-semibold">{t('orderNumber', { number: data.number })}</p>
            <p className="text-sm text-muted-foreground">
              {t('estimatedDelivery', { date: dateFormatter.format(new Date(data.estimatedDelivery)) })}
            </p>
          </div>
        </div>

        {/* Summary */}
        <section className="px-4 py-4 border-t border-border">
          <h2 className="font-semibold mb-3">{t('summary')}</h2>
          <div className="space-y-3">
            {data.items.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    ×{item.qty.toLocaleString(locale)}
                  </p>
                </div>
                <p className="font-semibold text-sm">{fmt(item.price * item.qty)}</p>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-3 border-t border-border">
              <span>{t('summary')}</span>
              <span>{fmt(data.total)}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTAs */}
      <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="space-y-2">
          <Button
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
            onClick={() => {
              // TODO(integration): navigate to order tracking
            }}
          >
            <Package className="w-5 h-5 me-2" />
            {t('actions.trackOrder')}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="active:bg-muted min-h-11"
              onClick={() => {
                // TODO(integration): navigate to marketplace
              }}
            >
              <ShoppingBag className="w-4 h-4 me-2" />
              {t('actions.continueShopping')}
            </Button>
            <Button
              variant="ghost"
              className="active:bg-muted min-h-11"
              onClick={() => {
                // TODO(integration): navigate to my orders
              }}
            >
              <FileText className="w-4 h-4 me-2" />
              {t('actions.viewOrders')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
