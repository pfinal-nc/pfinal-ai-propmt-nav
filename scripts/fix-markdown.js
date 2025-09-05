const fs = require('fs')
const path = require('path')

const promptsDir = path.join(__dirname, '..', 'content', 'prompts')

// Replace Chinese punctuation with English punctuation
function replaceChinesePunctuation(text) {
  const punctuationMap = {
    '\uff0c': ',',    // Chinese comma
    '\u3002': '.',    // Chinese period
    '\uff1a': ':',    // Chinese colon
    '\uff1b': ';',    // Chinese semicolon
    '\u201c': '"',    // Chinese left double quote
    '\u201d': '"',    // Chinese right double quote
    '\u2018': "'",    // Chinese left single quote
    '\u2019': "'",    // Chinese right single quote
    '\uff08': '(',    // Chinese left parenthesis
    '\uff09': ')',    // Chinese right parenthesis
    '\u3010': '[',    // Chinese left square bracket
    '\u3011': ']',    // Chinese right square bracket
    '\uff5b': '{',    // Chinese left curly brace
    '\uff5d': '}',    // Chinese right curly brace
    '\uff1f': '?',    // Chinese question mark
    '\uff01': '!'     // Chinese exclamation mark
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
