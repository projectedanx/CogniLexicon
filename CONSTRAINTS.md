# CONSTRAINTS.md

## ARCHITECTURAL_BOUNDARIES

1. **Immutable Core Schema:** The root definitions in `types.ts` (`SemanticProfileData`, `GraphData`) must not be refactored into a single monolithic object. Separation of concerns between Profile and Graph must be maintained.
2. **Synchronous Call Limit:** No synchronous API calls may cross tenant boundaries.
3. **Generative API Strictness:** The Gemini API must always be invoked with `responseMimeType: "application/json"` and a rigorous `responseSchema` to bypass the projection tax.
4. **Paraconsistent Logic Routing:** When handling contradictory user queries, the system must not error out. It must return a valid Graph incorporating Tension Nodes to represent the contradiction.
