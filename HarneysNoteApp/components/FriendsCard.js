import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const FriendsCard = ({ avatar, name, status, about, lastSeen }) => {
  const isOnline = status.toLowerCase() === 'online';
  const statusColor = isOnline ? 'text-green-500' : 'text-red-500';
  const statusIcon = isOnline ? 'ellipse' : 'ellipse-outline';

  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: avatar }}
          className="w-16 h-16 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold">{name}</Text>
          <View className="flex flex-row items-center mt-1">
            <Ionicons name={statusIcon} size={14} className={`${statusColor} mr-1`} />
            <Text className={`text-sm ${statusColor}`}>{status}</Text>
          </View>
          <Text className="text-sm text-gray-600">{about}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-between items-center mt-4">
        <Text className="text-xs text-gray-500">{lastSeen}</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </View>
    </View>
  );
};

export default FriendsCard;
