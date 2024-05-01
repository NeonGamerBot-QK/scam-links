const fs = require('fs')
const path = require('path')

const files = fs.readdirSync('links')
files.forEach((f) => {
    console.log(`[*] Running ${f}.`)
    const ff_path = path.join(__dirname, 'links', f)
    const ff = fs.readdirSync(ff_path)
const fullPath = path.join(ff_path, ff.find(e=>e.endsWith('.json') && !e.includes('.meta.')))
const metadata = require(path.join(ff_path, 'metadata.json'))
if(metadata.download_url) {
    console.log(`[*] Downloading...`)
    fetch(download_url).then(r=>r.text()).then(text => {
        let json = metadata.format == 'txt' ? text.split('\n') : JSON.parse(text)
        // if(metadata.format == 'txt') json = 
        fs.writeFileSync(fullPath, JSON.stringify(json, null, 2))
        console.log(`[*] Downloaded.`)
    })
} else {
    console.log(`[*] Skipping, no download URL`)
}
})