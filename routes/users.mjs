import { Router } from "express";
import { checkSchema } from "express-validator";
import { createUserValidationSchema} from "../utils/validationSchemas.mjs"; 

import { getUserByIdHandler,deleteByIdHandler, patchByIdHandler,putByIdHandler,postHandler,initialHandler,getUsersHandler } from "../handlers/users.mjs";

const router = Router();


router.get("/",initialHandler);


router.get("/api/users", getUsersHandler);


router.get("/api/users/:id", getUserByIdHandler);


router.post("/api/users", checkSchema(createUserValidationSchema), postHandler); 


router.put("/api/user/:id",putByIdHandler);


router.patch("/api/user/:id",patchByIdHandler);


router.delete("/api/user/:id", deleteByIdHandler);


export default router;