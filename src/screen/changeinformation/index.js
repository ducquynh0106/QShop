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
  getAuthField,
} from '../../selector/auth'
import AuthAction from '../../action/auth'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeAlert from 'react-native-awesome-alerts';

 class index extends React.Component{
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
      changeUserFormField,
    }=this.props
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      this.setState({image:image.path});
      this.bs.current.snapTo(1);
      changeUserFormField("Image",this.state.image)
    });
  }
  choosePhotoFromLibrary = () => {
    const {
      changeUserFormField,
    }=this.props
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      this.setState({image:image.path});
      this.bs.current.snapTo(1);
      changeUserFormField("Image",this.state.image)
    });
  }
  bs = React.createRef();
  fall = new Animated.Value(1);
  handelSaveButton=()=>{
    const {
      userform,
      saveProfile
    }=this.props
    // const {
    //   productform,
    //   editProduct
    // }=this.props
    // if (productform.Name_Product==="" || productform.Price===""|| productform.Information==="" || this.state.image==="" ){
    //   this.setState({
    //     showAlert:true,
    //     message:"All field must not be empty  "
    //   })
    // }
    // else {
    //   editProduct(productform)
    // }
    saveProfile(userform)
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
    if (this.state.message==="You have successfully edit product"){
      this.props.navigation.goBack()
  }
  };
  async componentWillReceiveProps(nextProps){
    if (nextProps.isLoadingProfile === true) {
        this.setState({
            showAlert:true,
            message:"You have successfully change information"
        })
    }
    
  }
  componentWillMount(){
    this.setState({Image:this.props.userform.Image})
  }
  render(){
    const {
      user
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
          <Text style={styles.textHeader}>Change Information</Text>
        </View>
        <ScrollView
          style={styles.scrollView}>
          {this.state.image===""?
          <Image
            source={require('../../../media/uploadImage.png')}
            resizeMethod={"resize"}
            style={styles.image}
          />
          :
          <Image
            source={{uri:this.state.image}}
            resizeMethod={"resize"}
            style={styles.image}
          />}
          <TouchableOpacity 
            style={styles.buttonUp}
            onPress={() => this.bs.current.snapTo(0)}>
            <Text style={styles.textUp}>UPLOAD IMAGE</Text>
          </TouchableOpacity> 
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
  user:getAuthField(state,"user"),
  userform:getAuthField(state,"userform")
});

const mapDispatchToProps =(dispatch)=> {
    return{
      changeUserFormField:bindActionCreators(AuthAction.changeUserFormField,dispatch),
      saveProfile:bindActionCreators(AuthAction.saveProfile,dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(index);