import { Router } from "express";
import { checkSchema,validationResult,matchedData,body } from "express-validator";
import { getUserValidationSchema,createUserValidationSchema} from "../utils/validationSchemas.mjs"; 
import {loggingMiddleware,resolveIndexByUserId} from "../middlewares/middlewares.mjs";
import { mockUsers} from "../utils/constants.mjs";

const router = Router();


router.get("/",(request,response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.cookie("hello","world",{maxAge:60000 * 60,signed:true});
    response.status(201).send({msg:"Hello"});
});


router.get("/api/users",checkSchema(getUserValidationSchema),loggingMiddleware,(request,response) => { 
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


router.get("/api/users/:id",resolveIndexByUserId,(request,response) => { // route param
    const {findUserIndex} = request;
    const user = mockUsers[findUserIndex];
    if(!user) return response.sendStatus(404);
    return response.send(user);
});

router.post("/api/users",checkSchema(createUserValidationSchema),(request,response) => {
    const result = validationResult(request);
    console.log(result);

    if(!result.isEmpty()) return response.status(400).send({ errors:result.array() });
    
    const data = matchedData(request);
    const newUser = {id:mockUsers[mockUsers.length - 1].id + 1, ...data}
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
}); 

router.put("/api/user/:id",resolveIndexByUserId,(request,response)=>{
    const { body,findUserIndex } = request;
    mockUsers[findUserIndex] = {id:mockUsers[findUserIndex].id,...body};
    return response.sendStatus(200);
});

router.patch("/api/user/:id",resolveIndexByUserId,(request,response) => {
    const { body,findUserIndex} = request;

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body}
    return response.sendStatus(200);
});

router.delete("/api/user/:id",resolveIndexByUserId,(request,response)=>{
    const { findUserIndex } = request;

    mockUsers.splice(findUserIndex,1);
    return response.sendStatus(200);
});


export default router;