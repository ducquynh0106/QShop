import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import styles from './style'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getCategoriesField} from '../../selector/categories'
import {getProductField} from '../../selector/product'
import ProductAction from '../../action/product'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AwesomeAlert from 'react-native-awesome-alerts';

class index extends Component{
  state={
    image:"",
    showAlert:false,
    message:"",
  }
  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={()=>this.takePhotoFromCamera()} >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={()=>this.choosePhotoFromLibrary()} >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  renderHeader = () => (
    <View style={styles.headerPanel}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  takePhotoFromCamera = () => {
    const {
      changeFormField,
    }=this.props
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      this.setState({image:image.path});
      this.bs.current.snapTo(1);
      changeFormField("Image",this.state.image)
    });
  }
  choosePhotoFromLibrary = () => {
    const {
      changeFormField,
    }=this.props
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      this.setState({image:image.path});
      this.bs.current.snapTo(1);
      changeFormField("Image",this.state.image)
    });
  }
  bs = React.createRef();
  fall = new Animated.Value(1);
  renderNameCategory=()=>{
    const {
      category,
      selectCategory
    }=this.props
    let Cate=category.filter(cat=>cat.UID_Cat===selectCategory)
    return(
      Cate[0].Name
    )
  }
  handelSaveButton=()=>{
    const {
      productform,
      editProduct
    }=this.props
    if (productform.Name_Product==="" || productform.Price===""|| productform.Information==="" || this.state.image==="" ){
      this.setState({
        showAlert:true,
        message:"All field must not be empty  "
      })
    }
    else {editProduct(productform)}

  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    if (this.state.message==="You have successfully edit product"){
      this.props.navigation.goBack()
  }
  };
  componentWillMount(){
    this.setState({image:this.props.productform.Image})
  }
  componentDidMount(){
    const {
      changeFormField,
      selectCategory,
    }=this.props
    changeFormField("Category",selectCategory)
  }
  async componentWillReceiveProps(nextProps){
    if (nextProps.isLoadingEdit === true) {
        this.setState({
            showAlert:true,
            message:"You have successfully edit product"
        })
    }
    
  }
  render(){
    const {
      productform,
      changeFormField
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
          <Text style={styles.textHeader}>Edit Product</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
              <Image
                source={{uri:this.state.image}}
                resizeMethod={"resize"}
                style={styles.image}
              />
              <TouchableOpacity 
                style={styles.buttonUp}
                onPress={() => this.bs.current.snapTo(0)}>
                <Text style={styles.textUp}>UPLOAD IMAGE</Text>
              </TouchableOpacity> 
              <View style={styles.customInput}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  value={productform.Name_Product}
                  onChangeText={Name_Product=>changeFormField("Name_Product",Name_Product)}
                  placeholder={"Set Name"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                  multiline={true}
                />
              </View>
              <View style={styles.customCategory}>
                <Text style={styles.label}>Category</Text>
                <Text style={styles.label}>{this.renderNameCategory()}</Text>
              </View>
              <View style={styles.customInput}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  value={productform.Price}
                  onChangeText={Price=>changeFormField("Price",Price)}
                  placeholder={"Set Price"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                />
              </View>
              <View style={styles.customInput}>
                <Text style={styles.label}>Desription</Text>
                <TextInput
                  value={productform.Information}
                  onChangeText={Infor=>changeFormField("Information",Infor)}
                  placeholder={"Set Desription"}
                  placeholderTextColor={"gray"}
                  style={styles.label}
                  multiline={true}
                />
              </View>
              <View style={styles.bottombutton}>
                <TouchableOpacity
                  style={styles.cancelbutton}
                  onPress={()=>this.props.navigation.goBack()}>
                  <Text style={styles.cancel}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>this.handelSaveButton()}
                  style={styles.addbutton}>
                  <Text  style={styles.add}>SAVE</Text>
                </TouchableOpacity>
              </View>
            
        </ScrollView>
        <BottomSheet
          ref={this.bs}
          snapPoints={[330, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title=""
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          contentContainerStyle={styles.alert}
          titleStyle={styles.alertTitle}
          messageStyle={styles.alertMessage}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonStyle={styles.alertButton}
          confirmButtonColor={"rgba(255, 157, 11, 0.79)"}
          confirmButtonTextStyle={styles.confirmButtonText}
          onConfirmPressed={() => {
              this.hideAlert();
          }}
         />
    </View>
    ) 
  }
}

const mapStateToProps = state => ({
  category:getCategoriesField(state,"category"),
  selectCategory:getCategoriesField(state,"selectCategory"),
  productform:getProductField(state,"productform"),
  isLoadingEdit:getProductField(state,"isLoadingEdit")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeFormField:bindActionCreators(ProductAction.changeFormField,dispatch),
      changeField:bindActionCreators(ProductAction.changeField,dispatch),
      addProduct:bindActionCreators(ProductAction.addProduct,dispatch),
      editProduct:bindActionCreators(ProductAction.editProduct,dispatch),
      resetForm:bindActionCreators(ProductAction.resetForm,dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);