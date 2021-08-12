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
        marginLeft:"72@ms"
    },
    scrollView:{
        paddingHorizontal:"12@ms",
        paddingVertical:"24@vs",
        backgroundColor:"white",
        
    },
    viewCategory:{
        backgroundColor:"white",
        borderRadius:"8@ms",
        padding:"12@ms",
    
    },
    panel: {
        padding: "20@ms",
        backgroundColor: '#FFFFFF',
        paddingTop: "10@vs",
    },
    headerPanel: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: "20@vs",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: "40@ms",
        height: "8@vs",
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: "10@vs",
    },
    panelTitle: {
        fontSize: 27,
        height: "35@vs",
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: "30@vs",
        marginBottom: "10@vs",
    },
    panelButton: {
        padding: "16@ms",
        borderRadius: 10,
        backgroundColor: '#FF9D0B',
        alignItems: 'center',
        marginVertical: "8@vs",
    },
    panelButtonTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonUp:{
        borderWidth:2,
        borderRadius:"12@ms",
        padding:"8@ms",
        marginTop:"8@vs",
        alignItems:"center",
    },
    textUp:{
        fontSize:14,
        fontWeight:"bold",
    },
    image:{
        width:"120@ms",
        height:"120@ms",
        alignSelf:"center"
    },
    customInput:{
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
    label:{
        fontSize:16,
        color:"black",
    },
    customCategory:{
        flexDirection:'row',
        borderWidth:1,
        borderRadius:"8@vs",
        paddingHorizontal:"12@ms",
        paddingVertical:"18@vs",
        alignItems:'center',
        borderColor:"gray",
        marginTop:"16@vs",
        justifyContent:"space-between"
    },
    bottombutton:{
        flexDirection:"row", 
        justifyContent:"space-between",
        marginBottom:"48@vs",
        marginTop:"20@vs"
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