import Stripe from 'stripe';
// process.env.STRIPE_SECRET_KEY
const stripe = new Stripe('sk_test_51MsPqhSEMKm8dm2J71oFkMAxmnPg4UPaN6bdbvWEyeWyufMSZ8M5MjO6TE9nrF0rmTHP6uP0eaP2cwTdiBHiErI600dgsNTfCv');
const items = [];

export const paymentStripe = async (req, res, next) => {
    const items = req.body.rooms;
    const dayCnt = req.body.dayCnt;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => {
            var prod = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.roomName[0],
                    },
                    unit_amount: item.cost * 100 * dayCnt,
                },
                quantity: 1
            }
            return prod;
        }),
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    res.status(200).json({ url: session.url });
}
