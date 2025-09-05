// Parse markdown file frontmatter
export function parseMd(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const [_, frontmatterStr, markdown] = match;
  const frontmatter = {};
  
  // Parse YAML format frontmatter
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Check if it's a new key-value pair
    if (line.includes(':') && !line.startsWith('-')) {
      const [key, ...values] = line.split(':').map(s => s.trim());
      if (key && values.length) {
        let value = values.join(':').trim();
        
        // Handle quotes
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        
        // Check if it's an array
        if (value === '[]' || value === '') {
          frontmatter[key] = [];
          currentKey = key;
        } else {
          frontmatter[key] = value;
          currentKey = null;
        }
      }
    } else if (line.startsWith('- ') && currentKey === 'tags') {
      // Handle array items
      const value = line.slice(2).trim();
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      frontmatter[currentKey].push(value);
    }
  }

  return {
    ...frontmatter,
    body: markdown.trim(),
    content: markdown.trim()
  };
}
