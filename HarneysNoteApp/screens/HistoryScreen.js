// HistoryScreen.js
// import React, { useEffect } from 'react';
// import { ScrollView, View, Text, FlatList, ActivityIndicator } from 'react-native';
// import { useQuery } from '@apollo/client';
// import NoteCard from '../components/NoteCard';
// import HeaderCard from '../components/HeaderCard';
// import { GET_USER_NOTES } from '../Schema/api';

// const HistoryScreen = () => {
//   // const { loading, error, data, refetch } = useQuery(GET_USER_NOTES);
//   // console.log("data", data)

//   // useEffect(() => {
//   //   refetch();
//   // }, []);

//   // if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
//   // if (error) return <Text>Error fetching notes</Text>;

//   return (
//     <ScrollView style={{ flex: 1, padding: 16 }}>
//       <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Notes created by me</Text>
//           <View style={{ marginBottom: 10 }}>
//             <HeaderCard />
//           </View>
//       {/* <FlatList
//         data={data.getUserNotes}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <NoteCard
//             title={item.title}
//             note={item.note}
//             timestamp={item.timestamp}
//             editors={item.editors}
//           />
//         )}
//       /> */}
//         <NoteCard
//           title="Sample Note"
//           note="This is a sample note.\nThis is the second line.\nThis is the third line.\nThis is the fourth line.\nThis is the fifth line."
//           timestamp="10 days ago"
//           editors={['A', 'B', 'C']}
//         />
//     </ScrollView>
//   );
// };

// export default HistoryScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import { useUser } from '../services/contexts/userContext';
import { GET_NOTE_BY_USER } from '../Schema/graphqlQueries';
import { useQuery } from '@apollo/client';

const HistoryScreen = ({navigate, routeName}) => {
    console.log("route name", routeName)
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_NOTE_BY_USER, {
    skip: !user, // Skip the query if user is not available
  });

  useEffect(() => {
    if (data) {
      setNotes(data.getNoteByUser);
    }
  }, [data]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (notes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-xl font-bold mb-4 text-center">Hi, start creating new notes now!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add notes')} 
          className="bg-blue-500 rounded-full px-4 py-2"
        >
          <Text className="text-white text-lg">Add Note</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Notes created by me</Text>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          title={note.title}
          note={note.content}
          timestamp={note.timestamp}
          editors={note.editors}
        />
      ))}
    </ScrollView>
  );
};

export default HistoryScreen;
