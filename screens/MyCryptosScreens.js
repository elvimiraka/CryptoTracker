import React, {useState} from 'react';
import {StatusBar,View, StyleSheet, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';

import * as cryptoActions from '../appLogic/actions/cryptos';

import CryptoItem from '../components/cryptoItem';

const MyCryptosScreens = props =>{

    const cryptos = useSelector(state => state.cryptos.userCryptos);
    const dispatch = useDispatch();
    const [fetchDatas, setFetchDatas] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = () => {
        fetch(`https://data.messari.io/api/v1/assets`, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        }).then(response => response.json()).then(data =>{
            setFetchDatas(data.data.filter((crypto, i)=>
            {
               return cryptos.map((current,i)=>{
                    return current.id
                }).includes(crypto.id.toString())
            }
            ))
            setRefreshing(false)
        });
    }
    
    if(fetchDatas){
        return(
            <View style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor='#121212'/>
                <SwipeListView
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={()=>{
                            setRefreshing(true);
                            fetchData();
                        }}
                    />
                }
                data={fetchDatas} 
                keyExtractor={item => item.id} 
                renderItem={item => 
                    <CryptoItem 
                        id={item.item.id}
                        img={`https://messari.io/asset-images/${item.item.id}/128.png`}
                        price={item.item.metrics.market_data.price_usd}
                        name={item.item.name}
                        change={item.item.metrics.market_data.percent_change_usd_last_24_hours}
                        symbol={item.item.symbol}
                        
                    />
                }
                renderHiddenItem={ (itemData, rowMap) => (
                    <TouchableOpacity 
                        onPress={()=>{
                            dispatch(cryptoActions.removeFromMyCryptos(itemData.item.id.toString()));
                            setFetchDatas()
                        }} 
                    >
                        <View style={styles.deleteContainer}>
                            <Ionicons name='ios-trash' size={36} color='red' />
                        </View>
                    </TouchableOpacity>
                )}
                leftOpenValue={50}
                disableLeftSwipe
            />
            
            </View>
            
        )
    } else {
        return(
            <View style={styles.screen}>
                <StatusBar barStyle='light-content' backgroundColor='#121212'/>
                <SwipeListView
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={()=>{
                            setRefreshing(true);
                            fetchData();
                        }}
                    />
                }
                data={cryptos} 
                keyExtractor={item => item.id} 
                renderItem={item => 
                    <CryptoItem 
                        id={item.item.id}
                        img={item.item.imgLogo}
                        price={item.item.price}
                        name={item.item.name}
                        change={item.item.change}
                        symbol={item.item.symbol}
                        
                    />
                }
                renderHiddenItem={ (itemData, rowMap) => (
                    <TouchableOpacity 
                        onPress={()=>{
                            dispatch(cryptoActions.removeFromMyCryptos(itemData.item.id));
                            setFetchDatas()
                        }} 
                    >
                        <View style={styles.deleteContainer}>
                            <Ionicons name='ios-trash' size={36} color='red' />
                        </View>
                    </TouchableOpacity>
                )}
                leftOpenValue={50}
                disableLeftSwipe
            />
            
            </View>
            
        )
    }

    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#121212'
    },
    txt: {
        color: 'white'
    },
    deleteContainer: {
        flexDirection: 'column',
        height: 70,
        marginTop: 5,
        paddingLeft: 20,
        justifyContent: 'center'
    }
})

export default MyCryptosScreens;