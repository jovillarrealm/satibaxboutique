import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { isValidEmail, NewsletterSubscription } from '../src/components/content/NewsletterSubscription';
import { NosotrosView } from '../src/components/content/NosotrosView';
import { ContactoView } from '../src/components/content/ContactoView';
import { BlogView } from '../src/components/content/BlogView';
import { DEFAULT_POSTS } from '../src/data/blogPosts';
import App from '../src/App';

describe('NewsletterSubscription component', () => {
  it('validates email addresses properly with isValidEmail', () => {
    expect(isValidEmail('usuario@gmail.com')).toBe(true);
    expect(isValidEmail('elizabeth@satibax.com')).toBe(true);
    expect(isValidEmail('nombre.apellido+tag@dominio.com.ar')).toBe(true);

    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
    expect(isValidEmail('usuario')).toBe(false);
    expect(isValidEmail('usuario@')).toBe(false);
    expect(isValidEmail('@dominio.com')).toBe(false);
    expect(isValidEmail('usuario@dominio')).toBe(false);
    expect(isValidEmail('usuario space@dominio.com')).toBe(false);
  });

  it('renders newsletter subscription box with input and botanical button', () => {
    const html = renderToString(
      React.createElement(NewsletterSubscription, {
        title: 'Sumate a nuestro Círculo Botánico',
        description: 'Recibí consejos de cuidado natural y promociones exclusivas.',
      })
    );

    expect(html).toContain('Sumate a nuestro C\u00edrculo Bot\u00e1nico');
    expect(html).toContain('Recib\u00ed consejos de cuidado natural');
    expect(html).toContain('placeholder="Tu correo electr\u00f3nico"');
    expect(html).toContain('Suscribirme');
  });

  it('renders with compact variant styling when compact=true', () => {
    const html = renderToString(
      React.createElement(NewsletterSubscription, {
        compact: true,
      })
    );

    expect(html).toContain('Suscribirme');
  });
});

describe('NosotrosView component', () => {
  it('renders botanical brand story and founder Elizabeth details', () => {
    const html = renderToString(
      React.createElement(NosotrosView, {
        onNavigateCatalog: () => {},
        onNavigateContact: () => {},
      })
    );

    expect(html).toContain('Satibax Boutique');
    expect(html).toContain('Elizabeth');
    expect(html).toContain('Costa Atl\u00e1ntica');
    expect(html).toContain('Cosm\u00e9tica Natural');
  });

  it('renders clean cosmetic philosophy and core values', () => {
    const html = renderToString(React.createElement(NosotrosView));

    // Clean cosmetic philosophy pillars
    expect(html).toContain('Cruelty-Free');
    expect(html).toContain('Vegano');
    expect(html).toContain('Sin Parabenos');
    expect(html).toContain('Celiaco-Safe');

    // Values
    expect(html).toContain('Pureza Bot\u00e1nica');
    expect(html).toContain('Consumo Consciente');
  });

  it('renders call to action buttons to explore catalog and contact', () => {
    const html = renderToString(React.createElement(NosotrosView));

    expect(html).toContain('Explorar Cat\u00e1logo');
    expect(html).toContain('Escribinos por WhatsApp');
  });
});

describe('ContactoView component', () => {
  it('renders contact channels, phone number, and Costa Atlántica location', () => {
    const html = renderToString(React.createElement(ContactoView));

    expect(html).toContain('+54 9 2252 515155');
    expect(html).toContain('Costa Atl\u00e1ntica');
    expect(html).toContain('Buenos Aires');
    expect(html).toContain('contacto@satibax.com');
  });

  it('renders customer service operating hours', () => {
    const html = renderToString(React.createElement(ContactoView));

    expect(html).toContain('Lunes a S\u00e1bados');
    expect(html).toContain('9:00 a 19:00');
  });

  it('renders direct WhatsApp links with valid URL format', () => {
    const html = renderToString(React.createElement(ContactoView));

    expect(html).toContain('https://wa.me/5492252515155');
  });
});

describe('BlogView component', () => {
  it('includes authentic founder post "Hola, soy Elizabeth" in DEFAULT_POSTS', () => {
    const founderPost = DEFAULT_POSTS.find((p) => p.slug === 'hola-soy-elizabeth');
    expect(founderPost).toBeDefined();
    expect(founderPost?.title).toBe('Hola, soy Elizabeth');
    expect(founderPost?.content).toContain('Soy Elizabeth, la persona detr\u00e1s de Satibax Boutique');
    expect(founderPost?.content).toContain('Elizabeth \u{1F33F}');
  });

  it('renders blog articles listing when no post is selected', () => {
    const html = renderToString(
      React.createElement(BlogView, {
        posts: DEFAULT_POSTS,
        selectedSlug: null,
      })
    );

    expect(html).toContain('El Blog de Satibax');
    expect(html).toContain('Hola, soy Elizabeth');
    expect(html).toContain('Leer art\u00edculo');
  });

  it('renders full blog post view when selectedSlug is specified', () => {
    const html = renderToString(
      React.createElement(BlogView, {
        posts: DEFAULT_POSTS,
        selectedSlug: 'hola-soy-elizabeth',
      })
    );

    expect(html).toContain('Hola, soy Elizabeth');
    expect(html).toContain('Soy Elizabeth, la persona detr\u00e1s de Satibax Boutique');
    expect(html).toContain('Volver a art\u00edculos');
    expect(html).toContain('Elizabeth \u{1F33F}');
  });

  it('renders back button and fallback if slug does not exist', () => {
    const html = renderToString(
      React.createElement(BlogView, {
        posts: DEFAULT_POSTS,
        selectedSlug: 'post-inexistente',
      })
    );

    expect(html).toContain('Art\u00edculo no encontrado');
    expect(html).toContain('Volver a art\u00edculos');
  });

  it('renders Productos Recomendados section in article view with Ver en Catálogo and Añadir a mi selección actions', () => {
    const html = renderToString(
      React.createElement(BlogView, {
        posts: DEFAULT_POSTS,
        selectedSlug: 'hola-soy-elizabeth',
      })
    );

    expect(html).toContain('Productos Recomendados');
    expect(html).toContain('Ver en Cat\u00e1logo');
    expect(html).toContain('A\u00f1adir a mi selecci\u00f3n');
  });
});

describe('App component navigation switching', () => {
  it('renders nosotros view when initialNav is nosotros', () => {
    const html = renderToString(
      React.createElement(App, {
        initialNav: 'nosotros',
      })
    );

    expect(html).toContain('Nuestra Historia');
    expect(html).toContain('Elizabeth');
  });

  it('renders blog view when initialNav is blog', () => {
    const html = renderToString(
      React.createElement(App, {
        initialNav: 'blog',
      })
    );

    expect(html).toContain('El Blog de Satibax');
    expect(html).toContain('Hola, soy Elizabeth');
  });

  it('renders contacto view when initialNav is contacto', () => {
    const html = renderToString(
      React.createElement(App, {
        initialNav: 'contacto',
      })
    );

    expect(html).toContain('+54 9 2252 515155');
    expect(html).toContain('Costa Atl\u00e1ntica');
  });

  it('renders catalog view when initialNav is catalogo', () => {
    const html = renderToString(
      React.createElement(App, {
        initialNav: 'catalogo',
      })
    );

    expect(html).toContain('Cuidado natural para tu piel');
    expect(html).toContain('Cat\u00e1logo Completo');
  });

  it('renders newsletter subscription section within the application', () => {
    const html = renderToString(
      React.createElement(App, {
        initialNav: 'catalogo',
      })
    );

    expect(html).toContain('Suscribirme');
  });
});
