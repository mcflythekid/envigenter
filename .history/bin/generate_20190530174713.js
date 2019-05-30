const yaml = require('js-yaml')
const fs   = require('fs')
const { exec, extractObject } = require('./lib')

const loadYml = filePath=>{
    try {
        return yaml.safeLoad(fs.readFileSync(filePath), 'utf8')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

const generateHygenCommand = (ymlObject, hygenAction)=>{
    let command = `cross-env HYGEN_OVERWRITE=1 hygen env ${hygenAction}`
    extractObject(ymlObject).forEach(obj=>{
        command += ` --${obj.key} "${obj.val}"`
    })
    return command
}

module.exports = profile=>{
    const defaultYmlObject = loadYml(`env/${profile}.env.yml`)
    const defaultYmlObjectSample = loadYml(`env/.SAMPLE.yml`)
    exec(generateHygenCommand(defaultYmlObject, 'default'))

    if (fs.existsSync(`env/extra/${profile}.env.yml`)) {
        const extraYmlObject = loadYml(`./env/extra/${profile}.env.yml`)
        exec(generateHygenCommand({...defaultYmlObject, ...extraYmlObject }, `extra-${profile}`))
    }
}