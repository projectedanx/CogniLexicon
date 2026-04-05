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
