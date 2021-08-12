import React, {Component} from 'react'
import store from './src/store'
import {Provider as StoreProvider} from 'react-redux'
import AppNavigator from './src/navigation/index'

export default class App extends Component{
  render(){
    return(
      <StoreProvider store={store}>
        <AppNavigator/>
      </StoreProvider>
    )
  }
}
