import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const NoteCard = ({ note , onEdit, deleteNote}) => {
  return (
    <div className="w-full h-3/4 bg-white shadow-2xl rounded-2xl overflow-hidden p-8 flex flex-col justify-between border border-gray-200 min-h-[260px]">
      <div>
        <h2 className="text-2xl font-bold text-teal-700 mb-4">{note.title}</h2>
        <p className="text-gray-700 text-lg">{note.description}</p>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition"
         onClick={()=> onEdit(note)}>
          <FaRegEdit size={20} />
        </button>
        <button className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"  
        onClick={(e)=> deleteNote(e,note._id)}>
          <FaRegTrashAlt size={20}/>
        </button>
      </div>
    </div>
  )
}

export default NoteCard
