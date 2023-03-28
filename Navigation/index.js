import React from 'react'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import Home from '../Screens/Home'
import Splash from '../Screens/Splash'
import NewChat from "../Screens/NewChat"
import UserChat from '../Screens/UserChat'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()


const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "white"
    }
}


const NavContainer = () => {

    return (
        <>
            <NavigationContainer theme={myTheme}>
                <Stack.Navigator screenOptions={{
                    
                    headerStyle: { backgroundColor: "#4B0082" },
                    headerTintColor: "white",
                    headerTitleAlign: "center"
                }}>
                    <Stack.Screen name='Splash' component={Splash} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name='Login' component={Login}
                        options={{
                            headerLeft: () => false
                        }}
                    />
                    <Stack.Screen name='Register' component={Register} />
                    <Stack.Screen name='Home' component={Home} options={{
                        title: "ChatEase",
                        headerTitleAlign: "left",
                    }} />
                    <Stack.Screen name='NewChat' component={NewChat} />
                    <Stack.Screen name='UserChat' component={UserChat} options={{
                        headerTitleAlign: "left",
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default NavContainer
