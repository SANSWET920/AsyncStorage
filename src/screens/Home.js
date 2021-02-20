import React from 'react'
import {View,Text,ImageBackground,TouchableOpacity,Image, StatusBar,StyleSheet} from 'react-native'
import {ScrollView,TextInput} from 'react-native-gesture-handler'
import CourseList from '../screens/CourseList'
import firebase from "firebase";
import Fire from './Fire';
import ViewScreen from "./VieweScreen";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';
  

  
export default class Home extends React.Component{

   state = {
       user: {}
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

      
            AdMobRewarded.setTestDeviceID('EMULATOR');
            AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
        
            AdMobRewarded.addEventListener('rewarded', reward =>
              console.log('AdMobRewarded => rewarded', reward),
            );
            AdMobRewarded.addEventListener('adLoaded', () =>
              console.log('AdMobRewarded => adLoaded'),
            );
            AdMobRewarded.addEventListener('adFailedToLoad', error =>
              console.warn(error),
            );
            AdMobRewarded.addEventListener('adOpened', () =>
              console.log('AdMobRewarded => adOpened'),
            );
            AdMobRewarded.addEventListener('videoStarted', () =>
              console.log('AdMobRewarded => videoStarted'),
            );
            AdMobRewarded.addEventListener('adClosed', () => {
              console.log('AdMobRewarded => adClosed');
              AdMobRewarded.requestAdAsync().catch(error => console.warn(error));
            });
            AdMobRewarded.addEventListener('adLeftApplication', () =>
              console.log('AdMobRewarded => adLeftApplication'),
            );
        
            AdMobRewarded.requestAdAsync().catch(error => console.warn(error));
        
            AdMobInterstitial.setTestDeviceID('EMULATOR');
            AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        
            AdMobInterstitial.addEventListener('adLoaded', () =>
              console.log('AdMobInterstitial adLoaded'),
            );
            AdMobInterstitial.addEventListener('adFailedToLoad', error =>
              console.warn(error),
            );
            AdMobInterstitial.addEventListener('adOpened', () =>
              console.log('AdMobInterstitial => adOpened'),
            );
            AdMobInterstitial.addEventListener('adClosed', () => {
              console.log('AdMobInterstitial => adClosed');
              AdMobInterstitial.requestAdAsync().catch(error => console.warn(error));
            });
            AdMobInterstitial.addEventListener('adLeftApplication', () =>
              console.log('AdMobInterstitial => adLeftApplication'),
            );
        
            AdMobInterstitial.requestAdAsync().catch(error => console.warn(error));
          }
        
          componentWillUnmount() {
            AdMobRewarded.removeAllListeners();
            AdMobInterstitial.removeAllListeners();
          }
        
          showRewarded() {
            AdMobRewarded.showAdAsync().catch(error => console.warn(error));
        
          }
        
          showInterstitial() {
           AdMobInterstitial.showAdAsync().catch(error => console.warn(error))
          }
      

          interstitialDidClose() {
            AdMobInterstitial.requestAdAsync((error) => error && log(error));
           }
        
        
    render(){

        
        return(
            
           <ImageBackground
            source={require('../images/Home.png')}
            style={{width:"100%",height:"100%"}}
           >


               <ScrollView>
              
                   <View style={{
                       width:"100%",
                       alignItems:"flex-end",
                       paddingHorizontal:20
                   }}>
                            
      
                
                <TouchableOpacity  style={{
                           paddingHorizontal:10,
                           paddingVertical:12,
                           borderRadius:10,
                           marginTop: 30,
                           zIndex: 1,
                           backgroundColor:"#d1a0a7"
                       }}      onPress={()=>this.props.navigation.navigate('Profile')}>
            
                           <Image
                            source={require('../images/hum.png')}
                            style={{height:15,width:20}}
                           />
                
</TouchableOpacity>



                   </View>

                   <View style={styles.avatarContainer}>
         <Image 
           style={ styles.avatar}
            source ={
               this.state.user.avatar
                    ? { uri: this.state.user.avatar }
                    : require("../images/profile.png")
           }
           />

        </View>
                   <Text style={{
                       paddingHorizontal:20,
                       fontSize:35,
                       paddingTop:10,
                       fontFamily:"Bold",
                       color:"#FFF"
                   }}>
                      Welcome {this.state.user.name}
                   </Text>

                   <View style={{
                       flexDirection:"row",
                       alignItems:"center",
                       backgroundColor:"#FFF",
                       padding:10,
                       borderRadius:12,
                       marginHorizontal:20,
                       marginTop:20
                   }}>
                       <TextInput
                            placeholder="Make notes to remember later!"
                            placeholderTextColor="#345c74"
                            style={{
                                fontFamily:"Bold",
                                fontSize:12,
                                width:280,
                                paddingHorizontal:12
                            }}
                       />
                     
                   </View>
                   <View style={{
                       flexDirection:"row",
                       backgroundColor:"#FFF2F2",
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30
                   }}>
                       <View>
                           <Text style={{
                               color:"#345c74",
                               fontSize:20,
                               fontFamily:"Bold",
                               width:250,
                               paddingRight:100 
                           }}>
                               Start typing new Stuff
                           </Text>
                           <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Cources')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#f58084",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontFamily:"Bold",
                                        fontSize:12
                                    }}>Classic content</Text>  
                            
                           </TouchableOpacity>
                       </View>
                       <Image
                            source={require('../images/undraw.png')}
                            style={{marginLeft:-80,marginTop:35}}
                       />

                   </View>
                   <Text style={{
                       color:"#345c74",
                       fontFamily:"Bold",
                       fontSize:20,
                       paddingHorizontal:20,
                       marginTop:20,
                       marginBottom:10
                   }}>   Instant notes</Text>

                   <CourseList
                          onPress={() => {
      this.showRewarded();
    }}
    onPressIn={() => {
      this.props.navigation.navigate('PS4'); 
    }}

                        img={require('../images/pen.png')}
                        title="Quick notes"
                        bg="#fdddf3"
                   />
                    <CourseList
                  onPress={() => { this.showRewarded(); this.props.navigation.navigate('NextScreen') }}

                        img={require('../images/pen2.png')}
                        title="Quick messages"
                        bg="#fef8e3"
                   />
                    <CourseList
                       onPress={this.showRewarded}
                        img={require('../images/pen6.png')}
                        title="Quick references"
                        bg="#fcf2ff"
                   />
            
                   <ViewScreen />

               </ScrollView>
           </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    avatarContainer: {
        borderColor:"#f58084",
        borderRadius: 50,
        shadowColor: "#151734",
        shadowOpacity: 0.4,
        top:-40,
        left:15
        
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 68
    }
})