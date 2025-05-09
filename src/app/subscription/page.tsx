
'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Zap, AlertCircle, Banknote, User, Hash, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlan {
  id: 'monthly' | 'annual';
  name: string;
  price: string;
  billingCycle: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: 'R149',
    billingCycle: '/month',
    features: [
      'Access to all courses',
      'AI Study Planner',
      'Progress Tracking',
      'Downloadable Resources',
      'Email Support',
    ],
    cta: 'Choose Monthly',
    highlight: false,
  },
  {
    id: 'annual',
    name: 'Annual Plan',
    price: 'R1490',
    billingCycle: '/year',
    features: [
      'Access to all courses',
      'AI Study Planner',
      'Progress Tracking',
      'Downloadable Resources',
      'Priority Email Support',
      '2 Months Free (Save R298)',
    ],
    cta: 'Choose Annual',
    highlight: true,
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setBankName('');
    setAccountHolder('');
    setAccountNumber('');
    setBranchCode('');
    setFormError(null);
  };

  const handlePaymentSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!bankName || !accountHolder || !accountNumber || !branchCode) {
      setFormError('All banking detail fields are required.');
      return;
    }
    if (accountNumber.length < 6 || !/^\d+$/.test(accountNumber)) {
      setFormError('Account number must be at least 6 digits and contain only numbers.');
      return;
    }
     if (branchCode.length < 4 || !/^\d+$/.test(branchCode)) {
      setFormError('Branch code must be at least 4 digits and contain only numbers.');
      return;
    }


    console.log('Subscribing to:', selectedPlan?.name);
    console.log('Banking Details:', { bankName, accountHolder, accountNumber, branchCode });

    toast({
      title: 'Subscription Initiated (Mock)',
      description: `Your request to subscribe to the ${selectedPlan?.name} with bank account ending in ...${accountNumber.slice(-4)} has been received.`,
      variant: 'default'
    });

    // Reset form
    setSelectedPlan(null);
    setBankName('');
    setAccountHolder('');
    setAccountNumber('');
    setBranchCode('');
  };

  return (
    <div className="container mx-auto py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Unlock Your Full Potential</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose a plan that suits your learning needs and get unlimited access to all our premium features.
        </p>
      </section>

      {!selectedPlan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`flex flex-col shadow-xl rounded-xl ${plan.highlight ? 'border-2 border-primary ring-4 ring-primary/20' : 'border'}`}>
              {plan.highlight && (
                <div className="py-2 px-4 bg-primary text-primary-foreground text-sm font-semibold text-center rounded-t-lg -mt-px">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <Zap className={`h-12 w-12 mx-auto mb-4 ${plan.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                <div className="my-2">
                  <span className="text-4xl font-extrabold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.billingCycle}</span>
                </div>
                <CardDescription>Perfect for dedicated learners.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 my-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success mr-2 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-6">
                <Button
                  size="lg"
                  className={`w-full text-lg py-3 ${plan.highlight ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedPlan && (
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Confirm Subscription: {selectedPlan.name}</CardTitle>
              <CardDescription>
                Please provide your banking details to complete your subscription.
                Payments will be processed securely.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePaymentSubmit}>
              <CardContent className="space-y-6">
                {formError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="bankName"
                      type="text"
                      placeholder="e.g., Standard Bank, FNB, Capitec"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolder">Account Holder Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="accountHolder"
                      type="text"
                      placeholder="Full name as it appears on your bank account"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="accountNumber"
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Your bank account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branchCode">Branch Code</Label>
                   <div className="relative">
                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="branchCode"
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="Your bank's branch code"
                      value={branchCode}
                      onChange={(e) => setBranchCode(e.target.value.replace(/\D/g, ''))}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button type="submit" size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Confirm Subscription for {selectedPlan.price}{selectedPlan.billingCycle}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setSelectedPlan(null)} className="w-full sm:w-auto">
                  Cancel / Change Plan
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
      
      <p className="text-center text-sm text-muted-foreground mt-10">
        Manage your existing subscription or update payment details in your account settings (feature coming soon). <br/>
        All banking information is handled securely (this is a mock interface).
      </p>
    </div>
  );
}

