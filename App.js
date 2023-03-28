import React, { useLayoutEffect } from 'react'
import NavContainer from './Navigation'
import { NotifierWrapper } from 'react-native-notifier'

const App = () => {

  return (
    <NotifierWrapper>
      <NavContainer />
    </NotifierWrapper>
  )
}

export default App
