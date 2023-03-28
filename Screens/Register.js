import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { updateProfile } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uid from "../asyncKey"
import { Notifier, Easing, NotifierComponents } from 'react-native-notifier'
import { addDoc } from 'firebase/firestore'

const Register = () => {

  const [name, setName] = useState((""))
  const [email, setEmail] = useState((""))
  const [password, setPassword] = useState((""))


  const navigation = useNavigation()
  const currentUserId = auth?.currentUser?.uid


  function register() {

    if (!email || !password || !name) {
      Notifier.showNotification({
        title: "Inputs required!",
        componentProps: {
          titleStyle: {
            color: "red",
          },
        },
        showAnimationDuration: 800,
        showEasing: Easing.bounce
      })
    }



    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name
        })
        AsyncStorage.setItem(uid, currentUserId)
        Notifier.showNotification({
          title: 'Account created successfully!',
          description: 'please logIn to get started',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType:"info"
          },
          showAnimationDuration: 800,
          showEasing: Easing.bounce
        })
        navigation.navigate("Login")
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            Notifier.showNotification({
              title: 'Invalid Email!',
              description: 'The request was failed',
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
          case "auth/weak-password":
            Notifier.showNotification({
              title: 'Weak Password',
              description: 'Password should be at least 6 characters',
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
          case "auth/email-already-in-use":
            Notifier.showNotification({
              title: 'Request Failed!',
              description: 'Email already in use',
              Component: NotifierComponents.Alert,
              componentProps: {
                alertType: 'error',
              },
              showAnimationDuration: 800,
              showEasing: Easing.bounce
            })
        }
        console.log(err)
      })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign-up to
        <Text style={{ color: "#4B0082", fontSize: 30 }}> ChatEase</Text>
      </Text>
      <View style={styles.inputContainer}>

        <TextInput
          placeholder='Full Name'
          style={styles.input}
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          placeholder='Password'
          secureTextEntry
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
        />

      </View>

      <TouchableOpacity style={styles.register} onPress={register}>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>Register</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    marginVertical: 20
  },
  input: {
    width: 300,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  register: {
    backgroundColor: "#4B0082",
    paddingVertical: 8,
    paddingHorizontal: 40,
    marginTop: 20
  },
  heading: {
    fontSize: 25,
    fontWeight: "800",
    color: "black"
  }
})
