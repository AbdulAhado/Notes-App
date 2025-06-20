import express from 'express';
import Note from '../models/note.js'; // Assuming you have a Note model defined in models/Note.js
import middleware from '../middleware/middleware.js';


const router = express.Router();

router.post('/add', middleware ,async (req, res) => {
    try {
        console.log( req.body);
        const { title, description } = req.body;
        const newNote = new Note({
            title,
            description,
            userId: req.user.id // Assuming req.user is set by authentication middleware 
        })

        await newNote.save();
        return res.status(201).json({ success: true, message: "Note added successfully"});
    } catch (error) {
        console.error("Error adding note:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

});


router.get("/",  middleware ,async(req,res)=>{
    try {
        const notes = await Note.find({ userId: req.user.id }); // Fetch notes for the authenticated user
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})


router.put('/:id', middleware ,async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.delete('/:id',async (req,res) => {
    try {
        const { id } = req.params;
        const updatedNote = await Note.findByIdAndDelete(id);
        return res.status(200).json({ success: true,updatedNote });
    } catch (error) {
        console.log("Error deleting note:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }   
})

export default router;