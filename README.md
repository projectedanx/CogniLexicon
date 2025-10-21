<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CogniLexicon: The Semantic Expansion Engine

CogniLexicon is a powerful web application that serves as a "Semantic Expansion Engine." It allows users to enter a word or concept and generate a multi-faceted semantic profile, complete with a knowledge graph that visualizes the concept's connections to related terms. This tool is designed for anyone looking to explore the deeper meanings and relationships of words and ideas.

## Features

-   **Detailed Semantic Profiles:** For any given concept, the application generates a rich profile including:
    -   A concise definition.
    -   The etymology or origin of the word.
    -   Primary conceptual domains it belongs to.
    -   Lists of synonyms, antonyms, and conceptual neighbors.
    -   Example sentences demonstrating its usage.
-   **Interactive Knowledge Graph:** A dynamic, D3.js-powered graph that visually represents the relationships between the core concept and its related terms. Nodes are interactive and can be dragged for better visualization.
-   **Mirror Token Lexicon:** Users can save frequently explored concepts as "Mirror Tokens" for quick access. This feature allows for easy management (add, remove, and load) of saved concepts.
-   **Responsive Design:** The application is designed to be fully responsive and works seamlessly on both desktop and mobile devices.
-   **Powered by Gemini:** Leverages the advanced capabilities of the Gemini API to generate all semantic data.

## Project Structure

The project is organized into the following directories:

-   `public/`: Contains public assets like images and fonts.
-   `src/`: The main source code of the application.
    -   `components/`: Contains all the React components used in the application.
        -   `icons/`: SVG icons used within components.
        -   `App.tsx`: The main application component.
        -   `SearchBar.tsx`: The search bar for user input.
        -   `SemanticProfile.tsx`: Component to display the semantic profile.
        -   `KnowledgeGraph.tsx`: Component to render the interactive knowledge graph.
        -   `MirrorTokenManager.tsx`: Component to manage saved "Mirror Tokens."
        -   `Loader.tsx` and `ErrorMessage.tsx`: UI components for loading and error states.
    -   `hooks/`: Custom React hooks, such as `useMirrorTokens.ts` for managing local storage.
    -   `services/`: Modules for interacting with external APIs, like `geminiService.ts`.
    -   `types.ts`: TypeScript type definitions for the application's data structures.
-   `index.html`: The main HTML file.
-   `package.json`: Project metadata and dependencies.
-   `vite.config.ts`: Configuration for the Vite build tool.

## Run Locally

**Prerequisites:**

-   Node.js (v14 or later)
-   npm or yarn

**Setup Instructions:**

1.  **Clone the repository:**
    `git clone <repository-url>`
2.  **Navigate to the project directory:**
    `cd <project-directory>`
3.  **Install dependencies:**
    `npm install`
4.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add your Gemini API key:
    `GEMINI_API_KEY=your_api_key_here`
5.  **Run the development server:**
    `npm run dev`
    This will start the application on `http://localhost:5173`.

## Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build locally for preview.

---

This project was generated from an AI Studio app. You can view your app in AI Studio here: https://ai.studio/apps/drive/1wI817e9qzQJdo7DdZ7Jw_iWFIw-ADFYE
