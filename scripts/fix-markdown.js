const fs = require('fs')
const path = require('path')

const promptsDir = path.join(__dirname, '..', 'content', 'prompts')

// 替换中文标点为英文标点
function replaceChinesePunctuation(text) {
  const punctuationMap = {
    '\uff0c': ',',    // 中文逗号
    '\u3002': '.',    // 中文句号
    '\uff1a': ':',    // 中文冒号
    '\uff1b': ';',    // 中文分号
    '\u201c': '"',    // 中文左双引号
    '\u201d': '"',    // 中文右双引号
    '\u2018': "'",    // 中文左单引号
    '\u2019': "'",    // 中文右单引号
    '\uff08': '(',    // 中文左括号
    '\uff09': ')',    // 中文右括号
    '\u3010': '[',    // 中文左方括号
    '\u3011': ']',    // 中文右方括号
    '\uff5b': '{',    // 中文左花括号
    '\uff5d': '}',    // 中文右花括号
    '\uff1f': '?',    // 中文问号
    '\uff01': '!'     // 中文感叹号
  }
  
  return text.replace(new RegExp(`[${Object.keys(punctuationMap).join('')}]`, 'g'), 
    char => punctuationMap[char] || char)
}

function processFile(filePath) {
  console.log(`Processing: ${filePath}`)
  const content = fs.readFileSync(filePath, 'utf8')
  const fixedContent = replaceChinesePunctuation(content)
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent)
    console.log(`Updated: ${filePath}`)
  }
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
console.log('All files processed!')
