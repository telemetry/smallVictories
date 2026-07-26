# Print Store — launch checklist

The store is live (unlinked) at [smallvictories.com.au/store/](https://smallvictories.com.au/store/).
Tick things off here as you go — full instructions for each step are in [README.md](README.md).

## 1. Pricing

- [ ] Get real prices from [Format Framing — Online Print and Frame](https://formatframing.com.au/products/online-print-and-frame)
      and fill in the **Real cost** column below
- [ ] Update `costFramedAud` for each size in `config/frames.json` with those real costs
- [ ] Remove the `"estimate": true` flags and set `"costsAreEstimates": false` in `config/frames.json`
- [ ] Run `npm run stripe:dry-run` and sanity-check the retail prices it prints
- [ ] Happy with the 2.5× markup (cost + 150%)? If not, change `markup` in `config/store.config.json`

Current pricing at **2.5× markup, rounded up to the nearest $5** (retail recalculates automatically from whatever costs are in `frames.json`):

| Size | Est. cost (AUD) | Real cost (fill in) | Retail @ 2.5× (est.) |
|---|---|---|---|
| 30 × 25 cm | $119 | $ | $300 |
| 40 × 30 cm | $149 | $ | $375 |
| 50 × 40 cm | $199 | $ | $500 |
| 70 × 50 cm | $259 | $ | $650 |
| 90 × 60 cm | $329 | $ | $825 |

Remember Stripe's fee comes out of your side: ~1.7% + $0.30 per domestic transaction (≈ $5–$15 at these prices).

## 2. Curate the prints

- [ ] Review the 19 prints in `config/prints.json` — set `"active": false` on any you don't want to sell
- [ ] Rename the `Untitled NN` titles (they become the Stripe product names on receipts)
- [ ] Trim the `sizes` array per print if some shouldn't be offered large/small
- [ ] Optional: add a short `description` per print

## 3. Stripe — test mode

- [ ] Create a Stripe account at [stripe.com](https://stripe.com) (country: Australia)
- [ ] Copy the **test** secret key from [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
- [ ] Run `cd store && npm install && STRIPE_SECRET_KEY=sk_test_... npm run stripe:setup`
- [ ] Commit the generated `config/stripe.json` and push — Buy buttons go live in test mode
- [ ] Do a test purchase with card `4242 4242 4242 4242` (any future expiry, any CVC)
- [ ] Check the order shows the size, frame colour, shipping address and phone in the Stripe dashboard

## 4. Stripe — go live

- [ ] Activate the Stripe account (business details, bank account for payouts)
- [ ] Decide on GST: not registered (under $75k turnover) → charge none; registered → enable Stripe Tax
      or treat prices as GST-inclusive
- [ ] Run `STRIPE_SECRET_KEY=sk_live_... npm run stripe:setup -- --live`
- [ ] Commit the regenerated `config/stripe.json` and push
- [ ] Turn on payment-success email notifications: Stripe Dashboard → Settings → Communication preferences
- [ ] Make one real purchase yourself end-to-end (you can refund it) and place the matching
      Format Framing order to test the full dropship flow

## 5. Announce

- [ ] Add the Print Store link back to the homepage (it was removed for the soft launch)
- [ ] Optional: link it from Instagram [@tezjnr](https://www.instagram.com/tezjnr/) / anywhere else

## Ongoing — each order

1. Stripe email arrives → open the payment, note print, size, frame colour, quantity, address, phone
2. Order exactly that at Format Framing (upload the **full-res master**, not the web file), shipped to the customer's address
3. Done — they make and ship in ~5 days, free AU delivery
