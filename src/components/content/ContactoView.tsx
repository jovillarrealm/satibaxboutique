import React, { useState } from 'react';
import {
  MessageCircle,
  Clock,
  MapPin,
  Mail,
  Send,
  Sparkles,
  HelpCircle,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export interface ContactoViewProps {
  onNavigateCatalog?: () => void;
}

export const ContactoView: React.FC<ContactoViewProps> = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');

  const DEFAULT_WA_URL = 'https://wa.me/5492252515155?text=' + encodeURIComponent('¡Hola Satibax! Me gustaría hacer una consulta sobre los productos.');

  const buildCustomWhatsAppUrl = () => {
    let text = '¡Hola Satibax!';
    if (name.trim()) {
      text += ` Mi nombre es ${name.trim()}.`;
    }
    if (query.trim()) {
      text += ` Quería consultarles: ${query.trim()}`;
    } else {
      text += ' Me gustaría hacerles una consulta.';
    }
    return `https://wa.me/5492252515155?text=${encodeURIComponent(text)}`;
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildCustomWhatsAppUrl();
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const contactChannels = [
    {
      title: 'WhatsApp Oficial',
      detail: '+54 9 2252 515155',
      description: 'Atención personalizada, asesoramiento sobre tu tipo de piel y coordinación de pedidos.',
      actionLabel: 'Chatear ahora',
      actionUrl: DEFAULT_WA_URL,
      icon: MessageCircle,
      highlight: true,
    },
    {
      title: 'Ubicación & Origen',
      detail: 'Costa Atlántica, Buenos Aires',
      description: 'Boutique digital con base en la Costa Atlántica (Partido de La Costa). Envíos seguros a todo el país.',
      actionLabel: 'Ver envíos',
      icon: MapPin,
      highlight: false,
    },
    {
      title: 'Horarios de Atención',
      detail: 'Lunes a Sábados: 9:00 a 19:00 hs',
      description: 'Respondemos tus mensajes en el día. Consultas enviadas domingos o feriados se responden el siguiente día hábil.',
      icon: Clock,
      highlight: false,
    },
    {
      title: 'Correo Electrónico',
      detail: 'contacto@satibax.com',
      description: 'Para consultas institucionales, colaboraciones o consultas sobre pedidos mayoristas.',
      actionLabel: 'Enviar email',
      actionUrl: 'mailto:contacto@satibax.com',
      icon: Mail,
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: '¿Cómo coordino mi pedido?',
      a: 'Seleccioná los productos que te gusten en la boutique y hacé clic en "Pedir por WhatsApp". Se abrirá una conversación con el listado detallado para que Elizabeth o nuestro equipo confirmen stock y coordinen envío.',
    },
    {
      q: '¿Qué medios de pago aceptan?',
      a: 'Aceptamos transferencias bancarias directas, Mercado Pago y efectivo contra entrega en zonas seleccionadas de la Costa Atlántica.',
    },
    {
      q: '¿Hacen envíos a todo el país?',
      a: 'Sí, despachamos pedidos a toda la República Argentina a través de Correo Argentino y transportes seguros a domicilio o sucursal.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#F9F7F2] via-white/70 to-[#F9F7F2] border-b border-[#3D4D45]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA479]/20 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8FA479]" />
            <span>Estamos Cerca Tuyo</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#3D4D45] tracking-tight leading-tight">
            Contacto & Atención Personalizada
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#3D4D45]/80 font-light leading-relaxed max-w-2xl mx-auto">
            ¿Tenés dudas sobre qué producto es mejor para tu piel o querés consultar por tu pedido? Escribinos directamente, nos encanta escucharte.
          </p>
        </div>
      </section>

      {/* Contact Channels Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactChannels.map((channel, idx) => {
            const Icon = channel.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  channel.highlight
                    ? 'bg-white border-[#8FA479] shadow-md ring-1 ring-[#8FA479]/30'
                    : 'bg-white border-[#3D4D45]/10 shadow-xs hover:border-[#8FA479]/50'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#8FA479]/15 flex items-center justify-center text-[#3D4D45] mb-4">
                    <Icon className="w-6 h-6 text-[#3D4D45]" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#8FA479] font-semibold">
                    {channel.title}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#3D4D45] mt-1 mb-2">
                    {channel.detail}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3D4D45]/70 font-light leading-relaxed">
                    {channel.description}
                  </p>
                </div>

                {channel.actionUrl && (
                  <div className="mt-6 pt-4 border-t border-[#3D4D45]/10">
                    <a
                      href={channel.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2 transition-all ${
                        channel.highlight
                          ? 'bg-[#8FA479] text-[#F9F7F2] hover:bg-[#8FA479]/90 shadow-sm'
                          : 'bg-[#3D4D45]/5 text-[#3D4D45] hover:bg-[#3D4D45]/10'
                      }`}
                    >
                      <span>{channel.actionLabel}</span>
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Query Form + Interactive Assistant */}
      <section className="bg-white/80 py-14 sm:py-18 border-y border-[#3D4D45]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8FA479]">
                <MessageCircle className="w-4 h-4" />
                <span>Mensaje Directo</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D4D45]">
                Escribile a Elizabeth por WhatsApp
              </h3>
              <p className="text-sm text-[#3D4D45]/80 font-light leading-relaxed">
                Completá tu nombre y consulta aquí para abrir WhatsApp con tu mensaje ya redactado y listo para enviar.
              </p>
              <div className="pt-2 flex flex-col gap-2 text-xs text-[#3D4D45]/70">
                <span className="inline-flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8FA479]" /> Despachos rápidos desde la Costa
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8FA479]" /> Asesoramiento botánico sin compromiso
                </span>
              </div>
            </div>

            <div className="md:col-span-7 bg-[#F9F7F2] p-6 sm:p-8 rounded-3xl border border-[#3D4D45]/10 shadow-sm">
              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#3D4D45] mb-1">
                    Tu Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Sofía"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#3D4D45]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8FA479] text-[#3D4D45] placeholder-[#3D4D45]/40"
                  />
                </div>

                <div>
                  <label htmlFor="contact-query" className="block text-xs font-medium text-[#3D4D45] mb-1">
                    ¿Qué te gustaría consultar?
                  </label>
                  <textarea
                    id="contact-query"
                    rows={3}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej. Quiero saber qué serum me recomiendan para piel seca y sensible..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#3D4D45]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8FA479] text-[#3D4D45] placeholder-[#3D4D45]/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-[#3D4D45] hover:bg-[#553A49] active:scale-95 text-[#F9F7F2] font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#8FA479]" />
                  <span>Abrir WhatsApp (+54 9 2252 515155)</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="text-center max-w-xl mx-auto mb-10">
          <HelpCircle className="w-7 h-7 text-[#8FA479] mx-auto mb-2" />
          <h3 className="font-serif text-2xl font-bold text-[#3D4D45]">
            Preguntas Frecuentes
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#3D4D45]/70">
            Respuestas rápidas para tus dudas habituales.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-[#3D4D45]/10 shadow-xs"
            >
              <h4 className="font-serif text-base font-bold text-[#3D4D45] mb-2">
                {faq.q}
              </h4>
              <p className="text-sm text-[#3D4D45]/80 font-light leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
