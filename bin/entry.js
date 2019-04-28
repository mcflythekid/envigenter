#!/usr/bin/env node

const yargs = require('yargs-parser')
const init = require('./init')
//const generate = require('./generate')

const { _ } = yargs(process.argv.slice(2))
const [ initType, profile ] = _

const help = ()=>{
    console.log(`Create new profile:       $ envigentor new   <profile>`)
    console.log(`Create new extra profile: $ envigentor extra <profile>`)
    console.log('Execute a profile:        $ envigentor <profile>')
}

switch(_.length){
    case 1:
        generate(profile)
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
