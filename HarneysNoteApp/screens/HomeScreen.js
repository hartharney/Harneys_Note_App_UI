import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Button } from 'react-native';
import BackgroundArt from '../assets/images/BackgroundArt.png';
import AppleLogo from '../assets/images/AppleLogo.png';
import GoogleLogo from '../assets/images/GoogleLogo.png';
import HeroBanner from '../assets/images/Herobanner.png';

const HomeScreen = ({ navigation, routeName }) => {
  console.log("route name", routeName)
  const googleLogin = () => {
    // Implement Google sign-in logic 
  };

  return (
    <ImageBackground 
      source={BackgroundArt} 
      style={{ flex: 1, backgroundColor: 'black' }}
    >
      <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }} className="w-full">
        
        {/* Hero Banner */}
        <View style={{ marginBottom: 20, alignItems: 'center' }} className="w-[100%] h-fit">
          <Image
            source={HeroBanner}
            // style={{ width: 200, height: 200 }}
            className="w-full h-auto"
          />
        </View>


            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 40, color: 'white' }}>Harney's NotePad</Text>
            <Text style={{ fontSize: 14, fontWeight: 'normal', marginBottom: 40, color: 'white',}}>Africa's leading interactive notepad </Text>

            {/* Link to Register */}
            <View  style={{ borderWidth: 1, borderColor: '#FBBC05', padding: 5, marginBottom: 0, backgroundColor: '#FBBC05', borderRadius : 10 }} className="w-[80%] mx-auto">
              <Button title="Let's begin" onPress={() => navigation.navigate('Register')} />
            </View>

            {/* Link to Login */}
            <Text style={{ marginTop: 20, color: 'white', textAlign: "center" }}>
              Already have an account?{' '}

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#FBBC05'}}>Login</Text>
              </TouchableOpacity>
            </Text>

            <Text style={{ marginTop: 10, color: 'white', textAlign: "center" }}>
              or{' '}
            </Text>
            
              {/* SSO */}
            <View className="flex flex-row w-[60px] mx-auto h-fit justify-between align-center">
              <TouchableOpacity onPress={googleLogin}  style={{ alignItems: 'center', marginBottom: 20 }}> 
                <Image
                  source={GoogleLogo}
                  style={{ width: 15, height: 15, left: 5, top: 10, color: "white" }}
                />
              </TouchableOpacity>

              <Image
                source={AppleLogo}
                style={{ width: 15, height: 15, left: 5, top: 10 }}
              />
            </View>

      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
