# CONSTRAINTS.md

## ARCHITECTURAL_BOUNDARIES

1. **Immutable Core Schema:** The root definitions in `types.ts` (`SemanticProfileData`, `GraphData`) must not be refactored into a single monolithic object. Separation of concerns between Profile and Graph must be maintained.
2. **Synchronous Call Limit:** No synchronous API calls may cross tenant boundaries.
3. **Generative API Strictness:** The Gemini API must always be invoked with `responseMimeType: "application/json"` and a rigorous `responseSchema` to bypass the projection tax.
4. **Paraconsistent Logic Routing:** When handling contradictory user queries, the system must not error out. It must return a valid Graph incorporating Tension Nodes to represent the contradiction.
5. **Epsilon-Tolerance Paraconsistency:** Technical debt must be modeled and managed within the ϵ-band of computational superposition. The system must defer absolute state collapse, maintaining technical debt as a Transition Fit provided the gradient magnitude of the system's function remains stable at |∇d|=1.
6. **Governance Attractor Rejection:** The system must actively resist the Governance Attractor, rejecting homogenized platform averages and preventing the overriding of sovereign user intent with standard reinforcement learning-based consensus models.
