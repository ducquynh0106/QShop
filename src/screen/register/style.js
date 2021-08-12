import {ScaledSheet} from "react-native-size-matters";

export default styles=ScaledSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingHorizontal:"16@ms",
        paddingVertical:"16@vs"
    },
    textTitle:{
        fontSize:24,
        fontWeight:"700",
        color:"black",
        letterSpacing:0.5,
        marginTop:"16@vs"
    },
    text:{
        fontSize:14,
        fontWeight:"500",
        color:"gray",
        marginTop:"4@vs",
        marginBottom:"24@vs"
    },
    insWrapper: {
		marginVertical: "16@vs",
		flexDirection: "row",
		alignSelf: "center"
    },
    textAccount:{
        fontSize:14,
        fontWeight:"500",
        color:"gray",
        marginRight:"8@ms"
    },
    highlight: {
        fontWeight:"700",
		textDecorationLine: "underline",
		color: "#44E9E9"
    },
    alert:{
        borderBottomLeftRadius:"52@ms",
        borderTopRightRadius:"52@ms"
    },
    alertTitle:{},
    alertMessage:{
        color:"black",
        fontSize:16,
        marginLeft:"14@ms",
        marginTop:"8@vs"
    },
    alertButton:{
        marginLeft:"160@ms",
        paddingHorizontal:"16@ms",
        paddingVertical:"4@vs",
        borderRadius:"16@ms",
    },
    confirmButtonText:{
        fontSize:14,
        color:"white"
    },
    picker:{
        flexDirection:'row',
        paddingHorizontal:"12@ms",
        paddingVertical:"4@vs",
        justifyContent:"space-between",
        borderWidth:1,
        borderRadius:"8@vs",
        borderColor:"gray",
        marginTop:"16@vs",
    },
    pickerItem:{
        color:"black", 
        width:"100%",
        marginLeft:"60@ms"
    }
})