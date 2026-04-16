
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

/**
 * Platform targets for video publication.
 */
export type PlatformTarget = 'TikTok' | 'Instagram_Reels' | 'YouTube_Shorts' | 'Cross_Platform';

/**
 * Genre classifications for the Creator Profile.
 */
export type GenreClassification = 'Education' | 'Comedy' | 'Lifestyle' | 'Tutorial' | 'Commentary' | 'Product' | 'Other';

/**
 * NLE (Non-Linear Editor) types.
 */
export type NLEType = 'DaVinci' | 'Premiere' | 'FinalCut' | 'CapCut' | 'Other';

/**
 * Error classifications for Scar entries.
 */
export type ScarErrorClassification =
  | 'Hook_Latency'
  | 'Dead_Air'
  | 'Safe_Zone_Violation'
  | 'Audio_Clip'
  | 'Poor_CPM'
  | 'Caption_Overflow'
  | 'L_Cut_Absence'
  | 'Lethargic_B_Roll'
  | 'LUFS_Non_Compliance'
  | 'Repeated_DFM';

/**
 * Status of a Scar entry.
 */
export type ScarStatus = 'active' | 'resolved' | 'archived';

/**
 * Escalation level of a Scar entry.
 */
export type ScarEscalationLevel = '1_prescriptive' | '2_scar_linked' | '3_dominant_failure_mode';

/**
 * Represents the profile of a creator tracked by The Retention Architect.
 */
export interface CreatorProfile {
  creator_id: string;
  display_name: string;
  nle_primary: NLEType;
  nle_secondary: string | null;
  platform_targets: PlatformTarget[];
  genre_classification: GenreClassification;
  session_count: number;
  dominant_failure_mode: string | null;
  pacing_baseline_cpm: number | null;
  target_cpm: number;
}

/**
 * Represents an individual error or learning moment tracked in the Scar Ledger.
 */
export interface ScarEntry {
  scar_id: string;
  session_timestamp: string; // ISO8601
  error_classification: ScarErrorClassification;
  error_detail: string;
  correction_prescribed: string;
  correction_applied: boolean;
  recurrence_count: number;
  status: ScarStatus;
  escalation_level: ScarEscalationLevel;
}

/**
 * Tracks the history and metrics of a specific review session.
 */
export interface SessionHistory {
  session_id: string;
  session_timestamp: string; // ISO8601
  video_duration_seconds: number;
  hook_first_cut_timestamp: string;
  reported_3s_retention_pct: number | null;
  reported_avd_pct: number | null;
  scars_flagged_this_session: string[]; // array of scar_ids
  scars_resolved_this_session: string[]; // array of scar_ids
  net_improvement_delta: number | null;
}

/**
 * The complete stateful memory structure for The Retention Architect.
 */
export interface ScarLedgerSchema {
  Creator_Profile: CreatorProfile;
  Scar_Ledger: ScarEntry[];
  Session_History: SessionHistory[];
}
