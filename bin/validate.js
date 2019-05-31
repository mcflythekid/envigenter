const fs = require('fs')
const _ = require('lodash')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{

    const sort = item=>{
        return item.key
    }

    const diff = (a, b)=>{
        return _.differenceWith(a, b, _.isEqual)
    }

    const arrayToCheck = extractObject(loadYml(yml)).map(sort).sort()
    const sampleArray = extractObject(loadYml(sampleYml)).map(sort).sort()

    const missing = diff(sampleArray, arrayToCheck)
    const redundant = diff(arrayToCheck, sampleArray)
    
    if (!_.isEqual(arrayToCheck, sampleArray)){
        if (missing.length){
            console.error(`Missing environment variable in ${yml}`)
            console.log(missing)
        }
        if (redundant.length){
            console.error(`Redundant environment variable in ${yml}`)
            console.log(redundant)
        }
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