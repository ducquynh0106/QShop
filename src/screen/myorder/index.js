import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getCategoriesField
} from '../../selector/categories'
import CategoriesAction from '../../action/categories'
import OrderAction from '../../action/order'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  getOrderField
} from '../../selector/order'
import {
  getAuthField
} from '../../selector/auth'

class index extends Component{
  
  componentWillMount(){
    this.props.getMyOrder(this.props.user);
  }
  componentDidMount(){
    this.props.getMyOrder(this.props.user);
  }
  renderCategory=({category})=>{
    return(
      <TouchableOpacity
        onPress={()=>{
          this.props.changeField("selectCategory","")
          this.props.navigation.navigate(Router.ManagerDetail,{UID_Parent:category.UID_Cat})
        }}
        key={category.UID_Cat}
        style={styles.button}>
        <Image
          source={{uri:category.Image}}
          resizeMethod={"resize"}
          style={styles.image}
        />
      <Text style={styles.categoryName}>{category.Name}</Text>
    </TouchableOpacity>
    )
  }

  render(){
    const {
      myorder
    }=this.props
    console.log(myorder)
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={32}
              color={"#FF9D0B"}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>My Order</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
            {
              myorder!=[]&&
                myorder.map(order=>{
                  return(
                    <TouchableOpacity
                      onPress={()=>this.props.navigation.navigate(Router.OrderDetail,{orderdetail:order})}
                     style={styles.viewCategory}>
                     <Text style={styles.categories}>Name Customer:    
                       <Text> {order.NameCustomer}</Text>
                     </Text>
                     <Text style={styles.categories}>PhoneNumber:    
                       <Text> {order.PhoneNumber}</Text>
                     </Text>
                     <Text style={styles.categories}>Address:    
                       <Text> {order.Address}</Text>
                     </Text>
                     <Text style={styles.categories}>Name Store:    
                       <Text> {order.Name_Store}</Text>
                     </Text>
                     <Text style={styles.categories}>Time:    
                       <Text> {order.Time}</Text>
                     </Text>
                   </TouchableOpacity>
                  )
                })
            }
           
        </ScrollView>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  categories:getCategoriesField(state,"categories"),
  myorder:getOrderField(state,'myorder'),
  user:getAuthField(state,"user"),
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getCategories:bindActionCreators(CategoriesAction.getCategories,dispatch),
      changeField:bindActionCreators(CategoriesAction.changeField,dispatch),
      getMyOrder:bindActionCreators(OrderAction.getMyOrder,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);