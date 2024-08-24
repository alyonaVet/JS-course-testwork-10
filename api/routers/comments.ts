import express from "express";

const commentsRouter = express.Router();

commentsRouter.get("/", (req, res) => {
    return res.send("Here are your comments: ");
});

commentsRouter.get("/:id", (req, res) => {
    const comment_id = req.params.id;
    return res.send(comment_id);
});

commentsRouter.post("/", (req, res) => {
    return res.send(req.body);
});

commentsRouter.delete("/:id", (req, res) => {
    const comment_id = req.params.id;
    return res.send(comment_id);
});

export default commentsRouter;