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

function useAuthorMetadata() {
  const { frontMatter } = useDoc();
  const { siteConfig } = useDocusaurusContext();

  // Extract default author from themeConfig.metadata
  const defaultAuthorMeta = siteConfig.themeConfig.metadata?.find(
    (meta) => meta.name === "author"
  );
  const defaultAuthor = defaultAuthorMeta ? defaultAuthorMeta.content : null;

  // Determine the effective author: page frontmatter overrides default
  const effectiveAuthor = frontMatter.author || defaultAuthor;

  return effectiveAuthor;
}

export default function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle();
  const effectiveAuthor = useAuthorMetadata();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {effectiveAuthor && (
        <Head>
          <meta name="author" content={effectiveAuthor} />
        </Head>
      )}
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
