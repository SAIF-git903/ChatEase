import { StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../firebase/config'
import { Button } from 'react-native-elements'
import { collection, addDoc } from 'firebase/firestore'



import Feather from "react-native-vector-icons/Feather"

const NewChat = () => {

  const navigation = useNavigation()
  const [group, setNewGroup] = useState("")


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Add new Group",
    })
  }, [])

  function createGroup() {
    const ref = collection(db, "chats")
    addDoc(ref, { chatName: group })
      .then(() => navigation.goBack())
      .catch((error) => console.log(error))
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Chat Name'
        style={styles.input}
        autoFocus={true}
        onChangeText={(text) => setNewGroup(text)}
      />
      <View style={{marginTop: 20}}>
        <Button
          title="Add new Group"
          onPress={createGroup}
          icon={<Feather name='plus' size={20} color="white" />}
        />
      </View>
    </View>
  )
}

export default NewChat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  input: {
    width: 300,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
})
