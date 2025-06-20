import React from "react";
import { useEffect } from "react";
import { useState } from "react";




const NoteModel = ( {onCancel,addNote,currentNote,editNote}) => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

   const handleSubmit = async(e)=>{
        e.preventDefault();      
        if (currentNote) {
          try {
            editNote(e,currentNote._id, title, description);
          } catch (error) {
            
          }
        } else {
           addNote(title, description,e);
        } 
       
}

useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
}, [currentNote])


  return (
   <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center"> {currentNote ?"Edit" : "Add a new note"}</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Note Description"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          { currentNote ? "Update Note ": "Add Note"}
        </button>
        <button
          type="button"
          className="text-red-500 hover:underline"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default NoteModel;
