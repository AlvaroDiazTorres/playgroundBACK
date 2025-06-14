import { Router } from "express";
import { EventoController } from "../controllers/evento.controller";
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', isAuthenticate, EventoController.getAll);
router.get('/:id', isAuthenticate, EventoController.getById);
router.post('/', isAuthenticate, EventoController.create);
router.put('/:id', isAuthenticate, EventoController.update);
router.delete('/:id', isAuthenticate, EventoController.delete);

export default router; 