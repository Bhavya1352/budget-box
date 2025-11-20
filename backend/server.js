const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Demo user
const DEMO_USER = {
  email: 'hire-me@anshumat.org',
  password: 'HireMe@2025!'
};

// In-memory storage (replace with database)
let budgets = {};

// Routes
app.post('/budget/sync', (req, res) => {
  const { userId, budget } = req.body;
  
  budgets[userId] = {
    ...budget,
    syncStatus: 'synced',
    lastSyncedAt: new Date().toISOString()
  };
  
  res.json({ 
    success: true, 
    timestamp: new Date().toISOString(),
    budget: budgets[userId]
  });
});

app.get('/budget/latest/:userId', (req, res) => {
  const { userId } = req.params;
  const budget = budgets[userId];
  
  if (!budget) {
    return res.status(404).json({ error: 'Budget not found' });
  }
  
  res.json({ budget });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    res.json({ 
      success: true, 
      user: { 
        id: 'demo-user-123',
        email: DEMO_USER.email 
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 BudgetBox Backend running on port ${PORT}`);
});