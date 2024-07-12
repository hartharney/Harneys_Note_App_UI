// NewNoteCard.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ADD_NOTE } from '../Schema/graphqlQueries';
import Toast from 'react-native-toast-message';
import { useMutation } from '@apollo/client';

const NewNoteCard = ({ onSave }) => {
const [addNoteMutation, { data, error }] = useMutation(ADD_NOTE);
  const [title, setTitle] = useState('Add New Note');
  const [content, setContent] = useState('');
  const [sharedUsers, setSharedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
      


  const handleSave = async () => {
    setLoading(true);
    try {
      const newNote = { title, content, sharedUsers };
      console.log("new note", newNote)
      const response = await addNoteMutation({ variables: { input: newNote } });

      console.log("response", response)

      if (response && response.data.addNote) {
        setTitle('Add New Note');
        setContent('');
        setSharedUsers([]);

        if (onSave) {
          onSave(newNote);
        }

        Toast.show({
          type: 'success',
          text1: 'Note Added',
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add note',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Error saving note:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add note',
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="bg-blue-100 p-4 rounded-lg shadow-lg w-full mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="create-outline" size={24} color="#000" />
          <TextInput
            className="ml-2 text-lg font-bold text-gray-900"
            placeholder="Type your note here..."
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons name="checkmark-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TextInput
        className="bg-white p-2 rounded-lg text-gray-900 h-32 border border-dotted border-gray-400"
        multiline
        placeholder="Type your note here..."
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
};

export default NewNoteCard;
