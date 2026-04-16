Root: React/Vite
├── Auth: None — Not implemented
├── DB: LocalStorage — useMirrorTokens hook
├── API: Gemini API — REST via @google/genai
├── UI: Tailwind CSS — standard utility tokens
├── Infra: AI Studio — Static build
└── Sovereign Agents: Decoupled Blueprints (e.g., KUT-2.0.1-SOVEREIGN)

DATA FLOWS:
User → [UI] → [API] → [UI] → [DB]
User → [Agent Blueprint] → [LLM Context] → [Structured Output] → [Scar Ledger Schema]

MEREOLOGICAL MAP:
[Component] ∈ [Service] ∈ [Module] ∈ [Root]
[Sovereign Blueprint] ∈ [Agent Layer] ∈ [Root]

## SOVEREIGN AGENT ARCHITECTURE
The repository now serves as a host environment for "Sovereign Agents"—highly specialized, persona-driven LLM configurations.
These agents are stored as decoupled Markdown artifacts in the `blueprints/` directory rather than hardcoded logic.
Their memory state (e.g., The Scar Ledger) is strictly typed in `types.ts` to allow for future database implementation.

## FUTURE STATE ARCHITECTURE (V2.0)
The current architecture will evolve to support the "Pluriversal Knowledge Capsule" framework through 5 key epics:

1.  **Cross-Lingual Semantic Resonance:** Extend `services/geminiService.ts` to query multi-lingual embedding dimensions. Update `GraphData` schema to support language tags.
2.  **Temporal Concept Evolution:** Introduce a timeline state in `App.tsx` and extend the API layer to request chronological segmentation.
3.  **Multi-User Dialectical Graphing:** Replace LocalStorage DB with a real-time sync engine (e.g., Supabase/CRDTs) to support shared workspaces and "Tension Nodes".
4.  **Automated Ontology Export:** Add serialization modules (`services/exportService.ts`) to transform the internal DAG into OWL, RDF, and JSON-LD formats.
5.  **Cognitive Bias Detection:** Implement a secondary validation pass (the "Anionic Veto") to identify homophily and prompt for orthogonal alternatives.
