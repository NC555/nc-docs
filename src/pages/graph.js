import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import GraphView from "../components/GraphView/GraphView";

function GraphPage() {
  return (
    <Layout title="Graph View" description="Visualize document relationships">
      <main>
        <BrowserOnly fallback={<div>Loading graph...</div>}>
          {() => <GraphView />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
export default GraphPage;
