import { GoogleGenAI, Type } from "@google/genai";
import { SemanticProfileData, GraphData } from '../types';

// Per guidelines, API key must be from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  required: ["profile", "graph"],
  properties: {
    profile: {
      type: Type.OBJECT,
      required: [
        "definition",
        "etymology",
        "domains",
        "synonyms",
        "antonyms",
        "conceptualNeighbors",
        "exampleSentences",
        "dialecticalTensions"
      ],
      properties: {
        definition: { type: Type.STRING, description: "A concise definition." },
        etymology: { type: Type.STRING, description: "The etymology or origin of the word/concept." },
        domains: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Primary conceptual domains." },
        synonyms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 synonyms." },
        antonyms: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 antonyms." },
        conceptualNeighbors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Related but not synonymous concepts." },
        targetEquivalent: { type: Type.STRING, description: "The closest equivalent concept in the target language." },
        semanticDrift: { type: Type.STRING, description: "Analysis of the semantic drift or lost meaning between the source and target concepts." },
        exampleSentences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Example sentences demonstrating usage." },
        dialecticalTensions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Irreconcilable contradictions or dialectical tensions related to the concept." },
        biasAnalysis: {
          type: Type.OBJECT,
          description: "Cognitive bias analysis of the semantic profile.",
          required: ["homophilyIndex", "detectedBiases", "orthogonalConcepts"],
          properties: {
            homophilyIndex: { type: Type.NUMBER, description: "Homophily index from 0.0 to 1.0." },
            detectedBiases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["type", "description", "severity"],
                properties: {
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ["low", "medium", "high"] }
                }
              }
            },
            orthogonalConcepts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Concepts to counter the biases." }
          }
        }

      },
    },
    graph: {
      type: Type.OBJECT,
      required: ["nodes", "links"],
      properties: {
        nodes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["id", "group"],
            properties: {
              id: { type: Type.STRING, description: "The name of the concept/node." },
              group: { type: Type.INTEGER, description: "A number representing the node's group. The main concept should be group 1." },
              isTensionNode: { type: Type.BOOLEAN, description: "True if this node represents a dialectical contradiction or opposing viewpoint." },
              language: { type: Type.STRING, description: "The language code of the node (e.g., 'en', 'es')." },
            },
          },
        },
        links: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            required: ["source", "target", "value"],
            properties: {
              source: { type: Type.STRING, description: "The ID of the source node." },
              target: { type: Type.STRING, description: "The ID of the target node." },
              value: { type: Type.INTEGER, description: "The strength of the link, from 1 to 10." },
            },
          },
        },
      },
    },
  },
};

/**
 * Fetches semantic data for a given query from the Gemini API.
 * This function constructs a detailed prompt to generate a semantic profile and a knowledge graph.
 * It then calls the Gemini API, parses the JSON response, and performs validation and normalization.
 * The function also includes robust error handling for API and network-related issues.
 *
 * @param {string} query - The word or concept to fetch semantic data for.
 * @param {string} [targetLanguage] - Optional target language for cross-lingual resonance.
 * @returns {Promise<{ profile: SemanticProfileData; graph: GraphData }>} A promise that resolves to an object containing the semantic profile and knowledge graph data.
 * @throws {Error} Throws an error if the API call fails, the response is malformed, or a network error occurs.
 * The error message is tailored to the specific type of error (e.g., network, API rate limit, server error).
 */
export const getSemanticData = async (query: string, targetLanguage?: string): Promise<{ profile: SemanticProfileData; graph: GraphData }> => {
    const prompt = `

        For the concept "${query}", generate a detailed semantic profile and a knowledge graph.
        ${targetLanguage ? `
        +++PluriversalTranslation(target="${targetLanguage}")
        The user has requested cross-lingual semantic resonance into ${targetLanguage}.
        - Provide the 'targetEquivalent' in ${targetLanguage}.
        - Provide a 'semanticDrift' analysis explaining how the meaning shifts or what nuances are lost/gained in translation.
        - Include at least 2 cross-lingual nodes in the knowledge graph representing the equivalent concept or related concepts in ${targetLanguage}, setting their 'language' field accordingly.
        ` : ''}

        +++DCCDSchemaGuard(schema="SEMANTIC_PROFILE", enforcement="strict")
        +++MereologyRoute(relation_type="Concept-Operationalization", transitivity_check=true)
        +++ContextLock(anchor="QUERY_CONCEPT", refresh_interval=2048)
        +++ParaconsistentLens[Contradiction -> Opportunity]
        +++EpistemicEscrow(cfd_threshold=0.15)

        The semantic profile must include:

        - A concise definition.
        - The etymology or origin of the word/concept.
        - Primary conceptual domains it belongs to (e.g., "Physics", "Philosophy", "Art").
        - A list of 3-5 synonyms.
        - A list of 3-5 antonyms.
        - A list of 3-5 conceptual neighbors (related but not synonymous concepts).

        - At least 3 example sentences demonstrating its usage.
        - A list of 3-5 dialectical tensions (irreconcilable contradictions or opposing viewpoints) related to the concept, mapped via S5-Modal Attention to prevent semantic annihilation.

        - A cognitive bias analysis including a homophily index (0.0 to 1.0), detected biases, and orthogonal concepts.


        The knowledge graph must represent the relationships between the core concept and its related terms.
        - The central node must be the query concept "${query}" itself, assigned to group 1.
        - Other nodes should be related concepts like synonyms, antonyms, and conceptual neighbors.
        - Links must connect the central node to the related concepts. The 'value' of the link should represent the strength of the relationship (e.g., synonyms have a higher value).
        - The graph must have at least 5 nodes (including the central one) and 4 links originating from the central node.
        - You MUST include at least 2 "Tension Nodes" in the graph that represent these dialectical tensions. For these nodes, you must set "isTensionNode": true and connect them to the central node or other relevant concepts.

        - All node 'id's in links must correspond to an 'id' in the nodes list.

        The output MUST be a single valid JSON object.
        This object must have two top-level keys: "profile" and "graph".
        The "profile" key must contain an object with the semantic profile data.
        The "graph" key must contain an object with the knowledge graph data.
        Strictly adhere to the provided JSON schema. All specified fields are required.
        All fields in the profile must be populated with data and not be empty arrays.
    `;
    
    let jsonText: string;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        jsonText = response.text.trim();

        // The API with responseMimeType: "application/json" should return clean JSON.
        // However, as a safeguard, we'll attempt to extract it if it's wrapped in markdown.
        const jsonMatch = jsonText.match(/```(json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[2]) {
            jsonText = jsonMatch[2];
        }
        
        const data = JSON.parse(jsonText);
        
        // Normalize received data and provide defaults for missing fields to make the app more resilient.
        const profile = data.profile || {};
        const graph = data.graph || {};

        const validatedProfile: SemanticProfileData = {
            definition: profile.definition || 'No definition provided.',
            etymology: profile.etymology || 'No etymology provided.',
            domains: Array.isArray(profile.domains) ? profile.domains : [],
            synonyms: Array.isArray(profile.synonyms) ? profile.synonyms : [],
            antonyms: Array.isArray(profile.antonyms) ? profile.antonyms : [],
            conceptualNeighbors: Array.isArray(profile.conceptualNeighbors) ? profile.conceptualNeighbors : [],
            exampleSentences: Array.isArray(profile.exampleSentences) ? profile.exampleSentences : [],
            dialecticalTensions: Array.isArray(profile.dialecticalTensions) ? profile.dialecticalTensions : [],
            targetEquivalent: profile.targetEquivalent,
            semanticDrift: profile.semanticDrift,
            biasAnalysis: profile.biasAnalysis || {
                homophilyIndex: 0,
                detectedBiases: [],
                orthogonalConcepts: []
            }
        };

        const validatedGraph: GraphData = {
            nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
            links: Array.isArray(graph.links) ? graph.links : [],
        };
        
        // If the graph is empty but we have a profile, create a single-node graph as a fallback.
        if (validatedGraph.nodes.length === 0 && query) {
            validatedGraph.nodes.push({ id: query, group: 1 });
        }
        
        // Even with defaults, some data is essential. If the definition is missing, the response isn't useful.
        if (!profile.definition) {
             console.error("Incomplete data structure received from API. Core 'definition' is missing. Response:", jsonText);
             throw new Error("Incomplete data received from API. The definition for the concept could not be generated.");
        }
        
        return { profile: validatedProfile, graph: validatedGraph };

    } catch (error) {
        console.error("Error fetching or parsing semantic data from Gemini API:", error);
        
        if (error instanceof Error) {
            // Handle our custom data validation error
            if (error.message.includes("Incomplete data received")) {
                throw error;
            }
            
            // Handle network errors
            if (error.message.toLowerCase().includes('fetch')) {
                throw new Error("Network error. Please check your internet connection and try again.");
            }

            // Handle specific Gemini API errors based on status codes in the message
            if (error.message.includes('[400')) {
                throw new Error("Invalid request. The API could not process your query. Please try rephrasing it.");
            }
            if (error.message.includes('[429')) {
                throw new Error("API rate limit exceeded. Please wait a moment before trying again.");
            }
            if (error.message.includes('[500')) {
                throw new Error("API server error. The service is temporarily unavailable. Please try again later.");
            }
        }
        
        // Fallback for any other type of error
        throw new Error("An unexpected error occurred. Please try again.");
    }
};
