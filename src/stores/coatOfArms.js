import stateCodes from './stateCodes.json';

const coatOfArms = {}

for (let stateCode of stateCodes){
    coatOfArms[stateCode] = `static/coat-of-arms/${stateCode}.svg`
}

export default coatOfArms