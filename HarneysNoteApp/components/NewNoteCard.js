// NewNoteCard.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NewNoteCard = ({ onSave }) => {
  const [title, setTitle] = useState('Add New Note');
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave({ title, note });
    }
  };

  return (
    <View className="bg-blue-100 p-4 rounded-lg shadow-lg w-full mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Ionicons name="create-outline" size={24} color="#000" />
          <TextInput
            className="ml-2 text-lg font-bold text-gray-900"
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
        value={note}
        onChangeText={setNote}
      />
    </View>
  );
};

export default NewNoteCard;
