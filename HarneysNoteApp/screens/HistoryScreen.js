import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import { useUser } from '../services/contexts/userContext';
import { useQuery, gql } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const GET_NOTE_BY_USER = gql`
  query GetNoteByUser {
    getNoteByUser {
      id
      title
      content
      owner {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;

const HistoryScreen = ({ navigate, routeName }) => {
  console.log("route name", routeName);
  const { user } = useUser();
  const [notes, setNotes] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false); 
  const navigation = useNavigation();
  console.log("user", user);

  const { loading, error, data } = useQuery(GET_NOTE_BY_USER, {
    skip: !user,
  });

  useEffect(() => {
    if (data && data.getNoteByUser) {
      setNotes(data.getNoteByUser);
    }
  }, [data]);

  const handleLoadMore = () => {
    console.log("Load more data");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Error fetching notes</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add notes')}
          style={{ backgroundColor: '#007BFF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (notes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Hi, start creating new notes now!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add notes')}
          style={{ backgroundColor: '#007BFF', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Add Note</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteCard
          key={item.id}
          title={item.title}
          note={item.content}
          timestamp={item.timestamp}
          // editors={item.editors} 
        />
      )}
      ListHeaderComponent={
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Notes created by me</Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity
          onPress={handleLoadMore}
          style={{
            backgroundColor: 'black',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginHorizontal: 16,
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 3,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18, marginRight: 8 }}>Load More</Text>
          <Ionicons name="arrow-down" size={18} color="white" />
        </TouchableOpacity>
      }
      className="px-5"
    />
  );
};

export default HistoryScreen;
