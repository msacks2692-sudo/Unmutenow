import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = 'pk_test_51Rz3cTQj9drLt0eDe72d15nbKLwayYBY2eBhnun2Ecc20iTztv8lfjYL5WwXpuxdXL6Ojib6FXLoO1PxHZ53WUcg003GIZOBTD';

export const stripePromise = loadStripe(stripePublishableKey);
