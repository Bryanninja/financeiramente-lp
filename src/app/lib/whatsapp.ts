export const WHATSAPP_NUMBER = "5511981110009";

export const WHATSAPP_MESSAGES = {
  default:
    "Olá Michel! Gostaria de agendar uma Sessão Estratégica FinanceiraMente.",
  sessaoEstrategica:
    "Olá Michel! Quero agendar minha Sessão Estratégica FinanceiraMente gratuita.",
};

export function getWhatsAppUrl(
  message: keyof typeof WHATSAPP_MESSAGES = "default",
) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[message])}`;
}
