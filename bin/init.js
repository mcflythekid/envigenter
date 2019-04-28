const { exec, installGlobalPackage } = require('./lib')
const fs = require('fs')

const runHygenEnvigenter = (path, action)=>{
    const notExists = path=>{
        if (fs.existsSync(path)){
            console.error(`Skipped: ${path}`)
            return false
        }
        return true
    }
    if (notExists(path)){
        exec(`cross-env HYGEN_OVERWRITE=1 hygen envigenter ${action}`)
    }
}

const installHygenAddPlugin = (repo)=>{
    if (!fs.existsSync('_templates/envigenter')){
        exec(`hygen-add ${repo} --name envigenter`)
    }
}

const defaultInstaller = (obj=>{
    const installProfile = profile=>{
        runHygenEnvigenter(`env/${profile}.env.yml`, `profile --profile ${profile}`)
    }
    const installTemplate = ()=>{
        runHygenEnvigenter(`env/_template.yml`, 'template')
    }
    const installHygen = ()=>{
        runHygenEnvigenter('_templates/env/default/hello.ejs.t', 'hygen')
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
        runHygenEnvigenter(`env/extra/${profile}.env.yml`, `extra-profile --profile ${profile}`)
    }
    const installTemplate = profile=>{
        runHygenEnvigenter(`env/extra/_template.${profile}.yml`, `extra-template --profile ${profile}`)
    }
    const installHygen = profile=>{
        runHygenEnvigenter(`_templates/env/extra-${profile}/hello.ejs.t`, `extra-hygen --profile ${profile}`)
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
    installHygenAddPlugin('https://github.com/mcflythekid/envigenter')
    defaultInstaller.install(profile)
    if (initType === 'extra'){
        extraInstaller.install(profile)
    }
}
