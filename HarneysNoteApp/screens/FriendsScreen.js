import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import FriendsCard from '../components/FriendsCard';

const FriendsScreen = ({navigate, routeName}) => {
    console.log("route name", routeName)
  const friends = [
    {
      avatar: 'https://example.com/avatar1.jpg',
      name: 'John Doe',
      status: 'Online',
      about: 'Loves coding and coffee',
      lastSeen: 'Last seen 2 hours ago',
    },
    {
      avatar: 'https://example.com/avatar2.jpg',
      name: 'Jane Smith',
      status: 'Offline',
      about: 'Enjoys hiking and photography',
      lastSeen: 'Last seen 1 day ago',
    },
  ];

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Friends</Text>
      {friends.map((friend, index) => (
        <FriendsCard
          key={index}
          avatar={friend.avatar}
          name={friend.name}
          status={friend.status}
          about={friend.about}
          lastSeen={friend.lastSeen}
        />
      ))}
    </ScrollView>
  );
};

export default FriendsScreen;
