import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text
} from 'react-native'
import {ScaledSheet} from "react-native-size-matters";
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from "prop-types"

export default class CustomInput extends  Component{
    static propsTypes={
        textButton:PropTypes.string,
    }
    render(){
        const{
            containerButton,
            textButton,
            colorGradientButton,
            colorButton,
            onPress
        }= this.props
        return(
            <TouchableOpacity 
              style={styles.Button}
              onPress={onPress}
              
            >
                <LinearGradient
                    colors={[colorGradientButton||'#FA965E',colorButton||'#F3E031']}
                    style={containerButton||styles.defaultButton}
                >
                    <Text style={styles.textButton}>
                        {textButton}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )   
    }
}

const styles=ScaledSheet.create({
    Button:{
        marginTop:"12@vs",
    },
    defaultButton:{
        borderRadius:"16@vs",
        alignItems:"center",
    },
    textButton:{
        color:"white",
        fontWeight:"700",
        fontSize:16,
        paddingVertical:"8@vs", 
    }
})