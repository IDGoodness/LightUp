# Search Engine Submission & SEO Guide for LightUp

This guide explains how to get **LightUp International Christian Network** indexed and ranking on **Google**, **Bing**, **Yahoo**, and **DuckDuckGo**.

---

## 1. What Has Already Been Configured in Your Code

Your application now includes full modern technical SEO:
1. **Robots.txt (`public/robots.txt`)**: Instructs search engine spiders (Googlebot, Bingbot, etc.) to crawl all public pages and safely ignores `/admin`.
2. **XML Sitemap (`public/sitemap.xml`)**: Lists all official pages (`/`, `/about`, `/events`, `/sermons`, `/gallery`, `/partner`, `/contact`) with crawl priorities and frequencies.
3. **Structured Data (Schema.org JSON-LD)**: Configured in `index.html` and dynamic route components for:
   - `Church` & `Organization`
   - `WebSite`
   - `ItemList` of `Event` schemas on `/events`
   - `AboutPage` schema on `/about`
   - `ContactPage` schema on `/contact`
4. **Social Share Preview Cards**: OpenGraph and Twitter Cards configured with `public/og-image.png` and `public/logo.png`.
5. **Dynamic Head Management (`src/components/SEO.tsx`)**: Every page automatically updates its `<title>`, `<meta name="description">`, OpenGraph data, and canonical URL as visitors navigate.
6. **Admin Protection**: `/admin` is tagged with `noindex, nofollow` to prevent private administrative panels from appearing in search results.

---

## 2. Submit Your Site to Google (Google Search Console)

Google is the primary search engine for over 90% of web searches. Follow these steps to register:

### Step 1: Open Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your Google account (e.g. `lightupintl111@gmail.com`).

### Step 2: Add Your Property
You will see two options:
- **Domain** (Recommended if you own the custom domain DNS e.g. on Namecheap, GoDaddy, Cloudflare):
  - Type: `lightupinternational.org`
  - Google will give you a TXT DNS record to add to your domain DNS provider.
- **URL Prefix** (Alternative / Easiest if hosted on Vercel or Netlify):
  - Type your full URL, e.g.: `https://lightupinternational.org` or `https://your-app.vercel.app`
  - Choose **HTML tag** verification.
  - Copy the code inside `content="..."` and paste it into line 26 of your [index.html](file:///c:/Users/OWNER/Documents/LightUp/index.html):
    ```html
    <meta name="google-site-verification" content="PASTE_YOUR_CODE_HERE" />
    ```
  - Deploy/save, then click **Verify** in Google Search Console.

### Step 3: Submit Your XML Sitemap
1. Once verified, click **Sitemaps** in the left sidebar.
2. In the "Add a new sitemap" input, enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. Status will change to **Success** within a few minutes/hours.

### Step 4: Request Immediate Indexing (Instant Crawl)
1. In the top search bar ("Inspect any URL in..."), paste your homepage URL:
   `https://lightupinternational.org/`
2. Press Enter.
3. Click the **Request Indexing** button.
4. Repeat this for key pages: `/events`, `/about`, and `/sermons`. Google will queue your site for immediate indexing!

---

## 3. Submit Your Site to Bing & Yahoo (Bing Webmaster Tools)

Bing powers search for Microsoft Bing, Yahoo, and DuckDuckGo.

### Step 1: Sign in to Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Sign in with Microsoft, Google, or GitHub.

### Step 2: 1-Click Import from Google
- Bing offers an instant **"Import from Google Search Console"** button.
- Click **Import** — it will automatically import your verified site and your submitted sitemap without needing any extra verification!
- Alternatively, if verifying manually, copy the Bing meta tag into [index.html](file:///c:/Users/OWNER/Documents/LightUp/index.html):
  ```html
  <meta name="msvalidate.01" content="PASTE_BING_CODE_HERE" />
  ```

---

## 4. DuckDuckGo, Ecosia, and Other Search Engines

- **DuckDuckGo**: Automatically indexes sites through Bing and Apple. Once your site is active in Bing Webmaster Tools, it will show up on DuckDuckGo.
- **Yandex & Baidu**: Supported via standard `robots.txt` and `sitemap.xml` (already in your `public/` directory).

---

## 5. Test & Validate Your Rich Snippets

You can verify how search engines and social platforms view your site using these free tools:

1. **Google Rich Results Test**:
   - URL: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   - Tests your Church, Organization, and Event Schema JSON-LD.
2. **Facebook Sharing Debugger / WhatsApp Preview**:
   - URL: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
   - Tests `og:image`, `og:title`, and previews how links look when shared on WhatsApp and Facebook.
3. **Twitter Card Validator**:
   - Tests your large summary card for X/Twitter.

---

## 6. Changing or Updating Your Live Domain

If your final domain differs from `https://lightupinternational.org`:
1. Open [public/robots.txt](file:///c:/Users/OWNER/Documents/LightUp/public/robots.txt) and update the `Host` and `Sitemap` lines.
2. Open [public/sitemap.xml](file:///c:/Users/OWNER/Documents/LightUp/public/sitemap.xml) and replace `https://lightupinternational.org` with your actual domain.
3. Open [src/components/SEO.tsx](file:///c:/Users/OWNER/Documents/LightUp/src/components/SEO.tsx) and update `BASE_URL`.
4. Run `npm run build` and deploy to your hosting provider (e.g. Vercel).
