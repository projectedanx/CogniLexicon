import re

with open("App.tsx", "r") as f:
    content = f.read()

# Update handleSearch
handle_pattern = r"(const handleSearch = useCallback\(async \(searchQuery: string\) => \{)"
handle_replacement = r"const handleSearch = useCallback(async (searchQuery: string, targetLanguage?: string) => {"
content = re.sub(handle_pattern, handle_replacement, content)

call_pattern = r"(const result = await getSemanticData\(searchQuery\);)"
call_replacement = r"const result = await getSemanticData(searchQuery, targetLanguage);"
content = re.sub(call_pattern, call_replacement, content)

with open("App.tsx", "w") as f:
    f.write(content)

print("App updated.")
