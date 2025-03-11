import { CharacterController } from "@/controllers/character.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { Router } from "express";

const router = Router()
    router.get("/", isAuthenticate, CharacterController.getAll);
    router.get("/:id", isAuthenticate, CharacterController.getById);
    router.post("/", isAuthenticate, ValidationMiddleware, CharacterController.create);
    router.put("/", isAuthenticate, ValidationMiddleware, CharacterController.update);
    router.delete("/:id",isAuthenticate,CharacterController.delete); 
    
export default router