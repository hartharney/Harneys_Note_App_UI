import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNotes } from '../services/contexts/noteContext';
import Toast from 'react-native-toast-message';

const NoteCard = ({ title, note, timestamp, noteId}) => {
  const { updateNote, updateNoteLoading, deleteNote, deleteNoteLoading } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(note);
  const [loading, setLoading] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    setLoading(deleteNoteLoading);
    const id = noteId

    try {
      const response = await deleteNote(id);
        if(response) {
        setLoading(deleteNoteLoading)
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Note deleted successfully',
        });
      }
    } catch (error) {
      setLoading(deleteNoteLoading)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete note',
      });
    }
  }

   if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSave = async () => {
    setIsEditing(false);
    const editedNote = { id: noteId, title: editedTitle, content: editedContent };
    try {
      const response = await updateNote(editedNote);
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Note updated successfully',
        });
      }
    } catch (error) {
      console.error('Error updating note:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error updating note',
      });
    }
  };


//   // Function to get initials from editor's name
//   const getInitials = (name) => {
//     return name ? name.charAt(0).toUpperCase() : '';
//   };

  return (
    <View style={{ backgroundColor: '#FFED4A', padding: 16, borderRadius: 8, marginBottom: 16 }}>
      <TouchableOpacity onPress={toggleEdit} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="pencil-outline" size={18} color="black" />
          <TextInput onChangeText={setEditedTitle} style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>{title}</TextInput>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="share-outline" size={18} color="black" style={{ marginRight: 16 }} />
          <Ionicons name="trash-outline" size={18} color="black" onPress={handleDelete} />
        </View>
      </TouchableOpacity>

      {isEditing ? (
        <View>
          <TextInput
            multiline
            numberOfLines={4}
            value={editedContent}
            onChangeText={setEditedContent}
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 8 }}
          />
          <TouchableOpacity onPress={handleSave} style={{ alignSelf: 'flex-end', padding: 8 }}>
            <Ionicons name="save-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleEdit} style={{ marginBottom: 8 }}>
          <FlatList
            data={editedContent.split('\n').slice(0, 4)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 4 }}>{item}</Text>
            )}
          />
          <Text style={{ fontSize: 14, color: '#666' }}>...</Text>
        </TouchableOpacity>
      )}

      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#888' }}>{timestamp}</Text>
        {editors.length > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>{getInitials(editors[0])}</Text>
            </View>
            <Text style={{ fontSize: 10, color: '#888', marginLeft: 4 }}>{editors.length > 1 ? `+${editors.length - 1}` : ''}</Text>
          </View>
        )}
      </View> */}
    </View>
  );
};

export default NoteCard;
