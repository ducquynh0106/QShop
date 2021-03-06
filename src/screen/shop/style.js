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
        marginLeft:"102@ms"
    },
    searchIcon:{
        marginLeft:"72@ms",
        marginTop:"4@vs"
    },
    shopIcon:{
        marginLeft:"8@ms",
        marginTop:"4@vs"
    },
    scrollView:{
        paddingHorizontal:"12@ms",
        paddingVertical:"24@vs",
        height:"80%"
    },
    viewShop:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
    },
    imageShop:{
        width:"72@ms",
        height:"72@ms",
        borderRadius:"36@ms",
        backgroundColor:"gray",
        marginLeft:"16@ms"
    },
    viewText:{
        justifyContent:"center",
        marginLeft:"48@ms",
    },
    textName:{
        fontSize:16,
        fontWeight:"bold",
        textAlign:"center"
    },
    phoneIcon:{
        marginTop:"4@vs"
    },
    location:{
        flexWrap:"wrap",
        fontSize:14,
        fontWeight:"bold",
        alignSelf:"center",
        color:"gray",
    },
    viewCategory:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
        marginTop:"16@vs",
        marginBottom:"16@vs" 
    },
    categories:{
        fontSize:16,
        fontWeight:"bold",
        color:"#FF9D0B"
    },
    viewProduct:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
        marginBottom:"32@vs"
    },
    image:{
        width:"96@ms",
        height:"96@ms",  
    },
    categoryName:{
        flexWrap:"wrap",
        fontSize:16,
        fontWeight:"bold",
        alignSelf:"center"
    },
    price:{
        flexWrap:"wrap",
        fontSize:16,
        fontWeight:"bold",
        alignSelf:"center",
        color:"#FF9D0B",
    },
})