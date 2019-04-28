
const shell = require('shelljs')
const yaml = require('js-yaml')
const fs   = require('fs')
const { extractObject } = require('./lib')

const getConfig = (filePath)=>{
    try {
        return yaml.safeLoad(fs.readFileSync(filePath), 'utf8')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

const genHygenCommand = (configObject, hygenAction)=>{
    let command = `cross-env HYGEN_OVERWRITE=1 hygen env ${hygenAction}`
    extractObject(configObject).forEach(obj=>{
        command += ` --${obj.key} ${obj.val}`
    })
    return command
}

const exec = command=>{
    console.log(`Executing ${command}`)
    if (shell.exec(command).code !== 0) {
        hygen
        shell.exit(1)
        process.exit(1)
    }
}

// Prepare
const environment = process.env.ENV
if (!environment){
    console.error('ENV variable is undefined')
    process.exit(1)
}
const defaultConfig = getConfig(`./env/${environment}.yml`)

// Generate default
console.log('---')
console.log('Generate default environment')
console.log('---')
exec(genHygenCommand(
    defaultConfig, 
    'default'
))

// Generate extra
if (fs.existsSync(`./env/extra/${environment}.yml`)) {
    const extraConfig = getConfig(`./env/extra/${environment}.yml`)
    const combinedConfig = {...defaultConfig, ...extraConfig }
    console.log('---')
    console.log('Found extra environment')
    console.log('---')
    exec(genHygenCommand(
        combinedConfig,
        `extra-${environment}`
    ))
}


exports.default = p=>{
    console.log('xxxx')
}