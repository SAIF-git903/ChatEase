import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { DefaultTheme, useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"
import { collection, doc, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../firebase/config'


const UserChat = (props) => {

    const { route } = props
    const { id, data, name } = route.params
    const navigation = useNavigation()
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])



    useLayoutEffect(() => {
        navigation.setOptions({

            backgroundColor: "red",
            headerLeft: () => (
                <View style={{ marginRight: 20 }}>
                    <Avatar rounded source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg/341px-Convex_lens_%28magnifying_glass%29_and_upside-down_image.jpg" }} />
                </View>
            ),
            headerTitle: () => (
                <View>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>{data}</Text>
                </View>
            )
        })
    }, [])


    function sendMessage() {

        if (!input) return
        Keyboard.dismiss()
        setInput("")
        const ref = collection(db, "chats", id, "messages")
        addDoc(ref, {
            timeStamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
    }


    useLayoutEffect(() => {

        const ref = collection(db, "chats", id, "messages")
        const q = query(ref, orderBy("timeStamp", "asc"))
        onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

    }, [])

    console.log(name, "from user chat")

    return (
        <>
            <ScrollView>
                <View style={{ height: 30 }}></View>
                {messages.map(({ id, data }) =>
                    data.email === auth.currentUser.email ?
                        (
                            <>
                                <View key={id}>
                                    <View style={styles.receiver}>
                                        <Text style={{ fontSize: 15, color: "black" }}>{data.message}</Text>
                                        {/* <Text style={styles.receiverName}>{name}</Text> */}
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View key={id}>
                                <Text style={styles.sender}>{data.message}</Text>
                            </View>
                        )
                )}
            </ScrollView>
            <View style={{ flexDirection: "row", marginBottom: 5, }}>
                <TextInput
                    placeholder='Message'
                    style={styles.input}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity onPress={sendMessage} >
                    <View style={{ borderColor: "#4B0082", borderWidth: 10, borderRadius: 30 }}>
                        <Ionicons name='send' size={25} color="white" style={styles.sendIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default UserChat

const styles = StyleSheet.create({
    input: {
        width: 290,
        borderRadius: 30,
        backgroundColor: "#eee",
        paddingLeft: 20,
        fontSize: 15,
        marginHorizontal: 10
    },
    sendIcon: {
        backgroundColor: "#4B0082",
    },
    receiver: {
        backgroundColor: "#D8BFD8",
        alignSelf: "flex-end",
        marginRight: 15,
        maxWidth: "80%",
        marginTop: 3,
        paddingLeft: 8,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    sender: {
        backgroundColor: "#eee",
        alignSelf: "flex-start",
        marginLeft: 15,
        maxWidth: "80%",
        marginTop: 3,
        paddingLeft: 8,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        fontSize: 15,
        color: "black",
    },
    receiverName: {
        fontFamily: "serif"
    }
})

