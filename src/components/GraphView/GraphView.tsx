import React from "react";
import { GraphCanvas } from "reagraph";
import { useGraphData } from "./utils/useGraphData";
import styles from "./styles.module.css";

const GraphView = () => {
  const { nodes, edges } = useGraphData();

  return (
    <div className={styles.container}>
      <div className={styles.graphWrapper}>
        {nodes.length > 0 && edges.length > 0 ? (
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            onNodeClick={(node) => {
              // Handle node click, e.g., navigate to the document
              if (node && node.data && node.data.path) {
                window.location.href = node.data.path;
              } else {
                console.warn(
                  "Node or node data is missing for click event:",
                  node
                );
              }
            }}
            // Add other reagraph props as needed for customization
          />
        ) : (
          <p>Loading graph data...</p>
        )}
      </div>
    </div>
  );
};

export default GraphView;
