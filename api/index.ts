import express from 'express';
import cors, {CorsOptions} from 'cors';
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);


const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};

run().catch(console.error);

