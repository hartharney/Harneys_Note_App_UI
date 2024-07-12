import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ScrollView , Image, Platform} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRegisterUser } from '../Schema/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import BackgroundArt from '../assets/images/BackgroundArt.png';
import LockIcon from '../assets/images/lock-closed.png';
import mailIcon from '../assets/images/mail.png';
import AppleLogo from '../assets/images/AppleLogo.png'
import GoogleLogo from '../assets/images/GoogleLogo.png'

const RegisterScreen = ({ navigation, routeName }) => {
    console.log("route name", routeName)
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { control, handleSubmit, formState: {errors, isValid}, reset } = useForm({mode: 'onBlur'})

  const { handleRegisterUser, error } = useRegisterUser();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, firstName, lastName, password, confirmPassword} = data;
      const input = { email, firstName, lastName, password, confirmPassword};
      const response = await handleRegisterUser(input);
        console.log("response", response)
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          visibilityTime: 2000, 
          autoHide: true,
        });
        navigation.navigate('Login'); 
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        visibilityTime: 2000, 
        autoHide: true,
      });

      // alert(`Registration failed. Please try again. ${error.message}`);
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const googleLogin = () => {
    // Implement Google sign-in logic 
  };

  return (
    <ImageBackground 
      source={BackgroundArt} 
      style={{ flex: 1, justifyContent: 'center',  backgroundColor : 'black'  }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 50}}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Create</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'white',  marginBottom: 40 }}>Account</Text>

            {/* Registration Form */}
            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (        
                  <TextInput
                    iconName="First Name"            
                    iconType="MaterialIcons"            
                    placeholder="First Name"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}       
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 0, backgroundColor: 'white', borderRadius : 10 }}
                    placeholderTextColor="gray"
                    className="px-[30px]"
                  />
                )}
                name="firstName"
                rules={{ required: 'First name is required' }}
              />
              <Text style={{ color: 'red' }}>{errors.firstName?.message}</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (        
                  <TextInput
                    iconName="Last Name"            
                    iconType="MaterialIcons"            
                    placeholder="Last Name"            
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}   
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 0, backgroundColor: 'white', borderRadius : 10 }}
                    placeholderTextColor="gray"
                    className="px-[30px]"
                  />
                )}
                name="lastName"
                rules={{ required: 'Last name is required' }}
              />
              <Text style={{ color: 'red' }}>{errors.lastName?.message}</Text>
            </View>

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
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,18}$/,
                    message: 'Invalid password format, must contain at least one lowercase letter, one uppercase letter, and one number',
                  },
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
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


            <View style={{ marginBottom: 20 }}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (        
                  <TextInput
                    iconName="Confirm password"            
                    iconType="MaterialIcons"                      
                    value={value}            
                    onBlur={onBlur}            
                    onChangeText={value => onChange(value)}   
                    placeholder="Confirm Password"
                    secureTextEntry={!showConfirmPassword}
                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 0, backgroundColor: 'white', borderRadius : 10 }}
                    placeholderTextColor="gray"
                    className="px-[30px]"
                  />
                )}
                name="confirmPassword"
                rules={{ 
                  required: 'Confirm Password is required',
                  // validate: (value) => value === control.fieldsRef.current.password.value || 'Passwords do not match'
                }}
              />
              <Text style={{ color: 'red' }}>{errors.confirmPassword?.message}</Text>

              <Image
                source={LockIcon}
                style={{ width: 15, height: 15, position: 'absolute', left: 5, top: 10 }}
              />

              <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={{ position: 'absolute', right: 10, top: 10 }}>
                <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Agreement Switch */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
              <Switch value={agreed} onValueChange={setAgreed} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Agree to policies</Text>
            </View>

            {/* Submit Button */}
            <View  style={{ borderWidth: 1, borderColor: '#FBBC05', padding: 5, marginBottom: 0, backgroundColor: '#FBBC05', borderRadius : 10 }}>
              <Button title={loading ? 'Loading...' : 'Create Account'} onPress={handleSubmit(onSubmit)} />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;
