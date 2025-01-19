import { Router } from "express";
import usersRouter from "./users.mjs";
import productsRouter from "./product.mjs";
import { loggingMiddleware } from "../middlewares/middlewares.mjs";

const router = Router();

// Global middleware - Middleware Type 1
router.use(loggingMiddleware);

router.use(usersRouter);
router.use(productsRouter);

export default router;


//Chain Middleware (Middleware Type 2)
// app.use(loggingMiddleware,(request,response,next) => {
//     console.log("Finished Logging");
//     next();
// });