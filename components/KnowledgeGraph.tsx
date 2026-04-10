import { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  ReactFlow,
  Node,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
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
    <div className="flex items-center justify-center" style={{ height: '600px' }}>
      <div className="w-full max-w-5xl dark">
        <ReactFlow
          nodes={graphNodes}
          edges={graphEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={1}
          maxZoom={1}
          zoomOnScroll={false}
          panOnDrag={false}
          panOnScroll={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#e2e8f0"
            className="dark:!text-slate-700"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
