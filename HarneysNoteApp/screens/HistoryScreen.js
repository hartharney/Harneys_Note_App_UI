import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import { useNotes } from '../services/contexts/noteContext'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const HistoryScreen = () => {
  const { userNotes, loading, refetchUserNotes } = useNotes(); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        await refetchUserNotes(); 
      } catch (error) {
        console.error('Error fetching user notes:', error);
      }
    };

    fetchUserNotes();
  }, [refetchUserNotes]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (userNotes.length === 0) {
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
      data={userNotes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteCard
          key={item.id}
          title={item.title}
          note={item.content}
          timestamp={item.timestamp}
          noteId={item.id}
        />
      )}
      ListHeaderComponent={
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Notes created by me</Text>
        </View>
      }
      ListFooterComponent={
        <TouchableOpacity
          onPress={() => console.log('Load more data')} 
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
      className='px-5'
    />
  );
};

export default HistoryScreen;
