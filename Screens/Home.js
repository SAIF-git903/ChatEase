import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustonListItem from '../components/ListItem'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import { PermissionsAndroid } from 'react-native'
import { launchImageLibrary, launchCamera } from "react-native-image-picker"
import { collection, onSnapshot } from "firebase/firestore"
import { db, auth } from "../firebase/config"
import AsyncStorage from '@react-native-async-storage/async-storage'


const Home = () => {
  const [chats, setChats] = useState([])

  const img = require("../meetme.png")
  const navigation = useNavigation()

  async function imagePickerFromGallery() {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        launchCamera(options, (response) => {
          console.log(response)
        })
      } else {
        console.log("Camera permission denied");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const ref = collection(db, "chats")
    onSnapshot(ref, (snapShot) => {
      setChats(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()?.chatName
        }))
      )
    })
  }, [])


  function logout() {
    AsyncStorage.clear()
      .then(() => navigation.navigate("Login"))
      .catch((err) => console.log(err))
  }

  console.log(chats, "///////////////")

  useLayoutEffect(() => {

    navigation.setOptions({
      headerLeft: () => false,
      headerRight: () => (
        <>
          {/* <TouchableOpacity onPress={imagePickerFromGallery} style={{ marginHorizontal: 10 }}>
            <Feather name='camera' size={22} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("NewChat")}>
            <Entypo name='new-message' size={22} color="white" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={logout}>
            <AntDesign name='logout' size={22} color="white" style={{ marginHorizontal: 5 }} />
          </TouchableOpacity>
        </>
      ),
    })

  }, [])

  console.log(chats)


  return (
    <>
      <StatusBar backgroundColor="#4B0082" barStyle="light-content" />
      <SafeAreaView>
        <ScrollView>
          {
            chats.map(({ id, data }) => (
              <CustonListItem id={id} data={data} key={id} />
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({})
