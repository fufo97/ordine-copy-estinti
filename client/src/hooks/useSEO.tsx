import { useEffect } from 'react';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

const DEFAULT_SEO: Omit<Required<SEOData>, 'structuredData'> & { structuredData?: object } = {
  title: 'Ordine dei Copywriter Estinti - Email Marketing Chirurgico',
  description: 'L\'agenzia di email marketing che trasforma le tue liste di contatti in una macchina da guerra commerciale. Specialisti in chirurgia email marketing per risultati concreti.',
  keywords: 'email marketing, newsletter, copywriting, marketing automation, digital marketing, agenzia email marketing',
  canonicalUrl: 'https://ordinecopywriter.com/',
  ogTitle: 'Ordine dei Copywriter Estinti - Email Marketing Chirurgico',
  ogDescription: 'L\'agenzia di email marketing che trasforma le tue liste di contatti in una macchina da guerra commerciale.',
  ogImage: 'https://ordinecopywriter.com/og-image.jpg',
  ogType: 'website',
  twitterTitle: 'Ordine dei Copywriter Estinti - Email Marketing Chirurgico',
  twitterDescription: 'L\'agenzia di email marketing che trasforma le tue liste di contatti in una macchina da guerra commerciale.',
  twitterImage: 'https://ordinecopywriter.com/og-image.jpg'
};

export function useSEO(seoData: SEOData = {}) {
  useEffect(() => {
    const finalSEO = { ...DEFAULT_SEO, ...seoData };
    
    // Update title
    document.title = finalSEO.title;
    
    // Update or create meta tags
    updateMetaTag('description', finalSEO.description);
    updateMetaTag('keywords', finalSEO.keywords);
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // Open Graph tags
    updateMetaProperty('og:title', finalSEO.ogTitle);
    updateMetaProperty('og:description', finalSEO.ogDescription);
    updateMetaProperty('og:type', finalSEO.ogType);
    updateMetaProperty('og:image', finalSEO.ogImage);
    updateMetaProperty('og:site_name', 'Ordine dei Copywriter Estinti');
    updateMetaProperty('og:locale', 'it_IT');
    
    // Twitter Card tags
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', finalSEO.twitterTitle);
    updateMetaName('twitter:description', finalSEO.twitterDescription);
    updateMetaName('twitter:image', finalSEO.twitterImage);
    
    // Canonical URL
    updateCanonicalLink(finalSEO.canonicalUrl);
    
    // Structured Data (JSON-LD)
    if (finalSEO.structuredData) {
      updateStructuredData(finalSEO.structuredData);
    }
    
  }, [seoData]);
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaName(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function updateStructuredData(data: object) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}