import type { SEOData } from '@/hooks/useSEO';
import type { BlogPost } from '@shared/schema';

export const seoPages = {
  home: (): SEOData => ({
    title: 'Ordine dei Copywriter Estinti - Email Marketing Chirurgico',
    description: 'L\'agenzia di email marketing che trasforma le tue liste di contatti in una macchina da guerra commerciale. Specialisti in chirurgia email marketing per risultati concreti.',
    keywords: 'email marketing, newsletter, copywriting, marketing automation, digital marketing, agenzia email marketing',
    canonicalUrl: 'https://ordinecopywriter.com/',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Ordine dei Copywriter Estinti",
      "description": "Agenzia specializzata in email marketing chirurgico e copywriting persuasivo",
      "url": "https://ordinecopywriter.com/",
      "logo": "https://ordinecopywriter.com/logo.png",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Italian"
      },
      "areaServed": "IT",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servizi Email Marketing",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Email Marketing Automation",
              "description": "Servizi di automazione email marketing per massimizzare le conversioni"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Copywriting Persuasivo",
              "description": "Scrittura di testi persuasivi per campagne email ad alta conversione"
            }
          }
        ]
      }
    }
  }),

  servizi: (): SEOData => ({
    title: 'Servizi Email Marketing | Ordine dei Copywriter Estinti',
    description: 'Scopri i nostri servizi di email marketing chirurgico: automazione, copywriting persuasivo, segmentazione avanzata e analisi delle performance per risultati concreti.',
    keywords: 'servizi email marketing, automazione email, copywriting, segmentazione, analisi performance',
    canonicalUrl: 'https://ordinecopywriter.com/servizi',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Servizi Email Marketing Chirurgico",
      "description": "Servizi completi di email marketing per trasformare le liste contatti in macchine da guerra commerciali",
      "provider": {
        "@type": "Organization",
        "name": "Ordine dei Copywriter Estinti"
      },
      "areaServed": "IT",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catalogo Servizi Email Marketing"
      }
    }
  }),

  diagnosi: (): SEOData => ({
    title: 'Diagnosi Chirurgica Email Marketing Gratuita | Ordine Copywriter Estinti',
    description: 'Richiedi una diagnosi gratuita del tuo email marketing. I nostri esperti analizzeranno le tue campagne e ti forniranno strategie concrete per migliorare le performance.',
    keywords: 'diagnosi email marketing, analisi campagne email, consulenza email marketing gratuita, audit email marketing',
    canonicalUrl: 'https://ordinecopywriter.com/diagnosi-chirurgica',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Diagnosi Chirurgica Email Marketing",
      "description": "Analisi gratuita delle performance email marketing con strategie di miglioramento",
      "provider": {
        "@type": "Organization",
        "name": "Ordine dei Copywriter Estinti"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Diagnosi gratuita email marketing"
      }
    }
  }),

  contatti: (): SEOData => ({
    title: 'Contatti | Ordine dei Copywriter Estinti',
    description: 'Contatta i nostri esperti in email marketing chirurgico. Richiedi una consulenza personalizzata per trasformare le tue campagne email in strumenti di vendita efficaci.',
    keywords: 'contatti email marketing, consulenza email marketing, agenzia email marketing contatti',
    canonicalUrl: 'https://ordinecopywriter.com/contatti',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contatti Ordine dei Copywriter Estinti",
      "description": "Pagina contatti per richiedere consulenze email marketing",
      "mainEntity": {
        "@type": "Organization",
        "name": "Ordine dei Copywriter Estinti"
      }
    }
  }),

  blog: (): SEOData => ({
    title: 'Blog Email Marketing | Guide e Strategie | Ordine Copywriter Estinti',
    description: 'Blog specializzato in email marketing: guide pratiche, strategie di copywriting, case study e consigli per migliorare le performance delle tue campagne email.',
    keywords: 'blog email marketing, guide email marketing, strategie copywriting, case study email marketing',
    canonicalUrl: 'https://ordinecopywriter.com/blog',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Blog Email Marketing Chirurgico",
      "description": "Blog con guide e strategie per email marketing ad alta performance",
      "url": "https://ordinecopywriter.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Ordine dei Copywriter Estinti"
      }
    }
  }),

  blogPost: (post: BlogPost): SEOData => ({
    title: post.metaTitle || `${post.title} | Ordine dei Copywriter Estinti`,
    description: post.metaDescription || post.excerpt || `Scopri ${post.title} - Guida completa di email marketing dal blog degli specialisti in copywriting chirurgico.`,
    keywords: `${post.tags?.join(', ')}, email marketing, copywriting`,
    canonicalUrl: `https://ordinecopywriter.com/blog/${post.slug}`,
    ogType: 'article',
    ogImage: post.featuredImage || 'https://ordinecopywriter.com/og-image.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": post.featuredImage,
      "author": {
        "@type": "Organization",
        "name": "Ordine dei Copywriter Estinti"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ordine dei Copywriter Estinti",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ordinecopywriter.com/logo.png"
        }
      },
      "datePublished": post.createdAt,
      "dateModified": post.updatedAt || post.createdAt,
      "articleSection": "Email Marketing",
      "keywords": post.tags?.join(', '),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ordinecopywriter.com/blog/${post.slug}`
      }
    }
  }),

  privacy: (): SEOData => ({
    title: 'Privacy Policy | Ordine dei Copywriter Estinti',
    description: 'Privacy Policy di Ordine dei Copywriter Estinti. Informazioni su raccolta, trattamento e protezione dei dati personali secondo GDPR.',
    keywords: 'privacy policy, protezione dati, GDPR, trattamento dati personali',
    canonicalUrl: 'https://ordinecopywriter.com/privacy-policy',
    ogType: 'website'
  }),

  cookies: (): SEOData => ({
    title: 'Cookie Policy | Ordine dei Copywriter Estinti', 
    description: 'Cookie Policy di Ordine dei Copywriter Estinti. Informazioni sui cookie utilizzati, finalità e gestione delle preferenze.',
    keywords: 'cookie policy, gestione cookie, privacy web, tracciamento',
    canonicalUrl: 'https://ordinecopywriter.com/cookie-policy',
    ogType: 'website'
  })
};