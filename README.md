🏦 Mini Custody System 

A simplified digital asset custody platform that demonstrates how institutional systems handle transaction approvals, signing, and auditability.

This project is inspired by real-world infrastructure built by companies like Fireblocks, and focuses on the core primitives behind secure asset management.

🚀 Overview

This system simulates a custody workflow where:

Transactions are created by users
Multiple parties must approve a transaction (M-of-N model)
Once approved, the transaction is signed
All actions are recorded for auditing

It’s a simplified version of how financial institutions manage digital assets securely.

🧠 Key Concepts Demonstrated
Transaction lifecycle management
Multi-party approval systems (2-of-3 style)
Separation of concerns across services
Signing pipelines
Audit logging
Early-stage microservice architecture
🏗️ Architecture

The system is structured as a modular backend:

services/
  api-gateway/         # HTTP interface (entry point)
  transaction-service  # Core state machine (source of truth)
  key-service          # Handles transaction signing
  audit-service        # Logs all system events
  approval-service     # (Planned) approval rules & policies
  wallet-service       # (Planned) wallet management

packages/
  types/               # Shared TypeScript types
  chain-adapters/      # (Planned) blockchain integrations
  utils/               # Shared utilities
⚙️ How It Works
1. Transaction Creation

A transaction is created with:

sender (from)
receiver (to)
amount

Initial state:

PENDING_APPROVAL
2. Approval Flow

Each transaction requires multiple approvals.

Example (2 approvals required):

PENDING_APPROVAL
   ↓
(add approvals)
   ↓
APPROVED
3. Signing

Once approval threshold is met:

APPROVED → SIGNED

A mock signature is generated:

"signature": "mock-signature-<timestamp>"
4. Audit Logging

Every important action is logged:

Transaction created
Approval added
Transaction signed
🔁 Transaction Lifecycle
CREATE → PENDING_APPROVAL
          ↓
      approvals ≥ threshold
          ↓
       APPROVED
          ↓
        SIGNED
🧪 Running the Project
Install dependencies
npm install
Start the API server
cd services/api-gateway
npx ts-node src/index.ts

Server will run at:

http://localhost:3000
🔌 API Endpoints
Create Transaction
POST /transactions

Body:

{
  "id": "tx1",
  "from": "alice",
  "to": "bob",
  "amount": 100
}
Approve Transaction
POST /transactions/:id/approve

Body:

{
  "userId": "user1"
}
Get Transaction
GET /transactions/:id
🧪 Example Flow
Create transaction
Approve with user1
Approve with user2
Retrieve final transaction

Expected final state:

{
  "id": "tx1",
  "status": "SIGNED",
  "approvals": ["user1", "user2"],
  "signature": "mock-signature-..."
}
⚠️ Limitations

This is a prototype meant for learning and demonstration:

Uses in-memory storage (no database)
No real cryptographic signing
No authentication or authorization
Services are not fully isolated (monorepo setup)
Not production-ready
🔮 Future Improvements
Persistent storage (PostgreSQL / Redis)
Real multi-signature or MPC-based signing
Authentication & role-based access control
Event-driven architecture (queues/streams)
Dockerized microservices
Blockchain integration (EVM, Solana)
Policy engine for approval workflows
Web dashboard for monitoring
🎯 Purpose

This project is designed to help understand how modern custody systems are built:

How approvals are enforced
How signing is controlled
How transactions move through secure pipelines

It’s a foundation for building more advanced financial or Web3 infrastructure.
