import { request, response, Router } from "express";

const router = Router();

router.get("/api/products",(request,response) => {
    response.send([{id:123,name:"Computer",price:250}]);
})

export default router;