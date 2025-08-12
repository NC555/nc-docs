import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import {
  DISCORD_URL,
  REDDIT_URL,
  TWITTER_URL,
  BLUESKY_URL,
  LINKEDIN_URL,
  TIKTOK_URL,
  GITHUB_MAIN_REPO_URL,
  GITHUB_ISSUES_MAIN_URL,
  GITHUB_FEATURES_URL,
  VSCODE_MARKETPLACE_URL,
  OPEN_VSX_URL,
  CONTACT_EMAIL,
  CAREERS_URL,
  WEBSITE_PRIVACY_URL,
  EXTENSION_PRIVACY_URL,
  GITHUB_REPO_URL,
} from "./src/constants";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "NC Documentation",
  tagline: "Clarity through code: A technical journey, documented.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://doc.nc555.online/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config (if needed)
  organizationName: "Nati Cabti",
  projectName: "NC-DOCS",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          editUrl: `${GITHUB_REPO_URL}/edit/main/`,
          showLastUpdateTime: true,
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: false, // Disable the built-in sitemap plugin to avoid conflicts
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/",
      },
    ],
  ],

  plugins: [
    ...(process.env.POSTHOG_API_KEY
      ? [
          [
            "posthog-docusaurus",
            {
              apiKey: process.env.POSTHOG_API_KEY,
              appUrl: "https://us.i.posthog.com",
              enableInDevelopment: true,
            },
          ],
        ]
      : []),
    [
      "@docusaurus/plugin-sitemap",
      {
        changefreq: "weekly",
        priority: 0.5,
        ignorePatterns: ["/tags/**"],
        filename: "sitemap.xml",
        createSitemapItems: async (params) => {
          const { defaultCreateSitemapItems, ...rest } = params;
          const items = await defaultCreateSitemapItems(rest);
          return items.filter((item) => !item.url.includes("/page/"));
        },
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [],
      },
    ],
  ],

  themeConfig: {
    // SEO metadata
    metadata: [
      {
        name: "keywords",
        content:
          "Clarity through comprehensive documentation 📚 Navigating the technical landscape one page at a time 🧭",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "author", content: "Nati Cabti" },
    ],
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    image: "img/social-share.jpg", // Default Open Graph image
    navbar: {
      logo: {
        alt: "NC Docs Logo",
        src: "img/nc-docs-logo-light.png",
        srcDark: "img/nc-docs-logo-dark.png",
      },
      items: [
        {
          type: "search",
          position: "left",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "NC Docs Logo",
        src: "img/nc-docs-logo-light.png",
        srcDark: "img/nc-docs-logo-dark.png",
        width: 120,
        height: 24,
      },
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: DISCORD_URL || "#",
            },
            {
              label: "Reddit",
              href: REDDIT_URL || "#",
            },
            {
              label: "Twitter",
              href: TWITTER_URL || "#",
            },
            {
              label: "Bluesky",
              href: BLUESKY_URL || "#",
            },
            {
              label: "GitHub",
              href: GITHUB_MAIN_REPO_URL || "#",
            },
            {
              label: "LinkedIn",
              href: LINKEDIN_URL || "#",
            },
            {
              label: "TikTok",
              href: TIKTOK_URL || "#",
            },
          ],
        },
        {
          title: "GitHub",
          items: [
            {
              label: "Issues",
              href: GITHUB_ISSUES_MAIN_URL || "#",
            },
            {
              label: "Feature Requests",
              href: GITHUB_FEATURES_URL || "#",
            },
          ],
        },
        {
          title: "Download",
          items: [
            {
              label: "VS Code Marketplace",
              href: VSCODE_MARKETPLACE_URL || "#",
            },
            {
              label: "Open VSX Registry",
              href: OPEN_VSX_URL || "#",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "Contact",
              href: CONTACT_EMAIL || "#",
              target: "_self",
            },
            {
              label: "Careers",
              href: CAREERS_URL || "#",
            },
            {
              label: "Website Privacy Policy",
              href: WEBSITE_PRIVACY_URL || "#",
            },
            {
              label: "Extension Privacy Policy",
              href: EXTENSION_PRIVACY_URL || "#",
            },
          ],
        },
      ],
    },
    copyright: `Copyright © ${new Date().getFullYear()} Nati Cabti. Built with Docusaurus.`,
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash"],
    },
    mermaid: {
      theme: {
        light: "default",
        dark: "dark",
      },
    },
    markdown: {
      mermaid: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
