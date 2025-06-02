import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router:Router = Router();
const controller = new ProductController();

router.get("/Produto", controller.list);
router.get("/Produto/:id", controller.show);
router.post("/Produto", controller.create);
router.delete("/Produto/:id", controller.delete);
router.put("/Produto/:id", controller.update);
router.get("/Produto/:name", controller.shew);

export default router;