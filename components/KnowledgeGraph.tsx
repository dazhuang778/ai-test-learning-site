import { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  ReactFlow,
  Node,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from '@xyflow/react';

import KnowledgeNodeCard from './KnowledgeNodeCard';
import { KnowledgeNode } from '../lib/types';
import { buildGraphData } from '../lib/graph';

const nodeTypes = { knowledgeNode: KnowledgeNodeCard };

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[];
}

export default function KnowledgeGraph({ nodes }: KnowledgeGraphProps) {
  const router = useRouter();
  const { rfNodes, rfEdges } = buildGraphData(nodes);

  const [graphNodes, , onNodesChange] = useNodesState(rfNodes);
  const [graphEdges, , onEdgesChange] = useEdgesState(rfEdges);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      router.push(`/nodes/${node.id}`);
    },
    [router]
  );

  return (
    <div style={{ width: '100%', height: '640px' }} className="dark">
      <ReactFlow
        nodes={graphNodes}
        edges={graphEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.4}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#e2e8f0"
          className="dark:!text-slate-700"
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#475569"
          className="!hidden dark:!block dark:!text-slate-700"
        />
        <Controls
          showInteractive={false}
          className="dark:[&_button]:!bg-slate-700 dark:[&_button]:!border-slate-600 dark:[&_button]:!text-white"
        />
        <MiniMap
          nodeColor={n => {
            const node = n.data?.node as KnowledgeNode | undefined;
            const colors = ['#e9d5ff', '#bfdbfe', '#bbf7d0', '#fed7aa'];
            return colors[node?.level ?? 0] ?? '#e2e8f0';
          }}
          maskColor="rgba(248, 250, 252, 0.7)"
          className="dark:[&]:!bg-slate-800"
        />
      </ReactFlow>
    </div>
  );
}
