import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { site } from "../config/site";
import { organizationJsonLd, localBusinessJsonLd, websiteJsonLd, webPageJsonLd } from "../config/jsonld";

// Per-page document head: title, description, canonical, Open Graph, Twitter
// card and JSON-LD. The organization, local business and website records are
// written on every page; the page record is added from the props.

export default function Seo({ title, fullTitle, description = site.description, image = site.ogImage, path, noindex = false, type = "website", jsonLd = [] }) {
  const location = useLocation();
  const pathname = path || location.pathname;
  const canonical = `${site.url}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;
  const documentTitle = fullTitle || (title ? `${title} | ${site.name}` : site.name);
  const ogTitle = fullTitle || title || site.name;
  const imageUrl = image.startsWith("http") ? image : `${site.url}${image}`;
  const records = [
    organizationJsonLd(),
    localBusinessJsonLd(),
    websiteJsonLd(),
    webPageJsonLd({ title: ogTitle, description, path: pathname }),
    ...jsonLd,
  ];

  return (
    <Helmet prioritizeSeoTags>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={site.keywords} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json">{JSON.stringify(records)}</script>
    </Helmet>
  );
}

Seo.propTypes = {
  // Page title; the site name is appended
  title: PropTypes.string,
  // Full document title used as is (for the home page's existing title)
  fullTitle: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  path: PropTypes.string,
  noindex: PropTypes.bool,
  type: PropTypes.string,
  jsonLd: PropTypes.arrayOf(PropTypes.object),
};
