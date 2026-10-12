export function whatsappUrl(number: string, message: string): string {
  if (!/^[1-9]\d{7,14}$/.test(number)) throw new Error("Número de WhatsApp inválido.");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
