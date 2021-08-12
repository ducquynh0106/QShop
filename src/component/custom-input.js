import React, { Component } from 'react'
import {
    TextInput,
    View,
    Text
} from 'react-native'
import {ScaledSheet} from "react-native-size-matters";
import PropTypes from "prop-types"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class CustomInput extends  Component{
    static propsTypes={
        label:PropTypes.string,
        iconName:PropTypes.string,
        errorText:PropTypes.string
    }
    render(){
        const{
            label,
            iconName,
            errorText,
            ...props
        }= this.props
        return(
            <View>
                <View
                    style={styles.container}
                >
                    <TextInput
                        {...props}
                        placeholder={label}
                        style={styles.text}
                        placeholderTextColor={"gray"}

                    />
                    <MaterialIcons 
                        name={iconName} 
                        size={20} 
                        color={"#F26A1B"} 
                    />
                </View>
                {errorText !=="" &&(
                    <Text 
                        style={{
                            marginTop: 4,
							marginLeft: 16,
							fontStyle: "italic",
							color:"red"
                        }}
                    >
                        {errorText}
                    </Text>
                )}
            </View>
        )   
    }
}

const styles=ScaledSheet.create({
    container:{
        flexDirection:'row',
        borderWidth:1,
        borderRadius:"8@vs",
        paddingHorizontal:"12@ms",
        paddingVertical:"4@vs",
        alignItems:'center',
        borderColor:"gray",
        marginTop:"16@vs",
        justifyContent:"space-between"
    },
    text:{
        color:"black",
        fontSize:14
    }
})