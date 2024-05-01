const fs = require('fs')
const path = require('path')

const files = fs.readdirSync('../links')
let all = {
    '_NOTE': `Automated compile`,
    'lastCompileDate': Date.now(),
    links: {}
}
files.forEach((f) => {
    console.log(`[*] Running ${f}.`)
    const ff_path = path.join(__dirname,'..', 'links', f)
    const ff = fs.readdirSync(ff_path)
const fullPath = path.join(ff_path, ff.find(e=>e.endsWith('.json') && !e.includes('metadata.json')))
// const metadata = require(path.join(ff_path, 'metadata.json'))
const pathName = path.join(f,  ff.find(e=>e.endsWith('.json') && !e.includes('metadata.json')))
console.log(pathName)
all.links[pathName] = require(fullPath)
})
fs.writeFileSync(path.join(__dirname, '..', 'all.json'), JSON.stringify(all, null, 2))

