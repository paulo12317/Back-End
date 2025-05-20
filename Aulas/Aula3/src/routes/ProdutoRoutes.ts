import { Router } from "express";
import { criarProduto, deletarProduto, listarProdutos, buscarProdutoPorId, atualizarProduto } from "../controllers/produtoController";

const router = Router();

router.get("/Prod",listarProdutos);
router.post("/Prod", criarProduto);
router.delete("/Prod/:id", deletarProduto);
router.get("/Prod/:id", buscarProdutoPorId);
router.put("/Prod/:id", atualizarProduto);

export default router;