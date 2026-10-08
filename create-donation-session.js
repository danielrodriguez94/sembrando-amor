const DESIGNATIONS = {
  general: 'Fondo general — donde más se necesite',
  academies: 'Academias y talleres',
  brigades: 'Brigadas y ayuda comunitaria',
  mothers: 'Madres y familias',
  inclusion: 'Programas de inclusión'
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

export async function onRequestPost(context) {
  try {
    if (!context.env.STRIPE_SECRET_KEY) {
      return json({ error: 'STRIPE_SECRET_KEY is not configured.' }, 500);
    }

    const body = await context.request.json();
    const amount = Number(body.amount);
    const frequency = body.frequency === 'monthly' ? 'monthly' : 'once';
    const designation = DESIGNATIONS[body.designation] ? body.designation : 'general';
    const locale = body.locale === 'en' ? 'en' : 'es';

    if (!Number.isFinite(amount) || amount < 5 || amount > 100000) {
      return json({ error: 'Invalid donation amount.' }, 400);
    }

    const origin = new URL(context.request.url).origin;
    const cents = Math.round(amount * 100);
    const params = new URLSearchParams();

    params.set('mode', frequency === 'monthly' ? 'subscription' : 'payment');
    params.set('success_url', `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`);
    params.set('cancel_url', `${origin}/?donation=cancelled`);
    params.set('locale', locale === 'en' ? 'en' : 'es');
    params.set('billing_address_collection', 'auto');
    params.set('line_items[0][quantity]', '1');
    params.set('line_items[0][price_data][currency]', 'usd');
    params.set('line_items[0][price_data][unit_amount]', String(cents));
    params.set('line_items[0][price_data][product_data][name]', frequency === 'monthly' ? 'Donación mensual' : 'Donación');
    params.set('line_items[0][price_data][product_data][description]', DESIGNATIONS[designation]);
    params.set('metadata[designation]', designation);
    params.set('metadata[frequency]', frequency);

    if (frequency === 'monthly') {
      params.set('line_items[0][price_data][recurring][interval]', 'month');
      params.set('subscription_data[metadata][designation]', designation);
    } else {
      params.set('customer_creation', 'always');
      params.set('payment_intent_data[metadata][designation]', designation);
    }

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const session = await stripeResponse.json();
    if (!stripeResponse.ok || !session.url) {
      console.error('Stripe error', session);
      return json({ error: session?.error?.message || 'Could not create Checkout Session.' }, 502);
    }

    return json({ url: session.url });
  } catch (error) {
    console.error(error);
    return json({ error: 'Unexpected server error.' }, 500);
  }
}
