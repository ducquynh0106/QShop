import React from 'react'
import LottieView from 'lottie-react-native'
import {
  View,
  Text
} from 'react-native'
import styles from './style'
import {Router} from '../../navigation/route'
import CategoriesAction from '../../action/categories'
import ProductAction from '../../action/product'
import ShopAction from '../../action/shop'
import CartAction from '../../action/cart'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class index extends React.Component{
  returnLottie(){
    return(
      <LottieView
        source={require('../../../media/SplashScreen.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    )
  }

  componentDidMount(){
    this.props.getCategories();
    this.props.getCategory();
    this.props.getProduct();
    this.props.getShops();
    this.props.getCart();
  }
  render(){
    setTimeout(()=>{
      this.props.navigation.navigate(Router.Auth)
    },4500)
    return(
     <View style={styles.container}>
       {this.returnLottie()}
       <Text style={styles.textTitle}>
          Welcome to QShop
       </Text>
     </View>
    ) 
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getCategories:bindActionCreators(CategoriesAction.getCategories,dispatch),
      getCategory:bindActionCreators(CategoriesAction.getCategory,dispatch),
      getProduct:bindActionCreators(ProductAction.getProduct,dispatch),
      getShops:bindActionCreators(ShopAction.getShops,dispatch),
      getCart:bindActionCreators(CartAction.getCart,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);