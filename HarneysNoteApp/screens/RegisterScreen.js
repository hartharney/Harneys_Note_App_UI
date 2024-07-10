import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useMutation } from '@apollo/client';
// import { REGISTER_USER } from '@/graphql/mutation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';



const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { control, handleSubmit, formState: {errors, isValid}, reset } = useForm({mode: 'onBlur'})

  // const [registerUser] = useMutation(REGISTER_USER);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, firstName, lastName, password, confirmPassword} = data;
      const input = { email, firstName, lastName, password, confirmPassword};
      // const { data } = await registerUser({ variables: { input } });
      // if (data) {
      //   // Registration successful
      //   alert('Registration successful! Redirecting to login page.');
      //   navigation.navigate('Login'); // Navigate to login screen
      // }
       setTimeout(() => {
   //   Show toast message
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        visibilityTime: 2000, // Toast display time
        autoHide: true,
      });

      // Navigate to Home screen
      // navigation.navigate('Home');
      console.log('User data:', input)
    }, 1000); // Simulate async login process

      
    } catch (error) {
      Toast.show({
        type: 'warning',
        text1: 'Registration failed',
        visibilityTime: 2000, // Toast display time
        autoHide: true,
      });
      alert(`Registration failed. Please try again. ${error.message}`);
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const googleLogin = () => {
    // Implement Google sign-in logic for React Native
    // Example: Open Google Sign-in modal or redirect to Google Sign-in page
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Create Account</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>Enter your email or signup with Google.</Text>

      {/* Google Sign-in Button */}
      {/* <TouchableOpacity onPress={googleLogin} style={{ alignItems: 'center', marginBottom: 20 }}> */}
      <TouchableOpacity style={{ alignItems: 'center', marginBottom: 20 }}>
        <View className="flex flex-row bg-red-300 justify center align-center" > 
          <MaterialCommunityIcons name="google" size={24} color="black"  />
          <Text style={{ color: 'white', textAlign: "center" }}>
            Google
          </Text>
        </View>
      </TouchableOpacity>

      {/* Registration Form */}
      <View style={{ marginBottom: 20 }}>
        <Controller
          control={control}
          render={({field: {onChange, value, onBlur}}) => (        
            <TextInput
             iconName="First Name"            
             iconType="MaterialIcons"            
             placeholder="Enter your first name here"            
             value={value}            
             onBlur={onBlur}            
             onChangeText={value => onChange(value)}       
              style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
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
             placeholder="Enter your last name here"            
             value={value}            
             onBlur={onBlur}            
             onChangeText={value => onChange(value)}   
              style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
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
              style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
            />
          )}
          name="email"
          rules={{ 
            required: 'Email is required',
          }}
        />
        <Text style={{ color: 'red' }}>{errors.email?.message}</Text>
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
              style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
            />
          )}
          name="password"
          rules={{ 
            required: 'Password is required',
             pattern: {
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#_!*%$])[a-zA-Z0-9@#_!*%$]{6,18}$/,
              message: 'Invalid email address, must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@#_!*%$)',
            },
            minLength: { value: 6, message: 'Email must be at least 6 characters' }, 
          }}
        />
        <Text style={{ color: 'red' }}>{errors.password?.message}</Text>

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
              style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
            />
          )}
          name="confirmPassword"
          rules={{ 
            required: 'Confirm Password is required',
            // validate: (value) => value === control.fieldsRef.current.password.value || 'Passwords do not match'
          }}
        />
        <Text style={{ color: 'red' }}>{errors.confirmPassword?.message}</Text>

        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={{ position: 'absolute', right: 10, top: 10 }}>
          <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>


      {/* Agreement Switch */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Switch value={agreed} onValueChange={setAgreed} />
        <Text style={{ marginLeft: 10 }}>Agree to policies</Text>
      </View>

      {/* Submit Button */}
      {/* <Button title={loading ? 'Loading...' : 'Create Account'} onPress={handleSubmit(onSubmit)} /> */}
      <Button title={loading ? 'Loading...' : 'Create Account'} onPress={handleSubmit(onSubmit)}  />

      {/* Link to Login */}
      {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}> */}
      <TouchableOpacity>
        <Text style={{ marginTop: 20 }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
