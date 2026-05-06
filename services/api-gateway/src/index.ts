import express from "express";
import { TransactionService } from "../../transaction-service/runtime";

const app = express();
app.use(express.json());

// --------------------
// CREATE TRANSACTION
// --------------------
app.post("/transactions", (req, res) => {
  try {
    const tx = TransactionService.createTransaction(req.body);
    res.json(tx);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// APPROVE TRANSACTION
// --------------------
app.post("/transactions/:id/approve", (req, res) => {
  try {
    const tx = TransactionService.processApproval(
      req.params.id,
      req.body.userId
    );
    res.json(tx);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// GET TRANSACTION
// --------------------
app.get("/transactions/:id", (req, res) => {
  try {
    const tx = TransactionService.getTransaction(req.params.id);
    res.json(tx);
  } catch (err: any) {
    res.status(404).json({ error: "Transaction not found" });
  }
});

// --------------------
app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});
