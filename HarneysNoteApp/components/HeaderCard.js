// HeaderCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const HeaderCard = ({ username }) => {
  return (
    <View style={{ backgroundColor: 'white', padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#ccc', marginRight: 12, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 12 }}>Avatar</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Welcome, {username}!</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCard;
