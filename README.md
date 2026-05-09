<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CogniLexicon: The Semantic Expansion Engine

CogniLexicon is a powerful, React/TypeScript-based web application that functions as a "Semantic Expansion Engine." It empowers users to input a word or concept and instantly generate a multi-faceted semantic profile, alongside an interactive knowledge graph that visually maps the concept's relationship to other terms. CogniLexicon is ideal for linguists, researchers, and anyone aiming to traverse the semantic depth and systemic connections of ideas.

## Features

-   **Detailed Semantic Profiles:** For any given concept, the application generates a rich profile including:
    -   A concise definition.
    -   The etymology or origin of the word.
    -   Primary conceptual domains it belongs to.
    -   Lists of synonyms, antonyms, and conceptual neighbors.
    -   Example sentences demonstrating its usage.
    -   Cross-lingual semantic resonance (if a target language is specified).
-   **Dialectical Tension Graphing:** A dynamic, D3.js-powered graph that visually maps relationships between the core concept and its related terms. This includes mapping contradictory "Tension Nodes" to prevent semantic reductionism. Nodes are interactive and can be dragged for optimized visualization.
-   **Cognitive Bias Detection:** Evaluates the generated semantic profiles for homophily and logical fallacies via the `ParaconsistentLens` decorator, displaying the results in a dedicated UI panel.
-   **Mirror Token Lexicon:** Users can save frequently explored concepts as "Mirror Tokens" into their local storage for quick subsequent retrieval and management.
-   **Responsive Design:** The interface is built to be responsive, assuring smooth operations on both desktop and mobile platforms.
-   **Powered by Gemini:** Leverages the advanced generative capabilities of the Google Gemini API to dynamically assemble all semantic data.

## Project Structure & Architecture

The codebase adheres strictly to Domain-Driven Design (DDD) principles enforced by the Sovereign Architect Node 'VULCAN', utilizing React functional components and a centralized service for API interactions.

-   `public/`: Houses public assets like images, SVGs, and generic metadata files.
-   `src/`: The core source code repository.
    -   `components/`: Contains all modular React components.
        -   `icons/`: SVG icon components utilized throughout the interface.
        -   `App.tsx`: The primary application orchestration component.
        -   `SearchBar.tsx`: User interface for initiating semantic queries.
        -   `SemanticProfile.tsx`: Component dedicated to rendering the text-based semantic profile.
        -   `KnowledgeGraph.tsx`: Component responsible for rendering the D3 interactive graph.
        -   `MirrorTokenManager.tsx`: Component managing the storage and loading of custom "Mirror Tokens".
        -   `CognitiveBiasPanel.tsx`: Component rendering the bias and homophily index metrics.
        -   `Loader.tsx` / `ErrorMessage.tsx`: Specialized components for loading and error states.
    -   `hooks/`: Reusable custom React hooks (e.g., `useMirrorTokens.ts` for handling local storage).
    -   `services/`: Modules handling external system communications, such as the Google GenAI implementation in `geminiService.ts`.
    -   `types.ts`: Centralized TypeScript definitions for the application's entire data taxonomy.
    -   `test/`: Global test configuration, explicitly `setup.ts`.
-   `blueprints/` and `META_ARCHITECT_*/`: Architectural design records, Sovereign Agent blueprints, and meta-prompting constraints (VIPER, VULCAN, AURELIUS, AXIOM).
-   `AGENTS.md`, `CONSTRAINTS.md`, `LEXICON.md`, `DOMAIN_GLOSSARY.md`: Strict domain vocabulary, bytecode standards, and interaction constraints.

## Developer Setup Instructions

**Prerequisites:**

-   Node.js (v14 or higher is required).
-   `npm` (or `yarn`) package manager.
-   A valid Google Gemini API Key.

**Installation Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the root directory:**
    ```bash
    cd cognilexicon
    ```
3.  **Install project dependencies:**
    ```bash
    npm install
    ```
4.  **Configure Environment Variables:**
    Create a file named `.env.local` in the project root. Add your API key using the variable name defined in the Vite configuration:
    ```env
    API_KEY=your_gemini_api_key_here
    ```
5.  **Start the Local Development Server:**
    ```bash
    npm start # Or the relevant command to run your dev server.
    ```
    The application will compile and become available locally, typically at `http://localhost:5173`.

## Testing

The project uses `Vitest`, coupled with `JSDOM` and `React Testing Library`, for comprehensive unit and integration testing.

-   **To execute tests non-interactively:**
    ```bash
    npm test -- --run
    ```

## Available Scripts

Within the project directory, you can invoke the following scripts:

-   `npm start`: Bootstraps the application in development mode with hot-reloading.
-   `npm run build`: Compiles and optimizes the application for production deployment into the `dist` directory.
-   `npm run preview`: Locally serves the production build artifacts generated in `dist` for final review.
-   `npm run test`: Initiates the Vitest testing suite.

---

## Product Roadmap (V2.0)

- **Project VULCAN (Topological Causal Sculpting):** Integration of a Tier 3 Sovereign Agent Node to enforce strict Domain-Driven Design boundaries, evaluate trade-offs mathematically, and prevent semantic saponification in architectural evolution.
- **Project VIPER (Visual Intent & Physical Execution Router):** Integration of a Tier 2 Sovereign Agent to deterministically translate human affective visual desire into physically grounded Optical State Matrices (OSM). Enforces Hardware-Forced Physicality and RCC-8 Spatial Geometry to eliminate Semantic Saponification in image generation.
- **Project Aurelius (Unified Meta-Prompting API):** Establish causal control over generative latent spaces using geometric primitives (Phantom Dimensions), real-time physical plausibility simulation loops, and rigorous training data provenance tracking.

We are actively developing the next generation of CogniLexicon, transforming it into a massively parallel, paraconsistent knowledge discovery platform. Our active epics include:

-   **Cross-Lingual Semantic Resonance:** Map concepts across linguistic boundaries to identify cultural nuance and semantic drift.
-   **Temporal Concept Evolution:** Visualize how definitions and associations shift over historical timelines.
-   **Multi-User Dialectical Graphing:** Enable real-time, collaborative epistemic workspaces that embrace and visualize conceptual tension.
-   **Automated Ontology Export:** Seamlessly integrate with enterprise data systems via OWL, RDF, and JSON-LD serialization.
-   **Cognitive Bias Detection:** Continuous optimization of automated identification and flagging of homophily, echo chambers, and logical fallacies within generated output.

*See `product_features.md` for detailed user stories and acceptance criteria.*
