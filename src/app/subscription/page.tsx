import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap } from 'lucide-react';

const subscriptionPlans = [
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
  return (
    <div className="container mx-auto py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">Unlock Your Full Potential</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose a plan that suits your learning needs and get unlimited access to all our premium features.
          All payments are securely processed via Stripe.
        </p>
      </section>

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
                // onClick={() => alert(`Subscribing to ${plan.name} via Stripe (placeholder). Stripe Key: [Stripe Key Number]`)}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-10">
        Manage your existing subscription or update payment details in your account settings (feature coming soon).
      </p>
    </div>
  );
}
