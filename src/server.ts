import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import responseTime from "response-time";
import routes from "./routes";

const app = express();
app.use(cors());
app.use((responseTime()));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(3000);
console.log("run server on port 3000");

export default app;
