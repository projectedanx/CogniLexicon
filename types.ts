
export interface GraphNode {
  id: string;
  group: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface SemanticProfileData {
  definition: string;
  etymology: string;
  domains: string[];
  synonyms: string[];
  antonyms: string[];
  conceptualNeighbors: string[];
  exampleSentences: string[];
}

export type ViewType = 'profile' | 'graph';

export interface MirrorToken {
  name: string;
  concept: string;
}
