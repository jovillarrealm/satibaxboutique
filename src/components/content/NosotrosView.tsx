import React from 'react';
import {
  Heart,
  Leaf,
  Sparkles,
  ShieldCheck,
  Sun,
  Smile,
  Compass,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

export interface NosotrosViewProps {
  onNavigateCatalog?: () => void;
  onNavigateContact?: () => void;
}

export const NosotrosView: React.FC<NosotrosViewProps> = ({
  onNavigateCatalog,
  onNavigateContact,
}) => {
  const WHATSAPP_URL = 'https://wa.me/5492252515155?text=' + encodeURIComponent('¡Hola Elizabeth! Leí sobre Satibax y me gustaría hacerles una consulta.');

  const philosophyPillars = [
    {
      title: 'Cruelty-Free & Ético',
      description: 'Creemos profundamente en el respeto por cada ser vivo. Ninguno de nuestros productos ni materias primas son testeados en animales.',
      icon: Heart,
    },
    {
      title: '100% Vegano & Botánico',
      description: 'Fórmulas basadas en el poder curativo y nutritivo de extractos de plantas, aceites esenciales puros y mantecas vegetales bioactivas.',
      icon: Leaf,
    },
    {
      title: 'Sin Parabenos ni Tóxicos',
      description: 'Libres de sulfatos agresivos, derivados del petróleo, siliconas oclusivas y conservantes sintéticos invasivos.',
      icon: ShieldCheck,
    },
    {
      title: 'Celiaco-Safe / Sin TACC',
      description: 'Cuidamos cada detalle para ofrecer opciones seguras y aptas para celíacos y pieles reactivas que requieren máxima pureza.',
      icon: Sparkles,
    },
  ];

  const brandValues = [
    {
      title: 'Pureza Botánica',
      text: 'Rescatamos la sabiduría ancestral de las plantas, seleccionando ingredientes que nutren la piel en armonía con su biología.',
    },
    {
      title: 'Consumo Consciente',
      text: 'Promovemos elecciones sinceras y compras responsables, con packaging reciclable y procesos de bajo impacto ambiental.',
    },
    {
      title: 'Atención Cercana y Humana',
      text: 'Detrás de cada respuesta y cada paquete hay personas que te escuchan con calidez para encontrar lo que realmente te hace bien.',
    },
    {
      title: 'Amor por los Procesos',
      text: 'Creemos que cuidarse es un ritual diario de conexión propia y calma, lejos de las exigencias o modas pasajeras.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-[#F9F7F2] via-white/80 to-[#F9F7F2] border-b border-[#3D4D45]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8FA479]/20 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-6">
            <Leaf className="w-4 h-4 text-[#8FA479]" />
            <span>Nuestra Historia & Esencia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3D4D45] tracking-tight leading-tight">
            Cosmética Natural nacida con amor consciente
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-[#3D4D45]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Satibax Boutique nació frente a la serenidad de la Costa Atlántica como un refugio de bienestar, honestidad botánica y amor propio.
          </p>
        </div>
      </section>

      {/* Brand & Founder Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Founder Portrait / Visual Element */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-[#8FA479]/20 rounded-3xl transform rotate-3 scale-95 transition-transform" />
              <div className="relative bg-white p-8 rounded-3xl border border-[#3D4D45]/10 shadow-lg text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8FA479]/30 to-[#3D4D45]/20 flex items-center justify-center text-[#3D4D45]">
                  <Sun className="w-12 h-12 text-[#3D4D45]" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#3D4D45] mb-1">
                  Elizabeth
                </h4>
                <p className="text-xs uppercase tracking-widest text-[#8FA479] font-medium mb-4">
                  Fundadora & Creadora
                </p>
                <p className="text-sm text-[#3D4D45]/80 italic leading-relaxed">
                  &ldquo;Entendí que las cosas simplemente son circunstancias, y somos nosotros quienes decidimos qué aprender en el camino.&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-[#3D4D45]/10 flex items-center justify-center gap-2 text-xs text-[#3D4D45]/60 font-light">
                  <Compass className="w-3.5 h-3.5 text-[#8FA479]" />
                  <span>Partido de La Costa • Costa Atlántica</span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Text */}
          <div className="lg:col-span-7 space-y-6 text-[#3D4D45]/90">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D4D45]">
              El origen de Satibax Boutique
            </h3>
            
            <p className="text-base sm:text-lg leading-relaxed font-light">
              Satibax Boutique no surgió de un plan corporativo masivo ni de algoritmos impersonales. Nació de la historia de <strong className="font-semibold text-[#3D4D45]">Elizabeth</strong>, de momentos de búsqueda profunda, de tormentas que enseñaron a pausar y de la necesidad sincera de volver a lo esencial.
            </p>

            <p className="text-base leading-relaxed font-light">
              Encontrando en la naturaleza de la Costa Atlántica un refugio de brisa, calma y flora viva, comprendió que el cuidado de la piel no debería ser una batalla contra el paso del tiempo, sino un acto amoroso de agradecimiento cotidiano con nuestro propio cuerpo.
            </p>

            <p className="text-base leading-relaxed font-light">
              Así comenzó la curaduría de fórmulas botánicas nobles: productos limpios, elaborados con materias primas nobles, respetuosos del medio ambiente y formulados con la convicción de que lo que aplicamos en nuestra piel ingresa directamente a nuestro ser.
            </p>
          </div>
        </div>
      </section>

      {/* Clean Cosmetics Philosophy */}
      <section className="bg-white/70 py-16 sm:py-20 border-y border-[#3D4D45]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA479]/20 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-[#8FA479]" />
              <span>Cosmética Limpia & Saludable</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D4D45]">
              Nuestra Filosofía Limpia
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#3D4D45]/70 font-light">
              Transparencia total en cada fórmula. Elegimos ingredientes puros y descartamos todo aquello que comprometa tu bienestar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F9F7F2] p-6 rounded-2xl border border-[#3D4D45]/10 flex flex-col items-start hover:border-[#8FA479] transition-colors duration-200"
                >
                  <div className="p-3 rounded-xl bg-white text-[#3D4D45] shadow-xs mb-4">
                    <Icon className="w-6 h-6 text-[#8FA479]" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#3D4D45] mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-[#3D4D45]/75 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Brand Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="font-serif text-3xl font-bold text-[#3D4D45]">
            Nuestros Valores
          </h3>
          <p className="mt-2 text-sm text-[#3D4D45]/70">
            Los pilares que guían cada paso de Satibax Boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-[#3D4D45]/10 shadow-xs flex gap-4 items-start"
            >
              <div className="w-8 h-8 rounded-full bg-[#8FA479]/20 flex items-center justify-center flex-shrink-0 text-[#3D4D45] font-serif font-bold text-sm">
                0{idx + 1}
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#3D4D45] mb-1.5">
                  {val.title}
                </h4>
                <p className="text-sm text-[#3D4D45]/80 font-light leading-relaxed">
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Warm Personal Note & CTA */}
      <section className="bg-[#3D4D45] text-[#F9F7F2] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Smile className="w-10 h-10 text-[#8FA479] mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F9F7F2]">
            Gracias por elegir un camino más consciente
          </h3>
          <p className="text-base text-[#F9F7F2]/80 font-light leading-relaxed">
            Cada vez que elegís un producto botánico, estás apoyando un modo de vivir más armónico, respetuoso de tu propia piel y del planeta que habitamos.
          </p>
          <p className="font-serif italic text-lg text-[#8FA479]">
            Elizabeth 🌿
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={onNavigateCatalog || (() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '#catalogo';
                }
              })}
              className="px-6 py-3 bg-[#8FA479] hover:bg-[#8FA479]/90 text-[#3D4D45] font-semibold text-sm rounded-full transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigateContact ? () => onNavigateContact() : undefined}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-[#F9F7F2] font-semibold text-sm rounded-full transition-all border border-[#F9F7F2]/20 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#8FA479]" />
              <span>Escribinos por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
