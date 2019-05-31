const fs = require('fs')
const _ = require('lodash')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{

    const sort = item=>{
        return item.key;
    }

    arrayToCheck = extractObject(loadYml(yml)).map(sort).sort()
    sampleArray = extractObject(loadYml(sampleYml)).map(sort).sort()



    if (!_.isEqual(arrayToCheck, sampleArray)){
        console.error(`Please check the following emvironment ${yml}`)
        console.log("Sample:")
        console.log(sampleArray)
        console.log("Actual:")
        console.error(arrayToCheck)
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