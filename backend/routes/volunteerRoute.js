import express from 'express'
import { apply } from '../controllers/volunteerController.js';

const volunteerRouter = express.Router();

volunteerRouter.post("/apply", apply);

export default volunteerRouter;