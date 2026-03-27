export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export const primaryNavigation: NavItem[] = [
  { href: "/", label: "Start" },
  { href: "/loesungen", label: "Lösungen" },
  { href: "/produkte", label: "Produkte" },
  { href: "/demo", label: "Demo" },
  { href: "/sicherheit", label: "Sicherheit" },
  { href: "/branchen", label: "Branchen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export const footerNavigation = {
  leistungen: [
    { href: "/loesungen", label: "Lösungen" },
    { href: "/produkte", label: "Produkte" },
    { href: "/demo", label: "Demos" },
    { href: "/sicherheit", label: "Sicherheit" },
  ],
  unternehmen: [
    { href: "/ueber-uns", label: "Über Nagel Consulting" },
    { href: "/branchen", label: "Branchen" },
    { href: "/wissen", label: "Wissen" },
  ],
  rechtliches: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ],
};
