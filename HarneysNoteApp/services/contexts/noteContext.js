import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

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

const GET_NOTES_SHARED_WITH_USER = gql`
  query GetNotesSharedWithUser {
    getNotesSharedWithUser {
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

const ADD_NOTE = gql`
  mutation AddNote($input: addNoteInput!) {
    addNote(input: $input) {
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

const UPDATE_NOTE = gql`
    mutation UpdateNote($input: updateNoteInput!) {
        updateNote(input: $input) {
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

const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
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

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [userNotes, setUserNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);

  const { loading: userNotesLoading, error: userNotesError, data: userNotesData, refetch: refetchUserNotes } = useQuery(GET_NOTE_BY_USER);
  const { loading: sharedNotesLoading, error: sharedNotesError, data: sharedNotesData, refetch: refetchSharedNotes } = useQuery(GET_NOTES_SHARED_WITH_USER);
const [addNoteMutation, { data, loading, error }] = useMutation(ADD_NOTE);
const [updateNoteMutation, { data : updateNotedata, loading: updateNoteLoading, error: updateNoteError }] = useMutation(UPDATE_NOTE);
const [deleteNoteMutation, { data: deleteNoteData, loading: deleteNoteLoading, error: deleteNoteError }] = useMutation(DELETE_NOTE);

  useEffect(() => {
    if (userNotesData && userNotesData.getNoteByUser) {
      setUserNotes(userNotesData.getNoteByUser);
    }
  }, [userNotesData]);

  useEffect(() => {
    if (sharedNotesData && sharedNotesData.getNotesSharedWithUser) {
      setSharedNotes(sharedNotesData.getNotesSharedWithUser);
    }
  }, [sharedNotesData]);


  const addNote = async (input) => {
    try {
      const response = await addNoteMutation({ variables: { input } });
      if (response && response.data.addNote) {
        await refetchUserNotes();
      }
      return response.data.addNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw new Error('Failed to add note');
    }
  };

  const updateNote = async (input) => {
    try {

        const response = await updateNoteMutation({ variables: { input} });

        if (response && response.data.updateNote) {
            await refetchUserNotes();
        }
        return response.data.updateNote;
    } catch (error) {
        console.error('Error updating note:', error);
        throw new Error('Failed to update note');
    }
};


const deleteNote = async (id) => {
  try {
    const response = await deleteNoteMutation({ variables: { id } });
      if (response) {
       const outcome =  await refetchUserNotes();
      }
    return response.data.deleteNote;
  } catch (error) {
    console.error("Error deleting note", error);
    throw new Error("Failed to delete note");
  }
}



  return (
    <NotesContext.Provider
      value={{
        userNotes,
        sharedNotes,
        addNote,
        userNotesLoading,
        sharedNotesLoading,
        refetchUserNotes,
        refetchSharedNotes,
        updateNote,
        updateNoteLoading,
        deleteNote,
        deleteNoteLoading
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
