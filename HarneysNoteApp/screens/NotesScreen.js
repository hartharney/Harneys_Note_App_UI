import React, { useState } from 'react';
import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import HeaderCard from '../components/HeaderCard';
import NoteCard from '../components/NoteCard';
import NewNoteCard from '../components/NewNoteCard';

const NotesScreen = ({ route, navigation }) => {
  const [note, setNote] = useState('');

  const saveNote = () => {
    route.params.saveNote(note);
    navigation.goBack();
  };

  const handleSaveNewNote = ({ title, note }) => {
    // Handle saving the new note
    console.log('New note saved:', title, note);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust as needed
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <View style={{ marginBottom: 10 }}>
            <HeaderCard />
          </View>
        <View style={{ marginBottom: 10 }}>
          <NewNoteCard onSave={handleSaveNewNote} />
        </View>
        <NoteCard
          title="Sample Note"
          note="This is a sample note.\nThis is the second line.\nThis is the third line.\nThis is the fourth line.\nThis is the fifth line."
          timestamp="10 days ago"
          editors={['A', 'B', 'C']}
        />
        {/* Add more NoteCard components or other content as needed */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NotesScreen;