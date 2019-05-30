const fs   = require('fs')
const { exec, extractObject, loadYml } = require('./lib')



const validateConfig = (ymlObject, ymlObjectSample)=>{
    // TODO

}

module.exports = profile=>{
    const defaultYmlObject = loadYml(`env/${profile}.env.yml`)
    validateConfig(defaultYmlObject, loadYml(`env/SAMPLE.yml`))

    if (fs.existsSync(`env/extra/${profile}.env.yml`)) {
        const extraYmlObject = loadYml(`./env/extra/${profile}.env.yml`)
        validateConfig(extraYmlObject, loadYml(`./env/extra/${profile}.SAMPLE.yml`))
        exec(generateHygenCommand({...defaultYmlObject, ...extraYmlObject }, `extra-${profile}`))
    }
}