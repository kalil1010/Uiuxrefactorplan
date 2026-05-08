import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, AlertCircle, Loader2, CreditCard, Apple, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ImageWithFallback } from '../figma/ImageWithFallback';

type LoadingState = 'idle' | 'submitting' | 'error';
type PaymentMethod = 'card' | 'applePay' | 'googlePay';

type CartItem = {
  id: string;
  title: string;
  variant: string;
  qty: number;
  price: number;
  image: string;
};

export default function MobileCheckoutPage() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const items: CartItem[] = [
    // TODO(integration): replace with cart state from API/store
    {
      id: '1',
      title: 'Linen Summer Shirt',
      variant: 'M · Sand',
      qty: 1,
      price: 79,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200',
    },
    {
      id: '2',
      title: 'Wide-Leg Trousers',
      variant: 'M · Olive',
      qty: 1,
      price: 110,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200',
    },
  ];

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingCost = subtotal >= 50 ? 0 : 10;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shippingCost + tax;

  const fmt = (price: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(price);

  const isFormValid =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    street.trim().length > 0 &&
    city.trim().length > 0 &&
    postal.trim().length > 0 &&
    (payment !== 'card' || (cardNumber && expiry && cvc));

  const handlePlaceOrder = async () => {
    if (!isFormValid) return;
    setLoadingState('submitting');
    // TODO(integration): submit to payment provider + create order via API
    await new Promise((r) => setTimeout(r, 2000));
    setLoadingState('idle');
    // navigate to confirmation on success
  };

  const renderError = () => (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h2 className="text-xl font-bold mb-2">{t('error.title')}</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">{t('error.description')}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={() => setLoadingState('idle')}
          className="gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
        >
          {t('error.retry')}
        </Button>
        <Button variant="outline" className="active:bg-muted min-h-11">
          {t('error.goHome')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background border-b border-border pt-[env(safe-area-inset-top)] px-2 py-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-h-11 min-w-11"
          aria-label={tCommon('back')}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="flex-1 font-semibold text-lg">{t('title')}</h1>
      </header>

      {loadingState === 'error' ? (
        renderError()
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pb-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(keyboard-inset-height,0px)]">
            {/* Items */}
            <section className="px-4 py-4 border-b border-border">
              <h2 className="font-semibold mb-3">{t('sections.items')}</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.variant}</p>
                      <p className="text-xs text-muted-foreground">×{item.qty.toLocaleString(locale)}</p>
                    </div>
                    <p className="font-semibold text-sm">{fmt(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping */}
            <section className="px-4 py-4 border-b border-border space-y-3">
              <h2 className="font-semibold">{t('sections.shipping')}</h2>
              <div className="space-y-2">
                <Label htmlFor="name">{t('address.name')}</Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  enterKeyHint="next"
                  placeholder={t('address.namePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('address.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="next"
                  placeholder={t('address.phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="min-h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">{t('address.street')}</Label>
                <Input
                  id="street"
                  type="text"
                  autoComplete="street-address"
                  enterKeyHint="next"
                  placeholder={t('address.streetPlaceholder')}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="min-h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('address.city')}</Label>
                  <Input
                    id="city"
                    type="text"
                    autoComplete="address-level2"
                    enterKeyHint="next"
                    placeholder={t('address.cityPlaceholder')}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="min-h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">{t('address.postalCode')}</Label>
                  <Input
                    id="postal"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    enterKeyHint="next"
                    placeholder={t('address.postalCodePlaceholder')}
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="min-h-11"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="px-4 py-4 border-b border-border space-y-3">
              <h2 className="font-semibold">{t('sections.payment')}</h2>
              <div className="grid grid-cols-3 gap-2">
                {(['card', 'applePay', 'googlePay'] as PaymentMethod[]).map((method) => {
                  const isSelected = payment === method;
                  const Icon = method === 'card' ? CreditCard : method === 'applePay' ? Apple : Smartphone;
                  return (
                    <button
                      key={method}
                      onClick={() => setPayment(method)}
                      className={`min-h-11 px-3 py-2 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{t(`payment.${method}`)}</span>
                    </button>
                  );
                })}
              </div>

              {payment === 'card' && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">{t('payment.cardNumber')}</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      enterKeyHint="next"
                      placeholder={t('payment.cardNumberPlaceholder')}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="min-h-11"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">{t('payment.expiry')}</Label>
                      <Input
                        id="expiry"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        enterKeyHint="next"
                        placeholder={t('payment.expiryPlaceholder')}
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="min-h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">{t('payment.cvc')}</Label>
                      <Input
                        id="cvc"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        enterKeyHint="done"
                        placeholder={t('payment.cvcPlaceholder')}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="min-h-11"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Summary */}
            <section className="px-4 py-4 space-y-2">
              <h2 className="font-semibold mb-2">{t('sections.summary')}</h2>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('summary.subtotal')}</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('summary.shipping')}</span>
                <span>{shippingCost === 0 ? t('summary.free') : fmt(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('summary.tax')}</span>
                <span>{fmt(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                <span>{t('summary.total')}</span>
                <span>{fmt(total)}</span>
              </div>
            </section>
          </div>

          {/* Place Order CTA */}
          <div className="fixed bottom-0 start-0 end-0 z-40 bg-background border-t border-border px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <Button
              className="w-full gradient-bg text-primary-foreground hover:opacity-90 active:opacity-80 min-h-11"
              disabled={!isFormValid || loadingState === 'submitting'}
              onClick={handlePlaceOrder}
            >
              {loadingState === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 me-2 animate-spin" />
                  {t('placing')}
                </>
              ) : (
                `${t('placeOrder')} · ${fmt(total)}`
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
