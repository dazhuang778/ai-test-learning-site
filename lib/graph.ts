import { Node, Edge } from '@xyflow/react';
import { KnowledgeNode } from './types';

const NODE_WIDTH = 176; // Tailwind w-44 = 11rem = 176px
const H_GAP = 64;
const V_GAP = 170;

export function buildGraphData(nodes: KnowledgeNode[]): { rfNodes: Node[]; rfEdges: Edge[] } {
  const levelGroups: Record<number, KnowledgeNode[]> = {};
  nodes.forEach(n => {
    if (!levelGroups[n.level]) levelGroups[n.level] = [];
    levelGroups[n.level].push(n);
  });

  const rfNodes: Node[] = [];
  const rfEdges: Edge[] = [];

  const levels = Object.keys(levelGroups).map(Number).sort();

  levels.forEach(level => {
    const levelNodes = levelGroups[level];
    const count = levelNodes.length;
    const totalWidth = count * NODE_WIDTH + (count - 1) * H_GAP;
    const startX = -totalWidth / 2;

    levelNodes.forEach((node, index) => {
      const x = startX + index * (NODE_WIDTH + H_GAP);
      const y = level * V_GAP;

      rfNodes.push({
        id: node.slug,
        type: 'knowledgeNode',
        position: { x, y },
        data: { node },
      });

      if (node.parent) {
        rfEdges.push({
          id: `e-${node.parent}-${node.slug}`,
          source: node.parent,
          target: node.slug,
          type: 'smoothstep',
          style: { stroke: '#94a3b8', strokeWidth: 2 },
        });
      }
    });
  });

  return { rfNodes, rfEdges };
}
