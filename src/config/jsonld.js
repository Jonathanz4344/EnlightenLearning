import { site, hasPhone, hasHours, hasAddress } from "./site";

// Structured data for the document head. Phones, hours and the address are
// only written when they are configured in site.js.

const DAY_NAMES = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function openingHours() {
  if (!hasHours()) return undefined;
  return site.hours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days.map((d) => DAY_NAMES[String(d).toLowerCase()] || d),
    opens: slot.opens,
    closes: slot.closes,
  }));
}

function postalAddress() {
  if (!hasAddress()) return undefined;
  const a = site.address;
  return {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.city,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country || "US",
  };
}

function contactPoints() {
  const points = [
    { "@type": "ContactPoint", contactType: "customer support", email: site.email, availableLanguage: "English" },
  ];
  if (site.phoneCall) points.push({ "@type": "ContactPoint", contactType: "customer support", telephone: site.phoneCall, availableLanguage: "English" });
  if (site.phoneText) points.push({ "@type": "ContactPoint", contactType: "customer support", telephone: site.phoneText, description: "Text messages only", availableLanguage: "English" });
  return points;
}

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).map((s) => s.url);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "NGO"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.ogImage}`,
    description: site.description,
    email: site.email,
    areaServed: site.areaServed,
    sameAs,
    contactPoint: contactPoints(),
    ...(site.phoneCall && { telephone: site.phoneCall }),
    ...(hasAddress() && { address: postalAddress() }),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.legalName,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    logo: `${site.url}${site.logo}`,
    description: site.description,
    email: site.email,
    areaServed: site.areaServed,
    parentOrganization: { "@id": `${site.url}/#organization` },
    ...(site.phoneCall && { telephone: site.phoneCall }),
    ...(hasPhone() && { contactPoint: contactPoints() }),
    ...(hasAddress() && { address: postalAddress() }),
    ...(hasHours() && { openingHoursSpecification: openingHours() }),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function webPageJsonLd({ title, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${site.url}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
  };
}
