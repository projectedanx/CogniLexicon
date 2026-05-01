import re

with open('services/geminiService.ts', 'r') as f:
    content = f.read()

# 1. Update the schema
schema_update = """
        exampleSentences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Example sentences demonstrating usage." },
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
"""
content = content.replace('exampleSentences: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Example sentences demonstrating usage." },', schema_update)

# 2. Update the prompt
prompt_update = """
        For the concept "${query}", generate a detailed semantic profile and a knowledge graph.

        +++DCCDSchemaGuard(schema="SEMANTIC_PROFILE", enforcement="strict")
        +++MereologyRoute(relation_type="Concept-Operationalization", transitivity_check=true)
        +++ContextLock(anchor="QUERY_CONCEPT", refresh_interval=2048)
        +++ParaconsistentLens[Contradiction -> Opportunity]
        +++EpistemicEscrow(cfd_threshold=0.15)

        The semantic profile must include:
"""
content = content.replace('For the concept "${query}", generate a detailed semantic profile and a knowledge graph.\n\n        +++DCCDSchemaGuard(schema="SEMANTIC_PROFILE", enforcement="strict")\n        +++MereologyRoute(relation_type="Concept-Operationalization", transitivity_check=true)\n        +++ContextLock(anchor="QUERY_CONCEPT", refresh_interval=2048)\n\n        The semantic profile must include:', prompt_update)

prompt_addendum = """
        - At least 3 example sentences demonstrating its usage.
        - A cognitive bias analysis including a homophily index (0.0 to 1.0), detected biases, and orthogonal concepts.
"""
content = content.replace('- At least 3 example sentences demonstrating its usage.', prompt_addendum)


# 3. Update the validation logic
validation_update = """
        const validatedProfile: SemanticProfileData = {
            definition: profile.definition || 'No definition provided.',
            etymology: profile.etymology || 'No etymology provided.',
            domains: Array.isArray(profile.domains) ? profile.domains : [],
            synonyms: Array.isArray(profile.synonyms) ? profile.synonyms : [],
            antonyms: Array.isArray(profile.antonyms) ? profile.antonyms : [],
            conceptualNeighbors: Array.isArray(profile.conceptualNeighbors) ? profile.conceptualNeighbors : [],
            exampleSentences: Array.isArray(profile.exampleSentences) ? profile.exampleSentences : [],
            biasAnalysis: profile.biasAnalysis || {
                homophilyIndex: 0,
                detectedBiases: [],
                orthogonalConcepts: []
            }
        };
"""

content = re.sub(r'const validatedProfile: SemanticProfileData = \{.*?\};', validation_update.strip(), content, flags=re.DOTALL)

with open('services/geminiService.ts', 'w') as f:
    f.write(content)
