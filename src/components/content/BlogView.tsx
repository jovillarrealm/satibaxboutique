import React, { useState } from 'react';
import type { BlogPost } from '../../db/catalog';
import { DEFAULT_POSTS } from '../../data/blogPosts';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Leaf,
  MessageCircle,
} from 'lucide-react';

export interface BlogViewProps {
  posts?: BlogPost[];
  selectedSlug?: string | null;
  onSelectPost?: (slug: string | null) => void;
  onNavigateCatalog?: () => void;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export const BlogView: React.FC<BlogViewProps> = ({
  posts = DEFAULT_POSTS,
  selectedSlug: controlledSlug,
  onSelectPost,
  onNavigateCatalog,
}) => {
  // Support both controlled and uncontrolled slug state
  const [internalSlug, setInternalSlug] = useState<string | null>(null);
  const activeSlug = controlledSlug !== undefined ? controlledSlug : internalSlug;

  const handleSelect = (slug: string | null) => {
    if (onSelectPost) {
      onSelectPost(slug);
    }
    setInternalSlug(slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Find active post if a slug is selected
  const activePost = activeSlug ? posts.find((p) => p.slug === activeSlug) : null;

  // Render Full Post View
  if (activeSlug) {
    if (!activePost) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white p-10 rounded-3xl border border-[#3D4D45]/10 shadow-sm max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-[#8FA479] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#3D4D45] mb-2">
              Artículo no encontrado
            </h3>
            <p className="text-sm text-[#3D4D45]/70 mb-6">
              El artículo que estás buscando no existe o ha sido movido.
            </p>
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8FA479] text-[#F9F7F2] font-semibold text-sm rounded-full shadow-sm hover:bg-[#8FA479]/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a artículos</span>
            </button>
          </div>
        </div>
      );
    }

    // Render markdown / formatted content with paragraphs and headings
    const renderParagraphs = (content: string) => {
      const blocks = content.split('\n\n');
      return blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings like ### Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={idx}
              className="font-serif text-xl sm:text-2xl font-bold text-[#3D4D45] mt-8 mb-3"
            >
              {trimmed.replace('### ', '')}
            </h4>
          );
        }

        // Subheadings like ## Heading
        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="font-serif text-2xl sm:text-3xl font-bold text-[#3D4D45] mt-10 mb-4"
            >
              {trimmed.replace('## ', '')}
            </h3>
          );
        }

        // List items
        if (trimmed.startsWith('1. ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const items = trimmed.split('\n');
          return (
            <ul key={idx} className="my-4 space-y-2 list-none pl-2">
              {items.map((item, itemIdx) => {
                const cleanItem = item.replace(/^(\d+\.|\-|\•)\s*/, '');
                return (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-base sm:text-lg text-[#3D4D45]/85 font-light leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#8FA479] mt-2 flex-shrink-0" />
                    <span>{cleanItem}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Normal paragraph with line breaks
        const lines = trimmed.split('\n');
        return (
          <p
            key={idx}
            className="text-base sm:text-lg text-[#3D4D45]/85 font-light leading-relaxed my-4"
          >
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {line}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      });
    };

    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Navigation Back */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3D4D45]/70 hover:text-[#3D4D45] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a artículos</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center sm:text-left border-b border-[#3D4D45]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA479]/20 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-4">
            <Leaf className="w-3.5 h-3.5 text-[#8FA479]" />
            <span>Reflexiones & Bienestar</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#3D4D45] leading-tight tracking-tight mb-4">
            {activePost.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-[#3D4D45]/60 font-light">
            <div className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#8FA479]" />
              <span>Elizabeth • Fundadora Satibax</span>
            </div>
            <span>•</span>
            <div className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#8FA479]" />
              <time dateTime={activePost.created_at}>{formatDate(activePost.created_at)}</time>
            </div>
          </div>
        </header>

        {/* Optional Cover Image */}
        {activePost.cover_image && (
          <div className="mb-10 rounded-3xl overflow-hidden shadow-md max-h-[420px]">
            <img
              src={activePost.cover_image}
              alt={activePost.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Body Content */}
        <div className="prose prose-lg max-w-none text-[#3D4D45] bg-white p-6 sm:p-10 rounded-3xl border border-[#3D4D45]/10 shadow-xs">
          {renderParagraphs(activePost.content)}
        </div>

        {/* Article Footer & Call to Action */}
        <footer className="mt-12 p-6 sm:p-8 bg-[#8FA479]/15 rounded-3xl border border-[#8FA479]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#3D4D45]">
              ¿Te inspiró esta lectura?
            </h4>
            <p className="text-xs sm:text-sm text-[#3D4D45]/70 font-light mt-1">
              Conocé las fórmulas botánicas creadas para acompañar tus momentos de calma.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onNavigateCatalog || (() => {
                if (typeof window !== 'undefined') {
                  window.location.hash = '#catalogo';
                }
              })}
              className="px-5 py-2.5 bg-[#3D4D45] hover:bg-[#553A49] text-[#F9F7F2] font-semibold text-xs sm:text-sm rounded-full transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Ver Productos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://wa.me/5492252515155"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white hover:bg-white/80 text-[#3D4D45] font-semibold text-xs sm:text-sm rounded-full border border-[#3D4D45]/15 transition-all shadow-xs inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#8FA479]" />
              <span>Escribile a Elizabeth</span>
            </a>
          </div>
        </footer>
      </article>
    );
  }

  // Render Articles Listing View
  return (
    <div className="w-full">
      {/* Editorial Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#F9F7F2] via-white/70 to-[#F9F7F2] border-b border-[#3D4D45]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA479]/20 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#8FA479]" />
            <span>Lecturas & Cuaderno Botánico</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#3D4D45] tracking-tight leading-tight">
            El Blog de Satibax
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#3D4D45]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Palabras sinceras sobre bienestar, botánica pura, historias detrás de nuestra boutique y rituales para vivir más conscientes.
          </p>
        </div>
      </section>

      {/* Articles Listing Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-[#3D4D45]/10 shadow-xs hover:shadow-md hover:border-[#8FA479] transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Decorative post header */}
                <div className="h-40 bg-gradient-to-br from-[#8FA479]/20 via-[#F9F7F2] to-[#3D4D45]/10 relative flex items-center justify-center p-6">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-[#3D4D45]/50">
                      <Leaf className="w-10 h-10 text-[#8FA479] mb-1" />
                      <span className="text-[11px] font-medium uppercase tracking-widest text-[#3D4D45]/60">
                        {post.slug === 'hola-soy-elizabeth' ? 'Historia Fundacional' : 'Cuidado Botánico'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#3D4D45]/60 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#8FA479]" />
                    <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#3D4D45] mb-2 leading-snug group-hover:text-[#8FA479]">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#3D4D45]/75 font-light leading-relaxed line-clamp-3">
                    {post.excerpt || post.content.slice(0, 160) + '...'}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleSelect(post.slug)}
                  className="w-full py-2.5 px-4 bg-[#F9F7F2] hover:bg-[#8FA479] text-[#3D4D45] hover:text-[#F9F7F2] font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 inline-flex items-center justify-between group"
                >
                  <span>Leer artículo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
