// delete cache for these json files so that they are fresh
delete require.cache[require.resolve('../botConfig.json')]
delete require.cache[require.resolve('../defaultBotConfig.json')]
const botConfig: any = require('../botConfig.json')
const defaultBotConfig: any = require( '../defaultBotConfig.json')

export default function configGenerator(config: any = botConfig, defaultConfig: any = defaultBotConfig) {
  const leaves = getLeaves(config);
  const derivedConfig = Object.assign({}, defaultConfig);
  applyLeaves(leaves, derivedConfig);

  return derivedConfig
}

type LeafPrimative = number | bigint | string | boolean | null | LeafPrimative[]
type Leaf = {
  keys: (number | string)[],
  value: LeafPrimative
}

const getLeaves = (obj: any, keys: (number | string)[] = [], leaves: Leaf[] = []) => {
  Object.keys(obj).forEach( key => {
    if (typeof obj[key] !== 'object' || Array.isArray(obj[key])) {
      leaves.push( {
          keys: [...keys, key],
          value: obj[key]
        })
    } else {
      getLeaves(obj[key], [...keys, key], leaves)
    }
  })

  return leaves
}

const applyLeaves = (leaves: Leaf[], config: any) => {
  leaves.forEach(leaf => {
    let h = config
    leaf.keys.slice(0,-1).forEach( key => {
      h = h[key]
    })
    h[leaf.keys[leaf.keys.length -1]] = leaf.value
  })
}

export { getLeaves }
