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
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'

class index extends Component{
  componentDidMount(){
    this.props.getCategories()   
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
      categories
    }=this.props
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
          <Text style={styles.textHeader}>Product Manager</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
            <View style={styles.viewCategory}>
              <Text style={styles.categories}>CATEGORIES</Text>
              <View style={styles.listCategories}>
                {categories.map(category=>this.renderCategory({category}))}
              </View>
            </View>
        </ScrollView>
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  categories:getCategoriesField(state,"categories")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getCategories:bindActionCreators(CategoriesAction.getCategories,dispatch),
      changeField:bindActionCreators(CategoriesAction.changeField,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);