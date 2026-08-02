# Print Store — launch checklist

The store is live (unlinked) at [smallvictories.com.au/store/](https://smallvictories.com.au/store/).
Tick things off here as you go — full instructions for each step are in [README.md](README.md).

## 1. Pricing

- [x] Get real prices from [Format Framing — Online Print and Frame](https://formatframing.com.au/products/online-print-and-frame)
      and fill in the **Real cost** column below
- [x] Update `costFramedAud` for each size in `config/frames.json` with those real costs
- [x] Remove the `"estimate": true` flags and set `"costsAreEstimates": false` in `config/frames.json`
- [x] Run `npm run stripe:dry-run` and sanity-check the retail prices it prints
- [ ] Happy with the 2.5× markup (cost + 150%)? If not, change `markup` in `config/store.config.json`

Real Format Framing costs at **2.5× markup, rounded up to the nearest $5** (retail recalculates automatically from `frames.json`). Rectangular sizes come in both orientations; squares apply to square prints only:

| Size | Range | Real cost (AUD) | Retail @ 2.5× |
|---|---|---|---|
| 30 × 20 cm | Gallery Small | $99 | $250 |
| 30 × 30 cm | Gallery Small | $99 | $250 |
| 60 × 40 cm | Gallery Small | $249 | $625 |
| 60 × 60 cm | Gallery Small | $249 | $625 |
| 90 × 60 cm | Gallery Large | $399 | $1,000 |
| 120 × 80 cm | Gallery Large | $749 | $1,875 |

Remember Stripe's fee comes out of your side: ~1.7% + $0.30 per domestic transaction (≈ $5–$15 at these prices).

## 2. Curate the prints

- [ ] Review the 19 prints in `config/prints.json` — set `"active": false` on any you don't want to sell
- [ ] Rename the `Untitled NN` titles (they become the Stripe product names on receipts)
- [ ] Trim the `sizes` array per print if some shouldn't be offered large/small
- [ ] Optional: add a short `description` per print

## 3. Format Framing artist setup (one-time)

- [ ] Email info@formatframing.com.au to introduce yourself and formalise the artist
      arrangement (they reply within two business days)
- [ ] Set up the shared Dropbox folder of high-res print-ready files, filenames matching
      the store's print titles (rename the `Untitled NN` titles first!)
- [ ] Request blank COA stickers with the first order and pre-sign them; start an
      edition-number ledger
- [ ] Decide packaging: white-label (no Format branding)? Tape / stickers / postcards?

## 4. Stripe — test mode

- [ ] Create a Stripe account at [stripe.com](https://stripe.com) (country: Australia)
- [ ] Copy the **test** secret key from [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
- [ ] Run `cd store && npm install && STRIPE_SECRET_KEY=sk_test_... npm run stripe:setup`
- [ ] Commit the generated `config/stripe.json` and push — Buy buttons go live in test mode
- [ ] Do a test purchase with card `4242 4242 4242 4242` (any future expiry, any CVC)
- [ ] Check the order shows the size, frame colour, shipping address and phone in the Stripe dashboard

## 5. Stripe — go live

- [ ] Activate the Stripe account (business details, bank account for payouts)
- [ ] Decide on GST: not registered (under $75k turnover) → charge none; registered → enable Stripe Tax
      or treat prices as GST-inclusive
- [ ] Run `STRIPE_SECRET_KEY=sk_live_... npm run stripe:setup -- --live`
- [ ] Commit the regenerated `config/stripe.json` and push
- [ ] Turn on payment-success email notifications: Stripe Dashboard → Settings → Communication preferences
- [ ] Make one real purchase yourself end-to-end (you can refund it) and place the matching
      Format Framing order to test the full dropship flow

## 6. Announce

- [ ] Add the Print Store link back to the homepage (it was removed for the soft launch)
- [ ] Optional: link it from Instagram [@tezjnr](https://www.instagram.com/tezjnr/) / anywhere else

## Ongoing — each order

1. Stripe email arrives → note print, size, frame colour, matte, quantity, address, phone
2. Place the matching order on Format's Print & Frame page — in the notes: the Dropbox
   filename, COA + edition number, white-label/packaging requests
3. **Billing address = yours, shipping address = the customer's**
4. Done — free express, tracked (Australia only); at the customer's door within two weeks
   (you get tracking by email, they get a text)
