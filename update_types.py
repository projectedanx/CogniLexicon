import re

with open('types.ts', 'r') as f:
    content = f.read()

bias_interface = """
/**
 * Represents the cognitive bias analysis of the generated profile and graph.
 */
export interface BiasAnalysisData {
  /** The calculated homophily index (0.0 to 1.0). High values indicate echo chamber risk. */
  homophilyIndex: number;
  /** A list of detected cognitive biases or logical fallacies. */
  detectedBiases: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  /** A list of orthogonal concepts suggested to counter the detected biases. */
  orthogonalConcepts: string[];
}
"""

content = content.replace("export interface SemanticProfileData {", bias_interface + "\nexport interface SemanticProfileData {\n  /** Cognitive bias analysis. */\n  biasAnalysis?: BiasAnalysisData;")

with open('types.ts', 'w') as f:
    f.write(content)
