import { mockUsers } from "../utils/constants.mjs";

export const loggingMiddleware = (request,response,next) => {
    console.log(`${request.method} - ${request.url}`); // output => (GET || POST ...) - /api/users...
    next();
}

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