import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { KnowledgeNode, Resource, ResourceType, NodeStage } from './types';

const NODES_DIR = path.join(process.cwd(), 'content', 'nodes');

const REQUIRED_FIELDS = ['slug', 'title', 'level', 'stage', 'difficulty', 'description', 'resources'];
const VALID_RESOURCE_TYPES: ResourceType[] = ['article', 'video', 'course', 'tool'];
const VALID_STAGES: NodeStage[] = ['入门', '进阶', '高阶'];

function validateNode(data: Record<string, unknown>, filename: string, body?: string): KnowledgeNode | null {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      console.warn(`[content] ${filename}: Missing required field "${field}"`);
      return null;
    }
  }

  const level = Number(data.level);
  if (![0, 1, 2, 3].includes(level)) {
    console.warn(`[content] ${filename}: Invalid level "${data.level}", must be 0-3`);
    return null;
  }

  if (!VALID_STAGES.includes(data.stage as NodeStage)) {
    console.warn(`[content] ${filename}: Invalid stage "${data.stage}", must be one of: ${VALID_STAGES.join(', ')}`);
    return null;
  }

  const difficulty = Number(data.difficulty);
  if (![1, 2, 3].includes(difficulty)) {
    console.warn(`[content] ${filename}: Invalid difficulty "${data.difficulty}", must be 1-3`);
    return null;
  }

  const rawResources = (data.resources as Record<string, unknown>[]) || [];
  const resources: Resource[] = rawResources
    .map((r, i) => {
      if (!VALID_RESOURCE_TYPES.includes(r.type as ResourceType)) {
        console.warn(`[content] ${filename}: Resource[${i}] has invalid type "${r.type}"`);
      }
      return {
        title: String(r.title || ''),
        url: String(r.url || ''),
        type: (VALID_RESOURCE_TYPES.includes(r.type as ResourceType) ? r.type : 'article') as ResourceType,
        description: String(r.description || ''),
      };
    })
    .filter(r => r.title && r.url);

  return {
    slug: String(data.slug),
    title: String(data.title),
    level: level as 0 | 1 | 2 | 3,
    stage: data.stage as NodeStage,
    difficulty: difficulty as 1 | 2 | 3,
    parent: data.parent ? String(data.parent) : null,
    description: String(data.description),
    resources,
    body: body?.trim() || undefined,
  };
}

export function getAllNodes(): KnowledgeNode[] {
  if (!fs.existsSync(NODES_DIR)) {
    console.warn(`[content] Nodes directory not found: ${NODES_DIR}`);
    return [];
  }

  const files = fs.readdirSync(NODES_DIR).filter(f => f.endsWith('.md'));
  const nodes: KnowledgeNode[] = [];

  for (const file of files) {
    const filePath = path.join(NODES_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const node = validateNode(data as Record<string, unknown>, file, content);
    if (node) nodes.push(node);
  }

  return nodes.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    return a.slug.localeCompare(b.slug);
  });
}

export function getNodeBySlug(slug: string): KnowledgeNode | null {
  return getAllNodes().find(n => n.slug === slug) ?? null;
}
