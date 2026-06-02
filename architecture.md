# 0xCARTO Architecture Topology
0xCARTO Synthesis Timestamp: 2026-06-03T00:19:00Z

## MEREOLOGICAL MAP
The repository functions as a decoupled execution environment.

[Component] ∈ [Service] ∈ [Module] ∈ [Root]
[Sovereign Blueprint] ∈ [Agent Layer] ∈ [Root]

## TIER 2: Architecture Topology Map
Generated via Mycelial CI Trace (DRP_7_PATTERN_MODEL).
Betti-1 Cycle Status: CLEAN

```mermaid
graph TD
    subgraph ENV["Environment Layer (Vite Config / Process.env)"]
        E1["vite.config.ts<br/>Defines process.env.API_KEY"]
        E2["SILENT_REQUIRED_ENV: API_KEY<br/>⚠️ Missing .env.example"]
    end

    subgraph SOVEREIGN["Sovereign Agent Layer (blueprints/)"]
        S1["VIPER-SOVEREIGN.md"]
        S2["VULCAN-1.0.0-SOVEREIGN.md"]
        S3["AURELIUS-SOVEREIGN.md"]
        S4["LEXIS-SOVEREIGN.md"]
        S5["0xCARTO-SOVEREIGN.md"]
    end

    subgraph APP["Application Layer (src/)"]
        A1["Entry Point<br/>src/index.tsx"]
        A2["Core Service<br/>services/geminiService.ts"]
        A3["D3 Graph Component<br/>components/KnowledgeGraph.tsx"]
        A4["State Hook<br/>hooks/useMirrorTokens.ts"]
    end

    subgraph CI["CI/CD Layer"]
        C1["PHANTOM_INFRASTRUCTURE<br/>⚠️ No .github/workflows detected"]
    end

    E1 -->|injects| APP
    E2 --> E1
    S1 -.->|Contextual injection| APP
    S2 -.->|Contextual injection| APP
    S3 -.->|Contextual injection| APP
    S4 -.->|Contextual injection| APP
    S5 -.->|Contextual injection| APP
    A1 --> A2 & A3 & A4
    A2 -->|External REST| GENAI["Google Gemini API"]
    A4 -->|Reads/Writes| LOCAL_DB["Browser LocalStorage"]

    classDef warning fill:#fef3c7,stroke:#d97706,color:#000
    classDef golden fill:#fde68a,stroke:#b45309,color:#000
    classDef phantom fill:#fee2e2,stroke:#dc2626,color:#000

    class E2,C1 phantom
    class S1,S2,S3,S4,S5 golden
```

## DATA FLOWS
1. User → [UI] → [API] → [UI] → [DB]
2. User → [Agent Blueprint] → [LLM Context] → [Structured Output] → [Scar Ledger Schema]

## DEPENDENCY MATRIX (L3 Thermodynamic Lens)
| Dependency | Version Pin | Production? | CI Invoked? | Entropy Vector |
| :--- | :--- | :--- | :--- | :--- |
| `react` | `^19.2.0` (semver range) | ✅ Yes | ❌ Phantom | ⚠️ MEDIUM — range allows drift |
| `@google/genai` | `^1.25.0` (semver range) | ✅ Yes | ❌ Phantom | ⚠️ MEDIUM — range allows drift |
| `d3` | `^7.9.0` (semver range) | ✅ Yes | ❌ Phantom | ⚠️ MEDIUM — range allows drift |
| `typescript` | `~5.8.2` (tilde pin) | ❌ Dev only | ❌ Phantom | ⚠️ LOW/MEDIUM |
| `vite` | `^6.4.2` (semver range) | ❌ Dev only | ❌ Phantom | ⚠️ MEDIUM |

## RUNBOOK
1. Clone the repository.
2. `npm install`
3. ⚠️ **SILENT_REQUIRED_ENV:** Create `.env.local` and set `API_KEY=your_key`.
4. `npm run test -- --run`
5. `npm run build`
