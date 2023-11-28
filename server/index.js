const express = require('express');
const cors = require("cors");
require("dotenv").config();

// Reg-Log
const regLogService = express();
regLogService.use(express.json());
regLogService.use(cors());

const RegLog = require("./Router/RegLog/reg_log")
regLogService.use("/", RegLog);

const regLogServicePort = 5000;
regLogService.listen(process.env.PORT1 || regLogServicePort, () => {
  console.log(`Reg/Log service running on port ${regLogServicePort}`);
});

// User
const userService = express();
userService.use(express.json());
userService.use(cors());

const User = require("./Router/Users/user")
const Contact = require("./Router/Contact/contact")

userService.use("/", User);
userService.use("/", Contact);

const userServicePort = 5001;
userService.listen(process.env.PORT2 || userServicePort, () => {
  console.log(`User service running on port ${userServicePort}`);
});

//CreateShirt
const createShirtService = express();
createShirtService.use(express.json());
createShirtService.use(cors());

const CreateShirt = require("./Router/Shirt/createshirt")
createShirtService.use("/", CreateShirt);

const createShirtServicePort = 5002;
createShirtService.listen(process.env.PORT3 || createShirtServicePort, () => {
  console.log(`CreateShirt service running on port ${createShirtServicePort}`);
});

// Basket
const basketService = express();
basketService.use(express.json());
basketService.use(cors());

const Basket = require("./Router/Product/product")
basketService.use("/", Basket);

const basketServicePort = 5003;
basketService.listen(process.env.PORT4 || basketServicePort, () => {
  console.log(`Basket service running on port ${basketServicePort}`);
});

// GraphQL

const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas/index");

const graphQL = express();

graphQL.use(cors());
graphQL.use(express.json());
graphQL.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const graphQLPort = 5004;
graphQL.listen(process.env.PORT5 || graphQLPort, () => {
  console.log(`GraphQL service running on port ${graphQLPort}`);
});