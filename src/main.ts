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
import bcrypt from "bcrypt";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import passport, { use } from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const saltRounds = 10;

// Middlewares

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

// -----------------------------------------------------------------------------------------------------------------------------
// DB
const usuarios: any[] = [];

// -----------------------------------------------------------------------------------------------------------------------------
// Passport

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req: any, username: any, password: any, done: any) => {
      const user = {
        name: "asdasd",
        password: "asdasd",
      };
      usuarios.push(user);
      return done(null, user);
      // console.log("register");
      // const { name, password } = req.body;
      // console.log(name);
      // const usuario = usuarios.find((usuario) => usuario.name == name);

      // if (usuario) {
      //   // this users already exist
      //   return done(null, false);
      // }

      // const user: any = {
      //   name,
      //   password,
      // };

      // bcrypt.genSalt(saltRounds, function (err, salt) {
      //   bcrypt.hash(password, salt, function (err, password) {
      //     // Store hash in your password DB.
      //     usuarios.push(user);
      //   });
      // });

      // // adding new user
      // return done(null, user);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy((req: any, done: any) => {
    const user = {
      name: "asdasd",
      password: "asdasd",
    };
    done(null, user);

    // try {
    //   const { name, password } = req.body;
    //   console.log("login");
    //   const usuario = usuarios.find((usuario) => usuario.name == name);

    //   if (usuario) {
    //     const result = bcrypt.compare(password, usuario.password);
    //     if (!result) {
    //       // the password its not the same
    //       return done(null, false);
    //     }
    //     req.session.name = name;
    //     // active user
    //     req.user = usuarios.find((usuario) => usuario.name == req.session.name);

    //     return done(null, req.user);
    //   } else {
    //     // user dont exist
    //     return done(null, false);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  })
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user.name);
});

passport.deserializeUser(function (name: any, done: any) {
  const usuario = usuarios.find((usuario) => usuario.name == name);
  done(null, usuario);
});

// -----------------------------------------------------------------------------------------------------------------------------
// Persistencia en mongo
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
app.use(passport.initialize());
app.use(passport.session());
// Session middleware
function isAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return false;
  }
}

// Routes
app.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/failregister",
  }),
  function (req, res) {
    res.send(true);
  }
);

app.get("/failregister", (req, res) => {
  res.send(false);
});

// app.get("/login", async (req: any, res) => true);

app.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "/success",
  })
);

app.get("/faillogin", (req, res) => {
  res.send(false);
});

app.get("/success", (req, res) => {
  res.send(true);
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
