const fs = require('fs')
const _ = require('lodash')
const { extractObject, loadYml } = require('./lib')

const validateConfig = (yml, sampleYml)=>{

    const sort = item=>{
        return x.key;
    }


    ymlObject = extractObject(loadYml(yml)).map(sort)
    sampleYmlObject = extractObject(loadYml(sampleYml)).map(sort)

    const x = ymlObject.map(v=>{
        return v.key;
    })

    console.log(x)


 
}

module.exports = profile=>{
    validateConfig(`env/${profile}.env.yml`, `env/SAMPLE.yml`)

    const extraYml = `env/extra/${profile}.env.yml`
    if (fs.existsSync(extraYml)) {
        validateConfig(extraYml, `./env/extra/${profile}.SAMPLE.yml`)
    }
}