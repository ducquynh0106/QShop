import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  getCategoriesField
} from '../../selector/categories'
import {
  getProductField
} from '../../selector/product'
import {
  getAuthField
} from '../../selector/auth'
import CategoriesAction from '../../action/categories'
import ProductAction from '../../action/product'
import {Router} from '../../navigation/route'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SearchBar } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

class index extends React.Component{
  state={
    search:"",
    filterSearch:[],
    filter:"Default",
  }
  updateFilter=()=>{
    const {filter}=this.state
    let filterUpdate=this.state.filterSearch
    if (filter==="Default") {
      this.setState({filterSearch:filterUpdate})
    }
    else if (filter==="Ascending") {
      filterUpdate.sort(
        function(a,b) {return(a.Price-b.Price)}
      )
      this.setState({filterSearch:filterUpdate})
    }
    else if (filter==="Decrease"){
      filterUpdate.sort(
        function(a,b) {return(b.Price-a.Price)}
      )
      this.setState({filterSearch:filterUpdate})
    }
  }
  updateSearch = (search) => {
    const {
      product
    }=this.props
    if (search) {
      const newData=product.filter(
        function(product){
          let ProductName=product.Name_Product.toUpperCase()
          let textData=search.toUpperCase()
          return ProductName.indexOf(textData) > -1
        }
      )
      this.setState({filterSearch:newData})
    }
    else this.setState({filterSearch:product})
    this.setState({ search });
  };
  renderProduct=({item})=>{
    let Name=""
    if (item.Name_Product.length>24){
      Name=item.Name_Product.slice(0,24)+'...'
    } else {Name=item.Name_Product}
    return(
    <TouchableOpacity
    onPress={()=>{
      this.props.navigation.navigate(Router.ProductDetail,{product:item})
    }}
      style={[styles.viewCategory,{marginBottom:30, marginTop:8}]}
      key={item.UID_Product}
      >
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Image
          source={{uri:item.Image}}
          resizeMethod={"resize"}
          style={styles.image}
        />
        <View style={{justifyContent:"center"}}>
          <Text style={styles.categoryName}>{Name}</Text>
          <Text style={styles.price}>Price: <Text>
            {item.Price} VND</Text></Text>
          <View style={{flexDirection:"row", alignSelf:"center"}}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={"gray"}
            />
            <Text style={styles.location}>TP {this.props.user.City}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  componentWillMount(){
    this.props.getProduct()
  }
  componenDidMount(){
    this.props.getProduct()
  }
  render(){
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
          <Text style={styles.textHeader}>Search</Text>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate(Router.Cart)}>
            <FontAwesome
              name="shopping-cart" 
              size={20} 
              color={"#FF9D0B"} 
              style={styles.shopIcon}       
            />
          </TouchableOpacity>
        </View>
        <SearchBar
          placeholder="Search Here..."
          containerStyle={styles.SearchContainer}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={this.state.search}
          onChangeText={this.updateSearch}
        />
        <View style={[styles.viewCategory,{marginTop:8, flexDirection:"row"}]}>
          <AntDesign
            name="filter"
            size={25}
            color={"#FF9D0B"}
            style={styles.filterIcon}
          />
          <Text style={styles.price} > Price </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.filter}
              onValueChange={(itemValue, itemIndex) =>{
                  this.setState({filter:itemValue},()=>this.updateFilter());  
              }}  
              style={styles.pickerItem}
            >
              <Picker.Item label="Default" value="Default" color="white"/>
              <Picker.Item label="Ascending" value="Ascending" color="white"/>
              <Picker.Item label="Decrease" value="Decrease" color="white"/>
            </Picker>
          </View>
        </View>
        <FlatList
          data={this.state.filterSearch}
          keyExtractor={(item, index) => item.UID_Product+index.toString()}
          renderItem={({item})=>this.renderProduct({item})}
        />
      </View>
    ) 
  }
}


const mapStateToProps = state => ({
  product:getProductField(state,"product"),
  user:getAuthField(state,"user")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      getProduct:bindActionCreators(ProductAction.getProduct,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);