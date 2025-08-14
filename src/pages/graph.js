import React from "react";
import Layout from "@theme/Layout";
import GraphView from "../components/GraphView/GraphView";

function GraphPage() {
  return (
    <Layout title="Graph View" description="Visualize document relationships">
      <main>
        <GraphView />
      </main>
    </Layout>
  );
}

export default GraphPage;
