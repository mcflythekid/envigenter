#!/usr/bin/env node

const yargs = require('yargs-parser')
const init = require('./init')
const generate = require('./generate')
const packageJson = require('../package.json')

const { _ } = yargs(process.argv.slice(2))
const [ initType, profile ] = _

const help = ()=>{
    console.log("Envigenter  v" + packageJson.version)
    console.log(`Create new profile:       $ envigenter new   <profile>`)
    console.log(`Create new extra profile: $ envigenter extra <profile>`)
    console.log('Execute a profile:        $ envigenter <profile>')
}

switch(_.length){
    case 1:
        generate(_[0])
        break
    case 2:
        if (['new', 'extra'].indexOf(initType) >= 0){
            init(initType, profile)
        } else {
            help()
        }
        break
    default:
        help()
}
