"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const admin_router_1 = __importDefault(require("./routers/admin.router"));
const movie_router_1 = __importDefault(require("./routers/movie.router"));
const ticket_router_1 = __importDefault(require("./routers/ticket.router"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv_1.default.config();
const URI = process.env.MONGO_URI;
const app = (0, express_1.default)();
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Movie Booking App Server",
            version: "1.0.0",
        },
        servers: [
            {
                api: "http://localhost:5001/",
            },
        ],
    },
    apis: ["./index.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5137"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static("src/public"));
app.use("/api/users", user_router_1.default);
app.use("/api/admin", admin_router_1.default);
app.use("/api/movie", movie_router_1.default);
app.use("/api/ticket", ticket_router_1.default);
mongoose_1.default
    .connect(URI)
    .then(() => {
    console.log("database is connected");
})
    .catch((err) => {
    console.log(err);
});
app.listen(port, () => {
    console.log(`The server is running on port number ${port}....`);
    (0, swagger_1.default)(app, port);
});
