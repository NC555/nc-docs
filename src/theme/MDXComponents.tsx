import MDXComponents from "@theme-original/MDXComponents";
import Codicon from "@site/src/components/Codicon";
import Mermaid from "@site/src/components/Mermaid";

export default {
  ...MDXComponents,
  Codicon,
  code: (props) => {
    if (props.className === "language-mermaid") {
      return <Mermaid chart={props.children.trim()} />;
    }
    return <MDXComponents.code {...props} />;
  },
};
