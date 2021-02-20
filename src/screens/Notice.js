import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ImageBackground,TouchableOpacity, Image, TextInput , Linking} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Fire from "./Fire"
import { LinearGradient} from "expo-linear-gradient";
import InputScrollView from 'react-native-input-scroll-view';
import AlertPro from "react-native-alert-pro";
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from "../screens/UserPermission"
import { ScrollView } from 'react-native-gesture-handler'

const firebase = require("firebase");
require("firebase/firestore");

export default class Detail extends React.Component {

    state = {
        text: "",
        image: '../images/edit1.png'
    }

    componentDidMount() {
        UserPermissions.getCamerPermission();
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status != "granted") {
                alert("Precisamos de permissão para acessar suas fotos.")
            }
        }
    };

    handlePost = () => {
        Fire.shared
            .addPost({ text: this.state.text.trim(), localUri: this.state.image })
            .then(ref => {
                this.setState({ text: "", image: null });
                this.props.navigation.goBack();
            })
            .catch(error => {
                alert(error.message);
            });
    };

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }


    state = {
      user: {},
      email: "",
      displayName: ""
  };

componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;

    this.setState({ email, displayName });
}



signOutUser = () => {
  firebase.auth().signOut();
};



  unsubscrible = null;

  componentDidMount() {
      const user = this.props.uid || Fire.shared.uid;

      this.unsubscrible = Fire.shared.firestore
          .collection("users")
          .doc(user)
          .onSnapshot(doc => {
              this.setState({ user: doc.data() });
          });
  }

  componentWillUnmount() {
      this.unsubscrible();
  }



    render(){
        return(
            <View style={{
               backgroundColor:"#f8f8f8",
                height:"100%",
                paddingHorizontal:20,
            
            

            }}> 
            <ScrollView
   showsVerticalScrollIndicator ={false}
  showsHorizontalScrollIndicator={false}

  >


         
            <ImageBackground source={require('../images/dev3.png')} 
                  style={{ width:"100%",height:250,marginTop:20}}>

   <TouchableOpacity  onPress={()=>this.props.navigation.goBack()} style={{
                          backgroundColor:"#000000",
                          height: 35,
                          width: 35,
                          marginLeft:0,
                          marginTop:10,
                          borderRadius:8,
                          zIndex:100
                      }}>
                          
                               <Image source={require("../images/back1.png")} style={{width:25,height:10,top:11,left:5}}/>
                
                      </TouchableOpacity>

            </ImageBackground>
  

         

                    <View style={{
                        flexDirection:"row",
                        marginTop:20,
                        borderRadius:10,
                    }}>
                            <View style={{
                                backgroundColor:"#FFF",
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderRadius:10,
                                width:450
                                    }}>
                                        <Text style={{
                                            fontFamily:"Bold",
                                            paddingLeft:1,
                                            paddingRight:120
                                    
                     }}>If you have doubt where the data saved here is stored in mobile follow the instructions</Text>
                            </View>

                          

                    </View>
     

            <View style={{ 
                        marginTop:10,
                        marginBottom:20
                    }}>
                        <Text style={{
                            fontFamily:"Bold",
                            fontSize:20,
                            marginBottom:10
                        }}>Open Settings</Text>
                      
                    </View>


<View style={{justifyContent: "center", alignItems: "center"}}>
<Image source={require('../images/phone.png')} 
                  style={{ width:100,height:200, }}/>

</View>
                
                <View style={{ 
                        marginTop:10,
                        marginBottom:20
                    }}>
                        <Text style={{
                            fontFamily:"Bold",
                            fontSize:20,
                            marginBottom:10
                        }}>Open App manager</Text>
                      
                    </View>


                    <View style={{justifyContent: "center", alignItems: "center"}}>
<Image source={require('../images/phone1.png')} 
                  style={{ width:100,height:200, }}/>

</View>
                
         
         
         <View style={{ 
                        marginTop:10,
                        marginBottom:20
                    }}>
                        <Text style={{
                            fontFamily:"Bold",
                            fontSize:20,
                            marginBottom:10
                        }}>Open AsyncStorage</Text>
                      
                    </View>


                    <View style={{justifyContent: "center", alignItems: "center"}}>
<Image source={require('../images/phone3.png')} 
                  style={{ width:100,height:200, }}/>

</View>
                
         

<View style={{ 
                        marginTop:10,
                        marginBottom:20
                    }}>
                        <Text style={{
                            fontFamily:"Bold",
                            fontSize:20,
                            marginBottom:10
                        }}>Open Storage</Text>
                      
                    </View>


                    <View style={{justifyContent: "center", alignItems: "center"}}>
<Image source={require('../images/phone2.png')} 
                  style={{ width:100,height:200, }}/>

</View>
                
         
<View style={{ 
                        marginTop:10,
                        marginBottom:20
                    }}>
                        <Text style={{
                            fontFamily:"Bold",
                            fontSize:20,
                            marginBottom:10
                        }}>Open Clear Data</Text>
                      
                    </View>
 
<View style={{justifyContent: "center", alignItems: "center"}}>
<Image source={require('../images/phone4.png')} 
                  style={{ width:100,height:200, }}/>

</View>
                
         
                    </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#FFF"
    },
    header: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        right:20,
        margin:20,
        top:-50,
        flexDirection: "row"
    },
    avatar: {
        marginTop: 40,
        width: 60,
        height: 60,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
    

    }
})