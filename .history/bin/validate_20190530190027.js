const fs = require('fs')
const _ = require('lodash')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{

    const sort = item=>{
        return x.key;
    }

    ymlObject = extractObject(loadYml(yml)).map(sort).sort()
    sampleYmlObject = extractObject(loadYml(sampleYml)).map(sort).sort()

    if (!_.isEqual()){
        console.error('Please check emvironment')
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