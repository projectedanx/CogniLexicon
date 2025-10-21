
/**
 * Represents a single node in the knowledge graph.
 */
export interface GraphNode {
  /** The unique identifier for the node, typically the concept's name. */
  id: string;
  /** A numerical group identifier, used for coloring or categorization. */
  group: number;
}

/**
 * Represents a link between two nodes in the knowledge graph.
 */
export interface GraphLink {
  /** The ID of the source node. */
  source: string;
  /** The ID of the target node. */
  target: string;
  /** The strength or value of the link, used for styling (e.g., thickness). */
  value: number;
}

/**
 * Represents the entire knowledge graph data structure.
 */
export interface GraphData {
  /** An array of all nodes in the graph. */
  nodes: GraphNode[];
  /** An array of all links connecting the nodes. */
  links: GraphLink[];
}

/**
 * Represents the detailed semantic profile of a concept.
 */
export interface SemanticProfileData {
  /** A concise definition of the concept. */
  definition: string;
  /** The origin or etymology of the concept. */
  etymology: string;
  /** The primary conceptual domains the concept belongs to. */
  domains: string[];
  /** A list of synonyms. */
  synonyms: string[];
  /** A list of antonyms. */
  antonyms: string[];
  /** A list of related but not synonymous concepts. */
  conceptualNeighbors: string[];
  /** A list of sentences demonstrating the concept's usage. */
  exampleSentences: string[];
}

/**
 * Defines the possible views in the application.
 * 'profile': The semantic profile view.
 * 'graph': The knowledge graph view.
 */
export type ViewType = 'profile' | 'graph';

/**
 * Represents a Mirror Token, which is a saved concept or query.
 */
export interface MirrorToken {
  /** The user-defined name for the token. */
  name: string;
  /** The actual concept or query string associated with the token. */
  concept: string;
}
