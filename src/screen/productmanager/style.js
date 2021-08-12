import {ScaledSheet} from "react-native-size-matters";

export default styles=ScaledSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f2f2f2",
    },
    header:{
        flexDirection:"row",
        backgroundColor:"white",
        padding:"12@ms"
    },
    textHeader:{
        fontSize:24,
        fontWeight:"600",
        letterSpacing:1,
        color:"#FF9D0B",
        marginLeft:"44@ms"
    },
    scrollView:{
        paddingHorizontal:"12@ms",
        paddingVertical:"24@vs",
        height:"80%"
    },
    viewCategory:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
        
    },
    categories:{
        fontSize:16,
        fontWeight:"bold",
        color:"#FF9D0B"
    },
    listCategories:{
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-evenly"
    },
    button:{
        borderWidth:1,
        borderRadius:"8@ms",
        borderColor:"gray",
        padding:"12@ms",
        width:"140@vs",
        height:"112@vs",
        marginTop:"24@vs"
    },
    categoryName:{
        flexWrap:"wrap",
        fontSize:16,
        fontWeight:"bold",
        alignSelf:"center"
    },
    image:{
        width:"64@ms",
        height:"56@ms",
        alignSelf:"center"
        
    },
})