with open('App.tsx', 'r') as f:
    content = f.read()

# 1. Add the import
import_statement = "import { CognitiveBiasPanel } from './components/CognitiveBiasPanel';\n"
content = content.replace("import { SemanticProfile } from './components/SemanticProfile';", "import { SemanticProfile } from './components/SemanticProfile';\n" + import_statement)

# 2. Add the conditional render below SemanticProfile
render_update = """
            <div className="mt-4">
                {activeView === 'profile' && (
                  <>
                    <SemanticProfile data={semanticProfile} word={query} />
                    {semanticProfile.biasAnalysis && <CognitiveBiasPanel biasData={semanticProfile.biasAnalysis} />}
                  </>
                )}
                {activeView === 'graph' && graphData && <KnowledgeGraph data={graphData} />}
            </div>
"""
content = content.replace("""
            <div className="mt-4">
                {activeView === 'profile' && <SemanticProfile data={semanticProfile} word={query} />}
                {activeView === 'graph' && graphData && <KnowledgeGraph data={graphData} />}
            </div>
""", render_update.strip())

# Fix the malformed div closing tag if it exists
content = content.replace('            </div>            </>', '            </div>\n            </>')

with open('App.tsx', 'w') as f:
    f.write(content)
