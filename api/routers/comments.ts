import express from "express";
import fileDb from "../fileDb";
import {CommentType} from "../types";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res, next) => {
    try {
        const { news_id } = req.query;

        if (typeof news_id !== 'string') {
            return res.status(400).json({ error: "Invalid or missing news_id parameter" });
        }

        const comments = await fileDb.getComments(news_id);

        res.send(comments);
    } catch (error) {
        next(error);
    }
});

commentsRouter.post("/", async (req, res, next) => {
    try {
        if (!req.body.description) {
            return res.status(400).send({error: "Content must be present in the request"});
        }
        const comment: CommentType = {
            oneNews_id: req.body.oneNews_id,
            author: req.body.author || null,
            description: req.body.description,
        }
        const savedComment = await fileDb.addComment(comment);
        return res.send(savedComment);
    } catch (error) {
        next(error);
    }});

commentsRouter.delete("/:id", async (req, res, next) => {
    const comment_id = req.params.id;
    try {
        await fileDb.deleteComment(comment_id);
        return res.status(200).send({message: "Comment was deleted successfully"});
    } catch (error) {
        next(error);
    }});

export default commentsRouter;