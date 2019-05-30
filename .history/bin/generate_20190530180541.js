const yaml = require('js-yaml')
const fs   = require('fs')
const { exec, extractObject, loadYml } = require('./lib')

const generateHygenCommand = (ymlObject, hygenAction)=>{
    let command = `cross-env HYGEN_OVERWRITE=1 hygen env ${hygenAction}`
    extractObject(ymlObject).forEach(obj=>{
        command += ` --${obj.key} "${obj.val}"`
    })
    return command
}

const validateConfig = (ymlObject, ymlObjectSample)=>{
    // TODO

}

module.exports = profile=>{
    const defaultYmlObject = loadYml(`env/${profile}.env.yml`)
    validateConfig(defaultYmlObject, loadYml(`env/SAMPLE.yml`))
    exec(generateHygenCommand(defaultYmlObject, 'default'))

    if (fs.existsSync(`env/extra/${profile}.env.yml`)) {
        const extraYmlObject = loadYml(`./env/extra/${profile}.env.yml`)
        validateConfig(extraYmlObject, loadYml(`./env/extra/${profile}.SAMPLE.yml`))
        exec(generateHygenCommand({...defaultYmlObject, ...extraYmlObject }, `extra-${profile}`))
    }
}