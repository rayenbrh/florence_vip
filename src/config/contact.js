// ─────────────────────────────────────────────────────────────────
// CONTACT CONFIGURATION
// To change the WhatsApp number: edit whatsappRaw below.
// Write the full international number — the normalizer strips
// everything automatically. Use ONLY real digits.
// ─────────────────────────────────────────────────────────────────

export function normalizeWhatsAppDigits(value) {
  return String(value).replace(/\D/g, '')
}

const whatsappRaw = '+39 000 000 0000'

export const CONTACT = {
  whatsappNumber: normalizeWhatsAppDigits(whatsappRaw),
  phoneDisplay: '+39 000 000 0000',
  phoneHref: 'tel:+39000000000',
}
