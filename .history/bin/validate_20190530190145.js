const fs = require('fs')
const _ = require('lodash')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{

    const sort = item=>{
        return iterm.key;
    }

    arrayToCheck = extractObject(loadYml(yml)).map(sort).sort()
    sampleArray = extractObject(loadYml(sampleYml)).map(sort).sort()

    console.log(arrayToCheck)
    console.log(sampleArray)

    if (!_.isEqual(arrayToCheck, sampleArray)){
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