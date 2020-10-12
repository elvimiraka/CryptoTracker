
import {ADD_TO_MYCRYPTOS, REMOVE_FROM_MYCRYPTOS} from '../actions/cryptos';
import Crypto from '../../models/Crypto';

const initialState = {
    userCryptos: [],
};

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_MYCRYPTOS:
            const addedCrypto = action.crypto;
            const myCryptos = state.userCryptos.filter((crypto, i)=> crypto.id === addedCrypto.id);
            if(myCryptos.length > 0){
                console.log("Ky objekt ndodhet");
                return state;
            } else {
                const newCryptoItem = new Crypto(
                    addedCrypto.id,
                    `https://messari.io/asset-images/${addedCrypto.id}/128.png`,
                    addedCrypto.name,
                    addedCrypto.symbol,
                    addedCrypto.metrics.market_data.price_usd,
                    addedCrypto.metrics.market_data.percent_change_usd_last_24_hours
                );
                
                return {...state, userCryptos: state.userCryptos.concat(newCryptoItem)}
            }
        case REMOVE_FROM_MYCRYPTOS:
            const removedCryptoId = action.cryptoId;
            return {...state, userCryptos: state.userCryptos.filter((crypto,i)=> crypto.id !== removedCryptoId)}
        default: return state
    }
}