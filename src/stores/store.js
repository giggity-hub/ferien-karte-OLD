import {writable} from 'svelte/store';
import stateCodes from './stateCodes.json'

function objectFromKeys(keys, initialValue){
    return keys.reduce((obj, key) => {
        obj[key] = initialValue;
        return obj
    }, {})
}

function createVacationStore(){
    const {subscribe, set, update} = writable(objectFromKeys(stateCodes, null))

    const setActiveVacation = (stateCode, value) => {
        update(activeVacations => {
            activeVacations[stateCode] = value
            return Object.assign({}, activeVacations)
        })
    }

    return {
        subscribe,
        setActiveVacation
    }
}




export const store = createVacationStore();


function createSelectedState(){
    const {subscribe, set} = writable(null)

    return {
        subscribe,
        set,
        reset : () => set(null)
    }
}

// show which state is being hovered
export const selectedState = createSelectedState()