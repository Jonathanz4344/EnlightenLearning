// Contact details and identity for the whole site. Every place that shows a
// number, an email, hours or an address reads from here: header pill, footer,
// contact page, CTA band and the JSON-LD in the document head.
//
// The owner has not yet supplied phone numbers, hours or a street address.
// Those fields stay null and the UI hides them until they are filled in.
// Calls and texts may be different numbers, so they are separate fields.

export const site = {
  name: "Enlighten Learning",
  legalName: "Enlighten Learning Tutoring Center",
  url: "https://enlightenlearning.vercel.app",
  description:
    "Long Island tutoring run by high school students. Enlighten Learning offers K-12 tutoring and NYS & Regents prep, and donates its proceeds to charity.",
  keywords: "nonprofit, tutoring, education, volunteer, community support, fundraising",
  logo: "/images/logo/Logo.png",
  ogImage: "/og/default.png",
  areaServed: "Long Island, New York",

  email: "enlightenandlearning@gmail.com",
  financeEmail: "Enlightenlearningfinance@gmail.com",

  // Example: "+1 516 555 0100". Shown as a call link where it fits.
  phoneCall: null,
  // Example: "+1 516 555 0101". Shown as a text (SMS) link, marked as texts only.
  phoneText: null,
  // Example: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "16:00", closes: "20:00" }]
  hours: null,
  // Example: { street: "1 Main Street", city: "Manhasset", region: "NY", postalCode: "11030", country: "US", mapUrl: "https://maps.google.com/?q=..." }
  address: null,

  social: {
    instagram: {
      label: "Instagram",
      handle: "@enlighten_learning",
      url: "https://www.instagram.com/enlighten_learning/",
    },
    facebook: {
      label: "Facebook",
      handle: "@Enlighten Learning",
      url: "https://www.facebook.com/share/16yVvBdfyz/?mibextid=wwXIfr/",
    },
  },
};

export const hasPhone = () => Boolean(site.phoneCall || site.phoneText);
export const hasHours = () => Array.isArray(site.hours) && site.hours.length > 0;
export const hasAddress = () => Boolean(site.address && site.address.street);

// Digits only, with a leading plus, for tel: and sms: links
export const phoneHref = (scheme, number) => `${scheme}:${String(number).replace(/[^\d+]/g, "")}`;
