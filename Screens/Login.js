import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { TextInput, Button } from 'react-native'
import { Image } from "react-native-elements"
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase/config'
import uid from '../asyncKey'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier';


const Login = () => {

  const logoImage = require("../meetme.png")
  const currentUserId = auth?.currentUser?.uid

  const [email, setEmail] = useState("")
  const [password, setPasword] = useState("")
  const navigation = useNavigation()


  const signUp = () => {
    navigation.navigate("Register")
  }


  const login = () => {
    if (!email || !password) {
      Notifier.showNotification({
        title: "Inputs required",
        componentProps: {
          titleStyle: {
            color: "red",
          },
        },
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
      })
    }

    AsyncStorage.setItem(uid, currentUserId)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Notifier.showNotification({
          title: "Login Successful",
          componentProps: {
            titleStyle: {
              color: "green",
            },
          },
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
        })
        navigation.navigate("Home")
      }).catch((err) => {
        console.log(err)
        switch (err.code) {
          case "auth/wrong-password":
            Notifier.showNotification({
              title: "Password Incorrect!",
              componentProps: {
                titleStyle: {
                  color: "red",
                },
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
          case "auth/user-not-found":
            Notifier.showNotification({
              title: 'User not found!',
              description: 'The request was failed',
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
          case "auth/too-many-requests":
            Notifier.showNotification({
              title: 'Too many failed attempts!',
              description: 'Access to this account has been temporarily disabled due to many failed login attempts.Please try again later',
              duration: 0,
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
          case "auth/network-request-failed":
            Notifier.showNotification({
              title: 'ERR_INTERNET_DISCONNECTED',
              description: 'TRY Checking the network cables, modem, and router or Reconnecting to Wi-Fi',
              duration: 0,
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
        }
      })
  }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4B0082" barStyle="light-content" />
      <Image source={logoImage} style={{ width: 80, height: 80 }} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          secureTextEntry
          value={password}
          style={styles.input}
          onChangeText={(text) => setPasword(text)}
        />
      </View>

      <View style={styles.btnContainer}>
        <Button title="Login" style={styles.button} color="#4B0082" onPress={login} />
      </View>
      <TouchableOpacity onPress={signUp}>
        <Text style={styles.signup}>SignUp</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 300,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginVertical: 30
  },
  btnContainer: {
    width: 150,
  },
  signup: {
    fontSize: 15,
    fontWeight: "800",
    color: "#4B0082",
    marginTop: 10
  }
})
