#Angular Banking App

A modular, responsive banking web application built with **Angular**, allowing users to manage multiple accounts, transfer funds, and track transactions.

---

## Project Objective

To create a clean and user-friendly Angular-based banking system that supports:

- Creating new accounts (Chequing or Savings)
- Transferring funds between accounts with validations
- Viewing transaction history with pagination and filters

---

## Tech Stack

- **Angular 19**
- **Angular Material** (UI components)
- **RxJS** (state management)
- **SCSS** (modular styling)
- **TypeScript** (type-safe development)

---

## Features

### Account Creation

- Users can create accounts with:
  - **Account Name** (validated: required, length constraints)
  - **Initial Deposit** (validated: > 0)
  - **Account Type**: Chequing / Savings (radio buttons)
- Button changes **styling and rendering** based on account type
- Created accounts update live via **BehaviorSubject** in service

### Fund Transfer

- Select “From” and “To” accounts (validated drop downs)
- Transfer amount validated:
  - Must be positive
  - Must not exceed available balance
- Real-time account balance update using two-way binding
- Transfers logged with date and note

### Transaction History

- Paginated display of recent transactions
- Shows: date, description, amount, involved accounts
- Search by account details (`FormControl`)
- "Previous" and "Next" buttons simulate paging (5 per page)

---

## Folder Structure

src/
├── app/
│ ├── core/ # Enums and Models (Account, Transfer, AccountType)
│ ├── shared/ # Reusable components (ButtonComponent)
│ │ └── button/
│ ├── features/
│ │ ├── account/ # Account creation form & logic
│ │ ├── transfer/ # Transfer funds form
│ │ └── history/ # Transaction history list with filters & pagination
│ ├── services/ # account.service.ts (state & logic handling)
│ ├── app-routing.module.ts # Lazy-loaded routing config
│ └── app.module.ts # Root module setup
├── styles/
│ └── \_media-queries.scss # Mobile/tablet mixins

---

## 🔀 Routing Structure

| Route        | Component           | Purpose                |
| ------------ | ------------------- | ---------------------- |
| `/accounts`  | `AccountComponent`  | Create new account     |
| `/transfers` | `TransferComponent` | Perform fund transfers |
| `/history`   | `HistoryComponent`  | View past transactions |

Lazy loading is used for each module under `features/`.

---

##Smart vs Dumb Components

- **Smart Components** (account, transfer, history): Handle form logic, services, state
- **Dumb Components** (reusable button): Presentation only, accepts `@Input()` props

---

## Validations & UX

- No negative balances allowed
- Transfers only occur if sufficient funds
- Real-time form error feedback using Angular's `Validators`
- Modular SCSS + media queries for full responsiveness
- Elegant styling for each view (cards, lists, tables)

---

## How to Run

### Install dependencies

npm install

### ▶️ Run in development

ng serve

Visit: http://localhost:4200

---

## 🔃 Data Flow

- All account and transaction data is stored in-memory using a **BehaviorSubject**.
- `AccountService` handles:
  - Account creation
  - Transfer logic (with error checks)
  - Balance update
  - Pushing new transactions into history
- Shared across components via dependency injection.

---

## Reusable Button Component

Located in:  
`src/app/shared/components/button/button.component.ts`

- Accepts dynamic `label` and `type`
- Reusable across all forms
- Styling adapted to context (account type)

---

## Developed By

**Harshitha Kosuru**
