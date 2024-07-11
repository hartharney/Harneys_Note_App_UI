import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ScrollView , Image, Platform} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useLoginUser } from '../Schema/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import BackgroundArt from '../assets/images/BackgroundArt.png';
import LockIcon from '../assets/images/lock-closed.png';
import mailIcon from '../assets/images/mail.png';
import AppleLogo from '../assets/images/AppleLogo.png'
import GoogleLogo from '../assets/images/GoogleLogo.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { control, handleSubmit, formState: {errors, isValid}, reset } = useForm({mode: 'onBlur'})

  const { handleLoginUser, error } = useLoginUser();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password} = data;
      const input = { email,password};
      const response  = await handleLoginUser(input);
      if (response) {
        // Registration successful
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          visibilityTime: 2000, 
          autoHide: true,
        });
        // alert('Login successful! Redirecting to login page.');
        navigation.navigate('Notes'); 
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        visibilityTime: 2000, 
        autoHide: true,
      });

      // alert(`Login failed. Please try again. ${error.message}`);
      console.error('Error logging in user:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const googleLogin = () => {
    // Implement Google sign-in logic 
  };

  return (
    <ImageBackground 
      source={BackgroundArt} 
      style={{ flex: 1, justifyContent: 'center',  backgroundColor : 'black'  }}
    >
      <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        extraHeight={150}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 50}}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Welcome</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white',  marginBottom: 40 }}>Back!</Text>

            {/* Login Form */}

            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (        
                  <TextInput
                    iconName="Email"            
                    iconType="MaterialIcons"                     
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}   
                    placeholder="Enter your email here"
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 0, backgroundColor: 'white', borderRadius : 10 }}
                    placeholderTextColor="gray"
                    className="px-[30px]"
                  />
                )}
                name="email"
                rules={{ 
                  required: 'Email is required',
                }}
              />
              <Text style={{ color: 'red' }}>{errors.email?.message}</Text>

              <Image
                source={mailIcon}
                style={{ width: 15, height: 15, position: 'absolute', left: 5, top: 10 }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (        
                  <TextInput
                    iconName="Password"            
                    iconType="MaterialIcons"                       
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}   
                    placeholder="Please enter a Password"
                    secureTextEntry={!showPassword}
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 0, backgroundColor: 'white', borderRadius : 10 }}
                    placeholderTextColor="gray"
                    className="px-[30px]"
                  />
                )}
                name="password"
                rules={{ 
                  required: 'Password is required',
                  pattern: {
                    value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#_!*%$])[a-zA-Z0-9@#_!*%$]{6,18}$/,
                    message: 'Invalid password format, must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@#_!*%$)',
                  },
                  minLength: { value: 6, message: 'Email must be at least 6 characters' }, 
                }}
              />
              <Text style={{ color: 'red' }}>{errors.password?.message}</Text>

              <Image
                source={LockIcon}
                style={{ width: 15, height: 15, position: 'absolute', left: 5, top: 10 }}
              />

              <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 10 }}>
                <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
              </TouchableOpacity>
            </View>


            {/* Agreement Switch */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
              <Switch value={agreed} onValueChange={setAgreed} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Remember me</Text>
            </View>

            {/* Submit Button */}
            <View  style={{ borderWidth: 1, borderColor: '#FBBC05', padding: 5, marginBottom: 0, backgroundColor: '#FBBC05', borderRadius : 10 }}>
              <Button title={loading ? 'Loading...' : 'Login'} onPress={handleSubmit(onSubmit)} />
            </View>

            {/* Link to Login */}
            <Text style={{ marginTop: 20, color: 'white', textAlign: "center" }}>
              Don't have an account?{' '}

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: '#FBBC05'}}>Register</Text>
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
        </ScrollView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;
