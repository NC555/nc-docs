import { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useAllDocsData } from "@docusaurus/plugin-content-docs/client";
import useGlobalData from "@docusaurus/useGlobalData";
import type { Node, Edge } from "reagraph";

interface DocNode {
  id: string;
  label: string;
  path: string;
  tags: string[];
}

interface TagEdge {
  id: string;
  source: string;
  target: string;
  tag: string;
  label: string;
}

interface GraphData {
  nodes: DocNode[];
  edges: TagEdge[];
}

export const useGraphData = (): GraphData => {
  const { siteConfig } = useDocusaurusContext();
  const allDocsData = useAllDocsData();
  const globalData = useGlobalData();

  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    if (!allDocsData) {
      // If allDocsData is not available yet, return early.
      // The GraphView component already handles the loading state when nodes and edges are empty.
      return;
    }

    const nodes: DocNode[] = [];
    const edges: TagEdge[] = [];
    const tagMap = new Map<string, Set<string>>(); // Map tag to set of doc IDs

    // Process all documents to create nodes and populate tagMap
    Object.values(allDocsData).forEach((pluginData: any) => {
      if (!pluginData || !pluginData.docs) {
        // Skip if pluginData or pluginData.docs is undefined or null
        return;
      }
      Object.values(pluginData.docs).forEach((doc: any) => {
        const docId = doc.id;
        const docPath = doc.permalink;
        const docTitle = doc.title;
        const docTags = doc.tags ? doc.tags.map((tag: any) => tag.label) : [];

        nodes.push({
          id: docId,
          label: docTitle,
          path: docPath,
          tags: docTags,
        });

        docTags.forEach((tag: string) => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, new Set());
          }
          tagMap.get(tag)?.add(docId);
        });
      });
    });

    // Create edges based on shared tags
    tagMap.forEach((docIds, tag) => {
      const docIdArray = Array.from(docIds);
      if (docIdArray.length > 1) {
        for (let i = 0; i < docIdArray.length; i++) {
          for (let j = i + 1; j < docIdArray.length; j++) {
            const source = docIdArray[i];
            const target = docIdArray[j];
            // Ensure unique edges for each pair and tag
            const edgeId = `${source}-${target}-${tag}`;
            if (!edges.some((e) => e.id === edgeId)) {
              edges.push({
                id: edgeId,
                source: source,
                target: target,
                label: tag,
                tag: tag,
              });
            }
          }
        }
      }
    });

    setGraphData({ nodes, edges });
  }, [allDocsData, siteConfig, globalData]); // Dependencies for useEffect

  return graphData;
};
