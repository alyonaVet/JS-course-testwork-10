import express from "express";

const newsRouter = express.Router();

newsRouter.get("/", (req, res) => {
    return res.send("Here are your news: ");
});

newsRouter.get("/:id", (req, res) => {
    const new_id = req.params.id;
    return res.send(new_id);
});

newsRouter.post("/", (req, res) => {
    return res.send(req.body);
});

newsRouter.delete("/:id", (req, res) => {
    const new_id = req.params.id;
    return res.send(new_id);
});

export default newsRouter;