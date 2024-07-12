import React, { useState } from 'react';
import { ScrollView,View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const NoteCard = ({ title, note, timestamp, editors }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save editedNote to backend or perform save action
    setIsEditing(false);
    // Additional logic for saving
  };

  return (
    <ScrollView style={{ backgroundColor: '#FFED4A', padding: 16, borderRadius: 8, marginBottom: 16 }}>
      <TouchableOpacity onPress={toggleEdit} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="pencil-outline" size={18} color="black" />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>{title}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="share-outline" size={18} color="black" style={{ marginRight: 16 }} />
          <Ionicons name="trash-outline" size={18} color="black" />
        </View>
      </TouchableOpacity>

      {isEditing ? (
        <View>
          <TextInput
            multiline
            numberOfLines={4}
            value={editedNote}
            onChangeText={setEditedNote}
            style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 8 }}
          />
          <TouchableOpacity onPress={handleSave} style={{ alignSelf: 'flex-end', padding: 8 }}>
            <Ionicons name="save-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleEdit} style={{ marginBottom: 8 }}>
          {editedNote.split('\n').slice(0, 4).map((line, index) => (
            <Text key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 4 }}>
              {line}
            </Text>
          ))}
          <Text style={{ fontSize: 14, color: '#666' }}>...</Text>
        </TouchableOpacity>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#888' }}>{timestamp}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {editors.map((editor, index) => (
            <View key={index} style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#ccc', marginLeft: -8, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>{editor}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default NoteCard;
