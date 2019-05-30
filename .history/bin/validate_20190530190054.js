const fs = require('fs')
const _ = require('lodash')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{

    const sort = item=>{
        return x.key;
    }

    arrayTo = extractObject(loadYml(yml)).map(sort).sort()
    sampleYmlObject = extractObject(loadYml(sampleYml)).map(sort).sort()

    if (!_.isEqual()){
        console.error(`Please check emvironment ${yml}`)
        process.exit(2)
    }


 
}

module.exports = profile=>{
    validateConfig(`env/${profile}.env.yml`, `env/SAMPLE.yml`)

    const extraYml = `env/extra/${profile}.env.yml`
    if (fs.existsSync(extraYml)) {
        validateConfig(extraYml, `./env/extra/${profile}.SAMPLE.yml`)
    }
}