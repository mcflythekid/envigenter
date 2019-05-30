const fs   = require('fs')
const { exec, extractObject, loadYml } = require('./lib')



const validateConfig = (ymlObject, ymlObjectSample)=>{
    // TODO

}

module.exports = profile=>{
    validateConfig(`env/${profile}.env.yml`, `env/SAMPLE.yml`)

    const extraYml = `env/extra/${profile}.env.yml`
    if (fs.existsSync()) {
        const extraYmlObject = loadYml(`./env/extra/${profile}.env.yml`)
        validateConfig(extraYmlObject, loadYml(`./env/extra/${profile}.SAMPLE.yml`))
    }
}