import express from "express";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
import {OneNewsType} from "../types";

const newsRouter = express.Router();

newsRouter.get("/", async (req, res, next) => {
    try {
        const allNews = await fileDb.getNews();
        return res.send(allNews);
    } catch (error) {
        next(error);
    }
});

newsRouter.get("/:id", async (req, res, next) => {
    const oneNewsId = req.params.id;
    try {
        const oneNews = await fileDb.getOneNewsById(oneNewsId);
        if (!oneNews) {
            return res.status(404).send({message: "The News not found"});
        }
        return res.send(oneNews);

    } catch (error) {
        next(error);
    }
    return res.send(oneNewsId);
});

newsRouter.post("/", imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send({error: "Title, description must be present in the request"});
    }
    const oneNews: OneNewsType = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
    };
    try {
        const savedOneNews = await fileDb.addOneNews(oneNews);
        return res.send(savedOneNews);
    } catch (error) {
        next(error);
    }
});

newsRouter.delete("/:id", async (req, res, next) => {
    const oneNewsId = req.params.id;

    try {
        await fileDb.deleteCommentsOfNews(oneNewsId);
        await fileDb.deleteOneNews(oneNewsId);

        return res.status(200).send({message: "Item was deleted successfully"});
    } catch (error) {
        next(error);
    }
});

export default newsRouter;