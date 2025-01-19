export const mockUsers = [
    {id:1,username:"anson",displayName:"Anson",age:20,password:"hello123"},
    {id:2,username:"bary",displayName:"Bary",age:30,password:"hello456"},
    {id:3,username:"tim",displayName:"Tim",age:40,password:"hello789"},
    {id:4,username:"jack",displayName:"Jack",age:40,password:"helloolleh"}
];

export const resolveIndexByUserId = (request,response,next) => { // Middleware Type 3
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