const _ = require('lodash')
const shell = require('shelljs')
const yargs = require('yargs-parser')

/**
 * Install package globally
 */
exports.installGlobalPackage = packages=>{
    yargs(packages)._.forEach(package=>{
        if (!shell.which(package)){
            exec(`npm i ${package} -g`)
        }
    })
}

/**
 * Execute shell command, exit process if has error
 */
exports.exec = cmd=>{
    console.log(`Executing: ${cmd}`)
    const code = shell.exec(cmd).code
    if (code !== 0) {
        shell.echo(`Execution failed with code: ${code}`)
        shell.exit(code)
    }
}

/**
 * Convert object to array
 * {a: {b: 'c'}} => [{key: 'a.b', val: 'c'}]
 */
exports.extractObject = (obj) =>{
    function findPropPaths(obj, predicate) {  // The function 
        const discoveredObjects = []; // For checking for cyclic object
        const path = [];    // The current path being searched
        const results = []; // The array of paths that satify the predicate === true
        if (!obj && (typeof obj !== "object" || Array.isArray(obj))) {
            throw new TypeError("First argument of finPropPath is not the correct type Object");
        }
        if (typeof predicate !== "function") {
            throw new TypeError("Predicate is not a function");
        }
        (function find(obj) {
            for (const key of Object.keys(obj)) {  // use only enumrable own properties.
                if (predicate(key, path, obj) === true) {     // Found a path
                    path.push(key);                // push the key
                    results.push(path.join("."));  // Add the found path to results
                    path.pop();                    // remove the key.
                }
                const o = obj[key];                 // The next object to be searched
                if (o && typeof o === "object" && ! Array.isArray(o)) {   // check for null then type object
                    if (! discoveredObjects.find(obj => obj === o)) {  // check for cyclic link
                        path.push(key);
                        discoveredObjects.push(o);
                        find(o);
                        path.pop();
                    }
                }
            }
        } (obj));
        return results;
    }
    
    function findAllSub(obj){
        return findPropPaths(obj,(key, path, obj) => {
            return typeof obj[key] != "object";
        })
    }

    let x = []
    let keyStrings = findAllSub(obj)
    keyStrings.forEach(path=>{
        x.push({
            key: path,
            val: _.get(obj, path)
        })
    })
    return x
}

/**
 * Load YML file to object
 */
exports.loadYml = filePath=>{
    try {
        return yaml.safeLoad(fs.readFileSync(filePath), 'utf8')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
