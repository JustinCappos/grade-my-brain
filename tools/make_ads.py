"""Generates the mock advertisement SVGs used by the fine-print questions.

Every brand is fictional, and each image is labeled as a mock ad.
Run from the repo root:  python3 tools/make_ads.py
"""
import html, os, sys
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'images', 'ads')
W, H = 640, 400
FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"

def t(x, y, s, size, fill, weight="400", anchor="start", extra=""):
    return f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" {extra}>{html.escape(s)}</text>'

def ad(name, bg, accent, ink, brand, lines, price, price_note, fine, art, sticker=None):
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">',
             f'<rect width="{W}" height="{H}" rx="18" fill="{bg}"/>',
             t(32, 52, brand, 22, accent, "800", extra='letter-spacing="1"')]
    y = 108
    for ln in lines:
        parts.append(t(32, y, ln, 30, ink, "800")); y += 38
    parts.append(t(32, y + 34, price, 62, accent, "900"))
    if price_note:
        parts.append(t(32, y + 64, price_note, 16, ink, "600"))
    parts.append(art)
    if sticker:
        sx, sy, txt = sticker
        parts.append(f'<circle cx="{sx}" cy="{sy}" r="46" fill="{accent}"/>')
        for i, s in enumerate(txt):
            parts.append(t(sx, sy - 6 + i * 22, s, 20 if i == 0 else 15, bg, "900", "middle"))
    parts.append(f'<rect x="0" y="{H-78}" width="{W}" height="78" fill="#000" fill-opacity="0.06"/>')
    fy = H - 58
    for ln in fine:
        parts.append(t(32, fy, ln, 10.5, ink, "400", extra='fill-opacity="0.72"')); fy += 14
    parts.append(t(W - 16, 20, "MOCK AD · FICTIONAL BRAND", 9, ink, "700", "end", 'fill-opacity="0.45" letter-spacing="0.5"'))
    parts.append('</svg>')
    open(os.path.join(OUT, name + '.svg'), 'w').write('\n'.join(parts) + '\n')

phone = '<g transform="translate(470 70)"><rect width="110" height="200" rx="18" fill="#0f172a"/><rect x="8" y="14" width="94" height="168" rx="10" fill="#38bdf8"/><circle cx="55" cy="191" r="4" fill="#475569"/><path d="M30 80 q25 -30 50 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M40 98 q15 -18 30 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="55" cy="114" r="6" fill="#fff"/></g>'
ad('phone-plan', '#fff7ed', '#ea580c', '#1c1917', 'TELVIO MOBILE',
   ['Unlimited talk,', 'text & data'], '$25/mo*', 'No credit check. Switch today!',
   ['*Price for first 3 months with AutoPay; $65/mo thereafter. Requires 24-month service agreement.',
    '$35 activation fee. Taxes and fees extra. Data may be slowed after 30GB.',
    'Offer for new lines only.'], phone)

tv = '<g transform="translate(410 70)"><rect width="190" height="120" rx="10" fill="#111827"/><rect x="8" y="8" width="174" height="104" rx="6" fill="#6d28d9"/><polygon points="80,40 80,80 115,60" fill="#fff"/><rect x="80" y="124" width="30" height="14" fill="#374151"/><rect x="55" y="138" width="80" height="6" rx="3" fill="#374151"/></g>'
ad('streaming-trial', '#1e1b4b', '#facc15', '#f8fafc', 'STREAMNOOK',
   ['Thousands of shows.', 'Zero commitment.'], 'FREE*', 'for 30 days',
   ['*Then $15.99/mo, billed annually as $191.88 on day 31. Cancel at least 24 hours before your trial ends',
    'to avoid being charged. Annual plans are non-refundable, including partial years.',
    'One trial per household. Payment method required.'], tv)

mattress = '<g transform="translate(395 150)"><rect x="0" y="20" width="210" height="58" rx="16" fill="#e0f2fe" stroke="#0369a1" stroke-width="3"/><rect x="0" y="20" width="210" height="18" rx="9" fill="#bae6fd"/><rect x="14" y="0" width="60" height="26" rx="12" fill="#fff" stroke="#0369a1" stroke-width="3"/><rect x="10" y="78" width="12" height="16" fill="#0369a1"/><rect x="188" y="78" width="12" height="16" fill="#0369a1"/></g>'
ad('mattress-sale', '#f0f9ff', '#be123c', '#0c4a6e', 'NIMBUSLEEP',
   ['Cloud Hybrid Queen', 'WAS $1,999'], 'NOW $599', 'Limited-time savings event!',
   ['Savings calculated from manufacturer\'s suggested retail price (MSRP) of $1,999.',
    'Average selling price of this model over the past 90 days: $649. While supplies last.',
    'Free shipping in the contiguous U.S.'], mattress, sticker=(560, 80, ['70%', 'OFF']))

bottle = '<g transform="translate(470 80)"><rect x="18" y="0" width="64" height="26" rx="6" fill="#065f46"/><rect x="0" y="22" width="100" height="160" rx="18" fill="#10b981"/><rect x="10" y="62" width="80" height="70" rx="6" fill="#ecfdf5"/><text x="50" y="94" font-family="Helvetica, Arial, sans-serif" font-size="16" font-weight="900" fill="#065f46" text-anchor="middle">FOCUS+</text><text x="50" y="114" font-family="Helvetica, Arial, sans-serif" font-size="11" fill="#065f46" text-anchor="middle">60 capsules</text></g>'
ad('supplement-claim', '#ecfdf5', '#047857', '#064e3b', 'ZENOVITA',
   ['Clinically proven*', 'to boost energy by'], '40%', 'Feel the difference in days!',
   ['*Based on a 2-week study of 12 adults funded by ZenoVita, Inc. Individual results vary; results not typical.',
    'These statements have not been evaluated by the Food and Drug Administration. This product is not',
    'intended to diagnose, treat, cure, or prevent any disease.'], bottle)

car = '<g transform="translate(395 120)"><path d="M10 80 L30 40 Q40 22 70 20 L150 20 Q175 22 190 45 L215 55 Q228 60 228 75 L228 92 L10 92 Z" fill="#334155"/><path d="M48 44 L64 28 L110 28 L110 44 Z M120 28 L150 28 Q165 30 176 44 L120 44 Z" fill="#cbd5e1"/><circle cx="58" cy="94" r="20" fill="#0f172a"/><circle cx="58" cy="94" r="8" fill="#94a3b8"/><circle cx="182" cy="94" r="20" fill="#0f172a"/><circle cx="182" cy="94" r="8" fill="#94a3b8"/></g>'
ad('car-lease', '#f8fafc', '#2563eb', '#0f172a', 'ARCLINE MOTORS',
   ['2027 Volt S', 'Lease for just'], '$199/mo*', 'Visit your Arcline dealer today.',
   ['*36-month lease. $3,999 due at signing. 10,000 miles per year; $0.25 per mile over. Excludes taxes, title,',
    'registration, and dealer fees. Subject to credit approval. Lessee responsible for excess wear.',
    'Offer ends 11/30.'], car)

card = '<g transform="translate(420 85)"><rect width="190" height="120" rx="14" fill="#7c3aed"/><rect x="18" y="30" width="34" height="26" rx="5" fill="#fde68a"/><text x="18" y="96" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#ede9fe" letter-spacing="1">4000 1234 5678 9010</text><text x="172" y="28" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="800" fill="#ede9fe" text-anchor="end">LARKSPUR</text></g>'
ad('zero-interest', '#faf5ff', '#7c3aed', '#2e1065', 'LARKSPUR REWARDS CARD',
   ['Big purchase?', 'Pay no interest*'], '0%', 'for 12 months on purchases of $299 or more',
   ['*Deferred interest: interest is charged to your account from the purchase date if the promotional balance',
    'is not paid in full within 12 months. Standard purchase APR 29.99%. Minimum payments required.',
    'Subject to credit approval.'], card)

plane = '<g transform="translate(430 90) rotate(-12 90 50)"><path d="M0 52 L170 44 Q192 44 192 52 Q192 60 170 60 L0 52 Z" fill="#0ea5e9"/><path d="M80 50 L120 0 L136 0 L112 50 Z" fill="#0284c7"/><path d="M80 56 L120 106 L136 106 L112 56 Z" fill="#0284c7"/><path d="M8 50 L22 26 L32 26 L26 50 Z" fill="#0284c7"/></g>'
ad('airfare-from', '#ecfeff', '#0891b2', '#083344', 'HOPWING AIR',
   ['New York ⇄ Miami', 'Fares from'], '$49*', 'Book by Sunday!',
   ['*Fare is each way. Valid on select Tuesday and Wednesday departures; limited seats. Carry-on bag $45 each way.',
    'Checked bag $40 each way. Seat selection from $18. Taxes and government fees included in fare.',
    'Non-refundable.'], plane)
