export const ADD_TO_MYCRYPTOS = 'ADD_TO_MYCRYPTOS';
export const REMOVE_FROM_MYCRYPTOS = 'REMOVE_FROM_MYCRYPTOS';


export const addToMyCryptos = crypto => {
    return {type: ADD_TO_MYCRYPTOS, crypto: crypto}
}

export const removeFromMyCryptos = cryptoId => {
    return {type: REMOVE_FROM_MYCRYPTOS, cryptoId: cryptoId}
}