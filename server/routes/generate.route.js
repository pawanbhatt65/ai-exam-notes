import express from "express"
import { isAuth } from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/generate.controller.js"
import { getMyNotes, getSingleNotes } from "../controllers/notes.controller.js"

const generateRouter = express.Router()

generateRouter.post('/generate-notes', isAuth,  generateNotes)
generateRouter.get("/getnotes", isAuth, getMyNotes)
generateRouter.get("/:id", isAuth, getSingleNotes)

export default generateRouter