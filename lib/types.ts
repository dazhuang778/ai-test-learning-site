export type ResourceType = 'article' | 'video' | 'course' | 'tool';

export type NodeStage = '入门' | '进阶' | '高阶';

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
  description: string;
}

export interface KnowledgeNode {
  slug: string;
  title: string;
  level: 0 | 1 | 2 | 3;
  stage: NodeStage;
  difficulty: 1 | 2 | 3;
  parent: string | null;
  description: string;
  resources: Resource[];
  body?: string;
}
