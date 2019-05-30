const fs   = require('fs')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{
    ymlObject = extractObject(loadYml(yml))
    sampleYmlObject = extractObject(loadYml(sampleYml))
    console.log(ymlObject)
    console.log(sampleYmlObject)

    console.log()
}

module.exports = profile=>{
    validateConfig(`env/${profile}.env.yml`, `env/SAMPLE.yml`)

    const extraYml = `env/extra/${profile}.env.yml`
    if (fs.existsSync(extraYml)) {
        validateConfig(extraYml, `./env/extra/${profile}.SAMPLE.yml`)
    }
}