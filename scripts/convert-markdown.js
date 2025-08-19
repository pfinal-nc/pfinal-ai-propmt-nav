const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const promptsDir = path.join(__dirname, '..', 'content', 'prompts')

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const { data, content: markdown } = matter(content)
  
  const newContent = `# ${data.title}\n\nexport default ${JSON.stringify(data, null, 2)}\n\n${markdown.trim()}`
  
  fs.writeFileSync(filePath, newContent)
  console.log(`Processed: ${filePath}`)
}

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      walkDir(fullPath)
    } else if (file.endsWith('.md')) {
      processFile(fullPath)
    }
  })
}

walkDir(promptsDir)
