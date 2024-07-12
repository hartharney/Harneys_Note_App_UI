import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useUser } from '../services/contexts/userContext';
import { useLogout } from '../Schema/api';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useIsLoggedIn } from '../services/contexts/isLoggedInContext';

const HeaderCard = () => {
  const { user } = useUser();
const { setIsLoggedIn } = useIsLoggedIn()
  console.log("user in the header", user)
  const { handleLogout } = useLogout();
  const navigation = useNavigation();

  const logoutAndNavigate = async () => {
    try {
      await handleLogout();
      setIsLoggedIn(false)
      Toast.show({
        type: 'success',
        text1: 'Logout Successful, see you soon',
        visibilityTime: 2000,
        autoHide: true,
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#ccc', marginRight: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12 }}>Avatar</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome, {user ? user.firstName : 'Guest'} {user?.lastName || '!'} !</Text>
      </View>
      <TouchableOpacity onPress={logoutAndNavigate}>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCard;
