import React, { useState} from 'react';
import {Text,View, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';


import * as cryptoActions from '../appLogic/actions/cryptos';



const AddCryptos = props =>{

    const [cryptos, setCryptos] = useState([]);
    const [searchedCrypted, setSearchedCryptos] = useState([]);
    const [viewAll, setViewAll] = useState(false);

    const dispatch = useDispatch();

    const changeSearchedCryptos = (value) => {
        if(value.length > 0){
            setSearchedCryptos(
                cryptos.filter((crypto, index) => crypto.slug.includes(value.toLowerCase()))
            )
        } else {
            setSearchedCryptos([])
        }
    }

    const viewAllChange = () => {
        if(viewAll){
            setViewAll(false)
        } else {
            setViewAll(true)
        }
    }

    if(cryptos.length === 0){
        fetch(`https://data.messari.io/api/v1/assets`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        }).then(response => response.json()).then(data =>{
            setCryptos(data.data)
        });
    }
    return(
        <View style={styles.screen}>
            <View style={styles.searchesContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => changeSearchedCryptos(text)}
                    onFocus={()=>setViewAll(false)}
                />
                <TouchableOpacity onPress={viewAllChange}>
                    <Text style={styles.all}>All</Text>
                </TouchableOpacity>
            </View>
            
            <SwipeListView
                data={viewAll?cryptos:searchedCrypted}
                keyExtractor={item => item.id}
                renderItem={item =>
                    <View style={styles.itemCard}>
                        <Text style={styles.itemSymbol}>{item.item.symbol}</Text>
                        <Text style={styles.itemName}>{item.item.slug}</Text>
                    </View>
                }
                renderHiddenItem={ (itemData, rowMap) => (
                    <TouchableOpacity 
                        onPress={()=>{
                            Alert.alert('Success', `${itemData.item.slug} added to my cryptos`, [{text: 'Ok', style: 'destructive'}])
                            dispatch(cryptoActions.addToMyCryptos(itemData.item));
                        }} 
                        activeOpacity={0.5}
                    >
                        <View style={styles.addContainer}>
                            <Text style={styles.addText}>ADD</Text>
                        </View>
                    </TouchableOpacity>
                )}
                rightOpenValue={-50}
                disableRightSwipe
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#121212'
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white',
        fontSize: 18,
        width: '70%'
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#121212',
        alignItems: 'center',
        marginVertical: 10,
        paddingLeft: 10,
        paddingRight: '30%',
        paddingVertical: 10,
        marginHorizontal: 10
    },
    itemName: {
        color: '#ededed',
        fontSize: 20,
        width: '60%'
    },
    itemSymbol: {
        color: '#ededed',
        fontSize: 20,
        fontWeight: 'bold'
    }, 
    addContainer: {
        flexDirection: 'column',
        height: 60,
        marginTop: 5,
        paddingLeft: '87%',
        justifyContent: 'center',
    },
    addText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1
    },
    searchesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginVertical: 20
    },
    all: {
        color: 'white',
        fontSize: 18,
    }
})

export default AddCryptos;