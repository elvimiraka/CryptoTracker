import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';


const CryptoItem = props => {
    
    return(
        <View style={styles.itemCard}>
            <View style={styles.imgContainer}>
                <Image style={styles.icon} source={{uri: props.img}} />
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.texts}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.symbol}>{props.symbol}</Text>
                </View>
                <View style={styles.prices}>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    <Text 
                        style={
                            props.change > 0?
                            styles.changeGreen
                            :styles.changeRed
                        }
                    >
                        {props.change.toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    )  
}

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 2
    },
    detailsContainer: {
        width: '86%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30
    },
    imgContainer: {
        width: 50,
        height: 50,
        overflow: 'hidden'
    },
    icon: {
        width: '100%',
        height: '100%'
    },
    texts: {
        width: '40%'
    },
    prices: {
        width: '30%',
        alignItems: 'center'
    },
    name: {
        fontSize: 15,
        color: 'white'
    },
    symbol: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
    price: {
        fontSize: 15,
        color: 'white'
    },
    changeRed: {
        color: 'red',
        fontSize: 14
    },
    changeGreen: {
        color: '#2fff00',
        fontSize: 14
    }
})

export default CryptoItem;