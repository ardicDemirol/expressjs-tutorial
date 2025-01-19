import express from "express";
import {query,validationResult,body,matchedData,checkSchema} from "express-validator";
import { createUserValidationSchema ,getUserValidationSchema} from "./utils/validationSchemas.mjs"; 

const app = express();

app.use(express.json());

const loggingMiddleware = (request,response,next) => {
    console.log(`${request.method} - ${request.url}`); // output => (GET || POST ...) - /api/users...
    next();
}

// Global middleware - Middleware Type 1
app.use(loggingMiddleware);

//Chain Middleware (Middleware Type 2)
app.use(loggingMiddleware,(request,response,next) => {
    console.log("Finished Logging");
    next();
});

const resolveIndexByUserId = (request,response,next) => { // Middleware Type 3
    const{
        body,
        params: {id},
    } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if(findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next();
};

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id:1,username:"anson",displayName:"Anson",age:20},
    {id:2,username:"bary",displayName:"Bary",age:30},
    {id:3,username:"tim",displayName:"Tim",age:40},
    {id:4,username:"jack",displayName:"Jack",age:40}
];

app.listen(PORT, () => { console.log(`Running on port ${PORT}`); });


// Middleware Type 4
app.get("/api/users",checkSchema(getUserValidationSchema),loggingMiddleware,(request,response) => { 
    const result = validationResult(request);
    console.log(result); 

    if(!result.isEmpty()) return response.status(400).send({ errors:result.array() });

    const {
        query: {filter,value}
    } = request;

    if(filter && value) // http://localhost:3000/api/users?filter=username&value=an&
         return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );

//     if(filter && value) // http://localhost:3000/api/users?filter=age&value=40
//         return response.send(
//        mockUsers.filter((user) => user[filter] === parseInt(value))
//    );

    return response.send(mockUsers);
});

app.get("/api/users/:id",resolveIndexByUserId,(request,response) => { // route param
    const {findUserIndex} = request;
    const user = mockUsers[findUserIndex];
    if(!user) return response.sendStatus(404);
    return response.send(user);
});

app.post("/api/users",checkSchema(createUserValidationSchema),(request,response) => {
    const result = validationResult(request);
    console.log(result);

    if(!result.isEmpty()) return response.status(400).send({ errors:result.array() });
    
    const data = matchedData(request);
    const newUser = {id:mockUsers[mockUsers.length - 1].id + 1, ...data}
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
}); 

app.put("/api/user/:id",resolveIndexByUserId,(request,response)=>{
    const { body,findUserIndex } = request;
    mockUsers[findUserIndex] = {id:mockUsers[findUserIndex].id,...body};
    return response.sendStatus(200);
});

app.patch("/api/user/:id",resolveIndexByUserId,(request,response) => {
    const { body,findUserIndex} = request;

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body}
    return response.sendStatus(200);
});

app.delete("/api/user/:id",resolveIndexByUserId,(request,response)=>{
    const { findUserIndex } = request;

    mockUsers.splice(findUserIndex,1);
    return response.sendStatus(200);
});


// body("username")
//         .isString().withMessage("Username must be string")
//         .notEmpty().withMessage("Username cannot be empty")
//         .isLength({min:3,max:20}).withMessage("Username must be at least 5 characters with a max of 20 characters"),
//     body("age")
//         .isInt({ min: 0, max: 99 }).withMessage("age must be in 0-99 range")
//         .notEmpty().withMessage("age must not be empty")
//         .isEAN().withMessage("age must not be null"), // Null validation
 

// query("filter")
//         .isString().notEmpty().withMessage("Filter must not be empty")
//         .isLength({min:3,max:15}).withMessage("Must be at lest 3-10 characters"),
   