import React, { useRef } from "react";
import { GraphCanvas, GraphCanvasRef, useSelection } from "reagraph";
import { useGraphData } from "./utils/useGraphData";
import styles from "./styles.module.css";
import { theme as darkTheme } from "./theme";

const GraphView = () => {
  const graphRef = useRef<GraphCanvasRef | null>(null);
  const { nodes, edges } = useGraphData();
  const { selections, onNodeClick, onCanvasClick } = useSelection({
    ref: graphRef,
    nodes,
    edges,
    type: "multi",
  });

  return (
    <div className={styles.container}>
      <div className={styles.graphWrapper}>
        {nodes.length > 0 && edges.length > 0 ? (
          <GraphCanvas
            ref={graphRef}
            theme={darkTheme}
            nodes={nodes}
            edges={edges}
            selections={selections}
            onNodeClick={onNodeClick}
            onCanvasClick={onCanvasClick}
          />
        ) : (
          <p>Loading graph data...</p>
        )}
      </div>
    </div>
  );
};
export default GraphView;
