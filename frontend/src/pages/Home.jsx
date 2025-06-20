import Navbar from "../components/Navbar";
import { useState } from "react";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useEffect } from "react";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const handleCloseModal = () => setModelOpen(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null)
  const [query, setQuery] = useState("")


  useEffect(() => {
  setFilteredNotes(
    notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
    )
  );
}, [query, notes]);

  useEffect(() => {
    fetchNotes();
  }, []);
  
  
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3030/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
      
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };


  const onEdit = (note) =>{
    setCurrentNote(note);
    setModelOpen(true); 
  }


  const addNote = async (title, description, e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3030/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  you store the token in localStorage
          },
        }
      );
      if (response.data.success) {
        fetchNotes(); // Refresh the notes after adding a new one
        handleCloseModal();
        toast.success("Note Added SuccessFully...")
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };


  const editNote = async (e,id,title, description) => {
    e.preventDefault();
       try {
      const response = await axios.put(
        `http://localhost:3030/api/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  you store the token in localStorage
          },
        }
      );
      if (response.data.success) {
        fetchNotes(); // Refresh the notes after adding a new one
        handleCloseModal();
        toast.success("Note Updated SuccessFully...")
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  const deleteNote = async (e,id) => {
    e.preventDefault();
       try {
      const response = await axios.delete(
        `http://localhost:3030/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //  you store the token in localStorage
          },
        }
      );
      if (response.data.success) {
        fetchNotes(); // Refresh the notes after deleting a note
        toast.success("Note Deleted SuccessFully...")
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 py-10">
        { filteredNotes.length > 0 ?  filteredNotes.map((note,index) => (
          <NoteCard note={note}  key={note._id || note.id || index} onEdit={onEdit} deleteNote={deleteNote}/>
        )) : <p>No Notes</p>}
      </div>
      <div className="">
        <button
          onClick={() => setModelOpen(true)}
          className="fixed  right-4 bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full text-2xl"
        >+</button>
        {isModelOpen && (
          <NoteModel onCancel={handleCloseModal} addNote={addNote} editNote={editNote} currentNote={currentNote} />
        )}
      </div>
    </div>
  );
};

export default Home;
