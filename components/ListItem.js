import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { auth } from '../firebase/config'

const CustonListItem = (props) => {

    const img = require("../meetme.png")
    const navigation = useNavigation()
    const { id, data } = props
    const [messages, setMessages] = useState([])
    const name = auth?.currentUser?.displayName

    // console.log(name, "userName")

    useEffect(() => {
        const ref = collection(db, "chats", id, "messages")
        const q = query(ref, orderBy("timeStamp", "desc"))
        onSnapshot(q, (snapShot) => setMessages(
            snapShot.docs.map((doc) => doc.data())
        ))
    }, [])


    function enterUserChat() {
        navigation.navigate("UserChat", {
            id,
            data,
            name
        })
    }


    return (
        <ListItem bottomDivider
            containerStyle={{ margin: 2 }}
            onPress={enterUserChat}
            underlayColor="none" >
            <Avatar
                rounded
                source={img}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {data}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}>
                    {messages?.[0]?.displayName} : {messages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustonListItem

const styles = StyleSheet.create({})