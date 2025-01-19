import Router from "express";
import passport from "passport";

const router = Router();

router.post("/api/auth",passport.authenticate("local"),(request,response) => {
    response.sendStatus(200);
});

router.get("/api/auth/status",(request,response) => {
    console.log(request.user);
    console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);
})

router.post("/api/auth/logout",(request,response) => {
    if(!request.user) return response.sendStatus(401);
    request.logOut((err) => {
        if(err) return response.sendStatus(400);
        response.sendStatus(200);
    });
});

export default router;