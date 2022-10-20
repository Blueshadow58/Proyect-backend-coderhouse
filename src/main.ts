import express, { Express, json, Request, Response } from "express";
import session from "express-session";
import { page404 } from "./middlewares/page404.js";
import cors from "cors";
const app: Express = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import { productsRouter } from "./routes/productsRouter.js";
import { cartsRouter } from "./routes/cartsRouter.js";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

// -----------------------------------------------------------------------------------------------------------------------------
// Persistencia en mongo
import { default as connectMongoDBSession } from "connect-mongodb-session";
const MongoDBStore = connectMongoDBSession(session);

// Session
app.use(
  session({
    store: new MongoDBStore({
      uri: "mongodb+srv://testSession:testSession@cluster0session.qvvgcq4.mongodb.net/?retryWrites=true&w=majority",
      collection: "sessions",
    }),
    secret: "mongo",
    resave: false,
    saveUninitialized: true,
    // 10 min
    cookie: { maxAge: 600000 },
  })
);

// Session middleware
app.use((req: any, res, next) => {
  req.isAuthenticated = () => {
    if (req.session.name) {
      return true;
    } else {
      return false;
    }
  };
  req.logout = (done: any) => {
    req.session.destroy(done);
  };
  next();
});

// DB
const usuarios: any[] = [];
app.post("/register", (req, res) => {
  const { name, password } = req.body;
  const usuario = usuarios.find((usuario) => usuario.name === name);
  if (usuario) {
    // this users already exist
    return res.send(false);
  }
  usuarios.push({ name, password });
  // adding new user
  return res.send(true);
});

app.post("/login", (req: any, res) => {
  const { name, password } = req.body;

  console.log(req.session);

  const usuario = usuarios.find(
    (usuario) => usuario.name == name && usuario.password == password
  );
  if (!usuario) {
    // the user donest exist
    return res.send(false);
  }
  req.session.name = name;
  // active user
  req.user = usuarios.find((usuario) => usuario.name == req.session.name);

  return res.send(req.user);
});

app.get("/logout", (req: any, res) => {
  req.logout((err: any) => {
    return res.send(false);
  });
});

// -----------------------------------------------------------------------------------------------------------------------------

// send 404 if donest exist other routes
app.use(page404);

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
server.on("error", (error) => console.log(`Error in server ${error}`));
