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
        marginLeft:"86@ms"
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
    viewCategory:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",  
        marginBottom:"8@vs" 
    },
    viewShop:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
        marginTop:"16@vs",
        marginBottom:"44@vs"
    },
    categories:{
        fontSize:20,
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
    buttonShop:{
        borderWidth:1,
        borderRadius:"8@ms",
        borderColor:"gray",
        padding:"12@ms",
        width:"156@vs",
        height:"144@vs",
        marginTop:"12@vs",
        marginLeft:"24@ms"
    },
    imageShop:{
        width:"80@ms",
        height:"64@ms",
        alignSelf:"center"  
    },
    location:{
        flexWrap:"wrap",
        fontSize:14,
        fontWeight:"bold",
        alignSelf:"center",
        color:"gray",
    },

    buttonCart:{
        justifyContent:"center",
        backgroundColor:"green",
        alignItems:"center",
        marginHorizontal:"10@ms",
        borderRadius:"8@ms",
        paddingVertical:"8@vs"
    },
    textCart:{
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    },

    textorder:{
        color:"black",
        fontSize:16,
        fontWeight:"bold"
    },
    delivery:{
        flexWrap:"wrap",
        fontSize:18,
        fontWeight:"bold",
        color:"#FF9D0B",
    },
    productmap:{
        flexDirection:"row",
        justifyContent:"space-between",
        borderWidth:1,
        borderRadius:"8@ms",
        paddingHorizontal:"8@ms",
        paddingVertical:"8@vs",
        marginBottom:"8@vs"
    },
    textProduct:{
        fontSize:16,
        color:"black",
        fontWeight:"bold",
    },
    buttonAdd:{
        borderRadius:"12@ms",
        paddingHorizontal:"12@ms",
        backgroundColor:"green",
    },
    viewProduct:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
        marginBottom:"32@vs"
    },
    price:{
        flexWrap:"wrap",
        fontSize:16,
        fontWeight:"bold",
        alignSelf:"center",
        color:"#FF9D0B",
    },
    bottomView:{
        backgroundColor:"white",
        paddingVertical:"8@vs",
        borderWidth:1,
        borderRadius:"8@ms",
        borderColor:"#FF9D0B",
        marginHorizontal:"10@ms",
        marginVertical:"8@ms"
    },
    direct:{
        flexDirection:"row",
        marginLeft:"12@ms"
        
    },
    directText:{
      alignSelf:"center",
      flexWrap:"wrap",
      fontSize:16,
      fontWeight:"bold",   
    },
    label:{
        fontSize:16,
        color:"#FF9D0B",
        fontWeight:"bold",
    },
    Total:{
        flexWrap:"wrap",
        fontSize:16,
        fontWeight:"bold",
        marginLeft:"12@ms"
    },
    bottombutton:{
        flexDirection:"row", 
        justifyContent:"space-between",
        marginBottom:"8@vs",
        marginHorizontal:"8@ms"
      
    },
    cancelbutton:{
        backgroundColor:"red",
        width:"40%",
        height:"48@vs",
        borderRadius:"24@vs",
        alignItems:"center",
        justifyContent:"center"
    },
    addbutton:{
        backgroundColor:"green",
        width:"40%",
        height:"48@vs",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:"24@vs",
    },
    cancel:{
        color:"white",
        fontSize:16
    },
    add:{
        color:"white",
        fontSize:16
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
})