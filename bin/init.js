const { exec } = require('./lib')
const shell = require('shelljs')
const fs   = require('fs')
const yargs = require('yargs-parser')

const installGlobalPackage = packages=>{
    yargs(packages)._.forEach(package=>{
        if (!shell.which(package)){
            exec(`npm i ${package} -g`)
        }
    })
}

const runHygenEnvigentor = (path, action)=>{
    const notExists = path=>{
        if (fs.existsSync(path)){
            console.error(`Skipped: ${path}`)
            return false
        }
        return true
    }
    if (notExists(path)){
        exec(`cross-env HYGEN_OVERWRITE=1 hygen envigentor ${action}`)
    }
}

const defaultInstaller = (obj=>{
    const installProfile = profile=>{
        runHygenEnvigentor(`env/${profile}.env.yml`, `profile --profile ${profile}`)
    }
    const installTemplate = ()=>{
        runHygenEnvigentor(`env/_template.yml`, 'template')
    }
    const installHygen = ()=>{
        runHygenEnvigentor('_templates/env/default/hello.ejs.t', 'hygen')
    }
    obj.install = profile=>{
        installTemplate()
        installHygen()
        installProfile(profile)
    }
    return obj
})({})

const extraInstaller = (obj=>{
    const installProfile = profile=>{
        runHygenEnvigentor(`env/extra/${profile}.env.yml`, `extra-profile --profile ${profile}`)
    }
    const installTemplate = profile=>{
        runHygenEnvigentor(`env/extra/_template.${profile}.yml`, `extra-template --profile ${profile}`)
    }
    const installHygen = profile=>{
        runHygenEnvigentor(`_templates/env/extra-${profile}/hello.ejs.t`, `extra-hygen --profile ${profile}`)
    }
    obj.install = profile=>{
        installProfile(profile)
        installTemplate(profile)
        installHygen(profile)
    }
    return obj
})({})
    
module.exports = (initType, profile)=>{
    installGlobalPackage('hygen hygen-add cross-env')
   // exec('hygen-add envigentor')
    defaultInstaller.install(profile)
    if (initType === 'extra'){
        extraInstaller.install(profile)
    }
}
