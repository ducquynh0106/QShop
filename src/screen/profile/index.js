import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getAuthField
} from '../../selector/auth'
import {Router} from '../../navigation/route'
import OrderAction from '../../action/order'

 class index extends React.Component{
  render(){
    const {
      user
    }=this.props
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Profile</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
         <View style={styles.information}>
            <View style={{flexDirection:"row"}}>
              {user.Image===""?
                <Image
                 source={require('../../../media/Logo.png')}
                 resizeMethod={"resize"}
                 style={styles.image}
               />
                :
                <Image
                source={{uri:user.Image}}
                resizeMethod={"resize"}
                style={styles.image}
              />
            }
              <View style={styles.viewText}>
                <Text style={styles.textName}>{user.Name}</Text>
                <Text style={styles.textType}>{user.Type}</Text>
              </View>
            </View>
         </View>
         {/* <TouchableOpacity
          style={styles.button}
          onPress={()=>this.props.navigation.navigate(Router.ChangeInformation)}>
           <Text style={styles.textButton}>CHANGE INFORMATION</Text>
         </TouchableOpacity> */}
         <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            this.props.navigation.navigate(Router.MyOrder)
            this.props.getMyOrder(this.props.user);
            }}>
           <Text style={styles.textButton}>MY ORDER</Text>
         </TouchableOpacity>
         <TouchableOpacity
          style={styles.button}
          onPress={()=>this.props.navigation.navigate(Router.ProductManager)}>
           <Text style={styles.textButton}>PRODUCT MANAGEMENT</Text>
         </TouchableOpacity>
         {/* <TouchableOpacity
          style={styles.button}>
           <Text style={styles.textButton}>SIGN OUT</Text>
         </TouchableOpacity> */}
        </ScrollView>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  user:getAuthField(state,"user")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getMyOrder:bindActionCreators(OrderAction.getMyOrder,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);