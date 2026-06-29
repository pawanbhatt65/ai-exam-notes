import Notes from "../models/notes.model.js";

// get all notes
export const getMyNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    console.log("notes.controller.js > getMyNotes catch error: ", error);
    res.status(500).json({
      error: "getCurrentNotes error:",
      message: error.message,
    });
  }
};


// fetch a single note with notes id
export const getSingleNotes=async(req, res)=>{
    try {
        const notes = await Notes.findOne({
            _id: req.params.id,
            user: req.userId,
        })

        if (!notes) {
            return res.status(404).json({
                error: "Notes not found."
            })
        }

        return res.json({
            content: notes.content,
            topic: notes.topic,
            createdAt: notes.createdAt,
        })
    } catch (error) {
        console.log("notes.controller.js > getSingleNotes catch error: ", error)
    res.status(500).json({
      error: "getSingleNotes error:",
      message: error.message,
    });
    }
}