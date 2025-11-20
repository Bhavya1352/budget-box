# 📊 BudgetBox - Offline-First Personal Budgeting App

> **Assignment Name:** BudgetBox  
> **Role:** Frontend / Fullstack Developer  
> **Goal:** Build a real, working Offline-First Personal Budgeting App

## 🎯 Overview

BudgetBox is a modern, offline-first personal budgeting application that works seamlessly without internet connectivity. Built with React, TypeScript, and Tailwind CSS, it provides beautiful analytics and never loses your data.

### ✨ Key Features

- **🔄 Offline-First Architecture** - Works completely offline, auto-saves every keystroke
- **📊 Beautiful Analytics Dashboard** - Real-time insights with interactive charts
- **🔥 Burn Rate Analysis** - Track spending patterns and financial health
- **💸 Savings Potential Calculator** - Identify opportunities to save money
- **📅 Month-End Predictions** - Smart forecasting based on current trends
- **🍰 Category Breakdown** - Visual pie charts and expense distribution
- **⚠️ Anomaly Warnings** - Rule-based alerts for unusual spending patterns
- **💡 Smart Suggestions** - AI-powered recommendations for better budgeting
- **🔄 Sync When Online** - Seamless data synchronization when network returns
- **📱 PWA Ready** - Install as a native app on any device

## 📁 Project Structure

```
budget-box/
├── frontend/          # React + TypeScript + Tailwind
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js + Express API
│   ├── server.js
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for modern styling
- **Zustand** for state management
- **LocalForage** for IndexedDB storage
- **Recharts** for beautiful data visualization
- **Lucide React** for consistent icons

### Backend (Optional)
- **Node.js** with Express or **FastAPI** (Python)
- **PostgreSQL** for server-side storage
- REST API endpoints for sync functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with IndexedDB support

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/budget-box.git
cd budget-box

# Frontend Setup
cd frontend
npm install
npm run dev

# Backend Setup (separate terminal)
cd ../backend
npm install
npm run dev
```

### Demo Login Credentials
```
Email: hire-me@anshumat.org
Password: HireMe@2025!
```

## 📱 Usage Guide

### 1. Add Monthly Budget
Navigate to the Budget Form and enter your financial information:
- **Income**: Monthly income after tax
- **Monthly Bills**: Rent, EMI, utilities, insurance
- **Food & Dining**: Groceries, restaurants, food delivery
- **Transport**: Fuel, cab, public transport, maintenance
- **Subscriptions**: OTT, SaaS, apps, memberships
- **Miscellaneous**: Shopping, entertainment, others

### 2. View Analytics Dashboard
Get instant insights with:
- **🔥 Burn Rate**: Percentage of income spent
- **💸 Savings Potential**: Amount you can save or deficit
- **📅 Month-End Prediction**: Expected surplus/deficit
- **🍰 Category Pie Chart**: Visual breakdown of expenses
- **⚠️ Anomaly Warnings**: Alerts for unusual spending patterns

### 3. Sync & Export
- **Sync to Server**: Upload local data when online
- **Export JSON**: Download your data for backup
- **Status Indicators**: Track sync status (Local Only, Sync Pending, Synced)

## 🏗️ Architecture

### Local-First Design
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Zustand       │    │   IndexedDB     │
│                 │◄──►│   Store         │◄──►│   (LocalForage) │
│ - Components    │    │                 │    │                 │
│ - UI/UX         │    │ - State Mgmt    │    │ - Offline       │
│ - Interactions  │    │ - Auto-save     │    │ - Persistence   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Sync Logic    │
                       │                 │
                       │ - Network Det.  │
                       │ - Conflict Res. │
                       │ - Retry Logic   │
                       └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Backend API   │
                       │                 │
                       │ - REST Endpoints│
                       │ - PostgreSQL    │
                       │ - Data Sync     │
                       └─────────────────┘
```

### Offline Behavior
1. **Auto-save**: Every keystroke is saved to IndexedDB
2. **Offline Indicator**: Visual feedback when offline
3. **Sync Status**: Clear status badges (Local Only, Sync Pending, Synced)
4. **No Blocking**: App never gets stuck waiting for network
5. **Conflict Resolution**: Smart merging when back online

## 🎨 Design System

### Color Palette
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#1e293b` (Slate)
- **Success**: `#22c55e` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Background**: `#f8fafc` (Light Gray)

### Typography
- **Headings**: Poppins (Bold)
- **Body**: Inter (Regular)
- **Numbers**: Tabular Numbers for financial data

### Components
- **Cards**: Soft shadows with rounded corners
- **Inputs**: Focus states with primary color rings
- **Buttons**: Smooth hover transitions
- **Charts**: Professional color scheme
- **Badges**: Status-specific colors

## 📊 Analytics Features

### Burn Rate Calculation
```typescript
burnRate = (totalExpenses / income) * 100
```

### Savings Potential
```typescript
savingsPotential = income - totalExpenses
```

### Anomaly Detection Rules
- Food > 40% of income → "Reduce food spending"
- Subscriptions > 30% → "Consider cancelling unused apps"
- Expenses > Income → "Your expenses exceed income"
- Transport > 25% → "High transport costs detected"

## 🔄 API Endpoints

### Sync Endpoints
```
POST /budget/sync
- Push local data to server
- Request: Budget object
- Response: Success + timestamp

GET /budget/latest
- Fetch latest server version
- Response: Latest budget object
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend Options
- **Railway**: `railway deploy`
- **Render**: Connect GitHub repo
- **Supabase**: Use built-in database + API
- **Fly.io**: `fly deploy`

## 🧪 Testing Offline Mode

1. **Chrome DevTools**:
   - Open DevTools → Network tab
   - Check "Offline" checkbox
   - Verify app continues working

2. **Manual Testing**:
   - Disconnect internet
   - Add/edit budget data
   - Verify "Offline" indicator appears
   - Reconnect and test sync

## 📱 PWA Installation

1. Open app in Chrome/Edge
2. Click install icon in address bar
3. Or use "Add to Home Screen" in mobile browsers
4. App works offline after installation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Recharts** for beautiful data visualization
- **Tailwind CSS** for rapid UI development
- **Zustand** for simple state management
- **LocalForage** for robust offline storage
- **Lucide** for consistent iconography

---

**Built with ❤️ for the internship selection task**

*Demo Login: hire-me@anshumat.org | Password: HireMe@2025!*