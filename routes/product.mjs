import { request, response, Router } from "express";

const router = Router();

router.get("/api/products",(request,response) => {
    console.log(request.headers.cookie);
    console.log(request.cookies);
    console.log(request.signedCookies);
    if(request.signedCookies.hello && request.signedCookies.hello === "world")
        response.send([{id:123,name:"Computer",price:250}]);

    return response.status(403).send({msg:"Sorry. You need the correct cookie"});
})

export default router;