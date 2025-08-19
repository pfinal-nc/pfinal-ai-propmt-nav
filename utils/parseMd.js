// 解析 markdown 文件的 frontmatter
export function parseMd(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;

  const [_, frontmatterStr, markdown] = match;
  const frontmatter = {};
  
  // 解析 YAML 格式的 frontmatter
  const lines = frontmatterStr.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // 检查是否是新的键值对
    if (line.includes(':') && !line.startsWith('-')) {
      const [key, ...values] = line.split(':').map(s => s.trim());
      if (key && values.length) {
        let value = values.join(':').trim();
        
        // 处理引号
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        
        // 检查是否是数组
        if (value === '[]' || value === '') {
          frontmatter[key] = [];
          currentKey = key;
        } else {
          frontmatter[key] = value;
          currentKey = null;
        }
      }
    } else if (line.startsWith('- ') && currentKey === 'tags') {
      // 处理数组项
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
