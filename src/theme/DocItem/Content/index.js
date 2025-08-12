import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import { useDocusaurusContext } from "@docusaurus/theme-common";
import Head from "@docusaurus/Head";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

function useSocialMetadata() {
  const { metadata, frontMatter } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const { siteUrl } = siteConfig;

  // Default values from docusaurus.config.ts
  const defaultAuthorMeta = siteConfig.themeConfig.metadata?.find(
    (meta) => meta.name === "author"
  );
  const defaultAuthor = defaultAuthorMeta ? defaultAuthorMeta.content : null;
  const defaultDescription =
    siteConfig.tagline || "A technical journey, documented.";
  const defaultImage = siteConfig.themeConfig.image
    ? `${siteUrl}/${siteConfig.themeConfig.image}`
    : null;

  // Resolve metadata with fallback logic
  const title = frontMatter.title || metadata.title;
  const description =
    frontMatter.description || metadata.description || defaultDescription;
  const author = frontMatter.author || defaultAuthor;
  const image = frontMatter.image
    ? `${siteUrl}/${frontMatter.image}`
    : defaultImage;

  return {
    title,
    description,
    author,
    image,
  };
}

export default function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle();
  const socialMetadata = useSocialMetadata();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      <Head>
        {/* Author Metadata */}
        {socialMetadata.author && (
          <meta name="author" content={socialMetadata.author} />
        )}

        {/* Open Graph Metadata */}
        <meta property="og:title" content={socialMetadata.title} />
        <meta property="og:description" content={socialMetadata.description} />
        {socialMetadata.image && (
          <meta property="og:image" content={socialMetadata.image} />
        )}
        <meta property="og:type" content="article" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={socialMetadata.title} />
        <meta name="twitter:description" content={socialMetadata.description} />
        {socialMetadata.image && (
          <meta name="twitter:image" content={socialMetadata.image} />
        )}
      </Head>

      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
