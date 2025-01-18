import express, { request, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id:1,username:"anson",displayName:"Anson",age:20},
    {id:2,username:"bary",displayName:"Bary",age:30},
    {id:3,username:"tim",displayName:"Tim",age:40},
    {id:4,username:"jack",displayName:"Jack",age:40}
];

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});



app.get("/api/users",(request,response) => {
    console.log(request.query);
    const {
        query: {filter,value}
    } = request;

    // if(filter && value) // http://localhost:3000/api/users?filter=username&value=an&
    //      return response.send(
    //     mockUsers.filter((user) => user[filter].includes(value))
    // );

    if(filter && value) // http://localhost:3000/api/users?filter=age&value=40
        return response.send(
       mockUsers.filter((user) => user[filter] === parseInt(value))
   );

    return response.send(mockUsers);
});

app.get("/api/users/:id",(request,response) => { // route param
    const parsedId = parseInt(request.params.id);
    if(isNaN(parsedId))
         return response.status(400).send({msg: "Bad Request. Invalid Id."});
    
    const user = mockUsers.find((user) => user.id === parsedId);
    if(!user) return response.sendStatus(404);
    return response.send(user);
});

app.post("/api/users",(request,response) => {
    const { body } = request
    const newUser = {id:mockUsers[mockUsers.length - 1].id + 1, ...body}
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

app.put("/api/user/:id",(request,response)=>{
    const {
        body,
        params: {id},
    } = request;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if(findUserIndex === -1) return response.sendStatus(404);

    mockUsers[findUserIndex] = {id:parsedId,...body};
    return response.sendStatus(200);
});

app.patch("/api/user/:id",(request,response) => {
    const {
        body,
        params: {id},
    } = request;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if(findUserIndex === -1) return response.sendStatus(404);

    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body}
    return response.sendStatus(200);
});

app.delete("/api/user/:id",(request,response)=>{
    const { 
        params: { id },
     } = request;

    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if(findUserIndex === -1) return response.sendStatus(404);

    mockUsers.splice(findUserIndex,1);
    return response.sendStatus(200);
});


