Root: React/Vite
├── Auth: None — Not implemented
├── DB: LocalStorage — useMirrorTokens hook
├── API: Gemini API — REST via @google/genai
├── UI: Tailwind CSS — standard utility tokens
├── Infra: AI Studio — Static build
└── Sovereign Agents: Decoupled Blueprints (e.g., KUT-2.0.1-SOVEREIGN, LEXIS-SOVEREIGN)
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
Currently Managed Agents:
- **KUT (Retention Architect):** Video editing workflow and pacing enforcement.
- **LEXIS SOVEREIGN (The Auteur Co-Author):** Thought-leadership ghostwriting and deterministic publishing artifact generation.
## COGNITIVE BYTECODE & PROGRESSIVE DISCLOSURE
The repository integrates the Cognitive Bytecode standard outlined in `LEXICON.md` (DRP-LEXICON-992). Core components like the Gemini API prompt utilize Progressive Disclosure Level (PDL) decorators (`+++DCCDSchemaGuard`, `+++MereologyRoute`, `+++ContextLock`) to mitigate Lexical Saponification and enforce topological bridging across domains.

## FUTURE STATE ARCHITECTURE (V2.0)
The current architecture will evolve to support the "Pluriversal Knowledge Capsule" framework through 5 key epics:
1.  **Cross-Lingual Semantic Resonance:** Extend `services/geminiService.ts` to query multi-lingual embedding dimensions. Update `GraphData` schema to support language tags.
2.  **Temporal Concept Evolution:** Introduce a timeline state in `App.tsx` and extend the API layer to request chronological segmentation.
3.  **Multi-User Dialectical Graphing:** Replace LocalStorage DB with a real-time sync engine (e.g., Supabase/CRDTs) to support shared workspaces and "Tension Nodes".
4.  **Automated Ontology Export:** Add serialization modules (`services/exportService.ts`) to transform the internal DAG into OWL, RDF, and JSON-LD formats.
5.  **Cognitive Bias Detection:** Implement a secondary validation pass (the "Anionic Veto") to identify homophily and prompt for orthogonal alternatives.


### CROSS-LINGUAL SEMANTIC RESONANCE (v2.0 Epic 1)
Implemented `+++PluriversalTranslation` PDL decorator in the Gemini Service to request high-dimensional cross-lingual mapping.
- **AI Synergic Value:** The LLM computes the exact "semantic drift" (translation gaps, lost nuance).
- **Human Synergic Value:** The user is visually presented with the `targetEquivalent` and the `semanticDrift` holding an epistemic `[∇]` marker, allowing the human to subjectively interpret the cultural tension that strict algorithmic mapping saponifies.
- **Topological Visuals:** The D3 Graph maps cross-lingual concepts in emerald green (`#10b981`) contrasting against English concepts, explicitly maintaining domain separation.
