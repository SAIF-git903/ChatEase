import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uid from '../asyncKey'

const Splash = () => {

    const splashLogo = require("../meetme.png")
    const navigation = useNavigation()

    useEffect(() => {

        setTimeout(() => {
            AsyncStorage.getItem(uid)
                .then((val) => {
                    if (val) {
                        navigation.navigate("Home")
                    } else {
                        navigation.navigate("Login")
                    }
                })
        }, 3000);

    }, [])


    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Image source={splashLogo} style={styles.splashLogo} />
                <Text style={styles.txt}>ChatEase</Text>
            </View>
        </>
    )
}

export default Splash

const styles = StyleSheet.create({
    splashLogo: {
        width: 100,
        height: 100
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    txt: {
        fontSize: 25,
        fontWeight: "700",
        color: "#4B0082"
    }
})
