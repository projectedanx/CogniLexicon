Root: React/Vite
├── Auth: None — Not implemented
├── DB: LocalStorage — useMirrorTokens hook
├── API: Gemini API — REST via @google/genai
├── UI: Tailwind CSS — standard utility tokens
└── Infra: AI Studio — Static build

DATA FLOWS:
User → [UI] → [API] → [UI] → [DB]

MEREOLOGICAL MAP:
[Component] ∈ [Service] ∈ [Module] ∈ [Root]

## FUTURE STATE ARCHITECTURE (V2.0)
The current architecture will evolve to support the "Pluriversal Knowledge Capsule" framework through 5 key epics:

1.  **Cross-Lingual Semantic Resonance:** Extend `services/geminiService.ts` to query multi-lingual embedding dimensions. Update `GraphData` schema to support language tags.
2.  **Temporal Concept Evolution:** Introduce a timeline state in `App.tsx` and extend the API layer to request chronological segmentation.
3.  **Multi-User Dialectical Graphing:** Replace LocalStorage DB with a real-time sync engine (e.g., Supabase/CRDTs) to support shared workspaces and "Tension Nodes".
4.  **Automated Ontology Export:** Add serialization modules (`services/exportService.ts`) to transform the internal DAG into OWL, RDF, and JSON-LD formats.
5.  **Cognitive Bias Detection:** Implement a secondary validation pass (the "Anionic Veto") to identify homophily and prompt for orthogonal alternatives.
