import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const DEFAULT_TITLE = 'LightUp International Christian Network | Igniting Hearts, Transforming Lives';
const TITLE_SUFFIX = ' | LightUp International';
const DEFAULT_DESCRIPTION =
  'LightUp International Christian Network is a Christ-centered ministry dedicated to awakening hearts, breaking spiritual darkness, and raising kingdom ambassadors through prayer, biblical teaching, ARISE campus missions, and transformative conferences.';
const DEFAULT_KEYWORDS =
  'LightUp Christian Network, LightUp International, Christian Ministry, ARISE campus movement, Christian sermons, prayer meetings, worship conferences, kingdom ambassadors, Christian fellowship, Bible teachings, Mixlr prayer';
const BASE_URL = 'https://lightupinternational.org';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

function setMetaTag(attribute: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Page Title
    const fullTitle = title ? `${title}${TITLE_SUFFIX}` : DEFAULT_TITLE;
    document.title = fullTitle;

    // 2. Meta Description & Keywords
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Robots directive
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
      setMetaTag('name', 'googlebot', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. Canonical URL
    const cleanPath = canonicalPath !== undefined ? canonicalPath : location.pathname;
    const fullCanonicalUrl = `${BASE_URL}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 6. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 7. Dynamic JSON-LD Structured Data
    const scriptId = 'dynamic-page-jsonld';
    let existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!existingScript) {
        existingScript = document.createElement('script');
        existingScript.id = scriptId;
        existingScript.type = 'application/ld+json';
        document.head.appendChild(existingScript);
      }
      existingScript.text = JSON.stringify(jsonLd);
    } else if (existingScript) {
      existingScript.remove();
    }

    return () => {
      // Cleanup custom JSON-LD when unmounting
      const activeScript = document.getElementById(scriptId);
      if (activeScript) {
        activeScript.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogImage, ogType, noindex, jsonLd, location.pathname]);

  return null;
}
