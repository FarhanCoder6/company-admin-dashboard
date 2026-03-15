# 🏢 Company Admin Dashboard

A modern and full-featured **Admin Dashboard** built with React.js and Refine Framework. It includes complete user management, authentication system, and data visualization using GraphQL and Ant Design.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Ant Design](https://img.shields.io/badge/Ant%20Design-1890FF?style=for-the-badge&logo=antdesign&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📸 Preview

![Dashboard Preview](https://github.com/FarhanCoder6/company-admin-dashboard/blob/c575fb8051dcc287893cab4663ec7c2816b09f74/image%20dahborad.PNG)

---

## ✨ Features

- 🔐 **Authentication System** — Secure login and logout with access control
- 👥 **User Management** — Full CRUD operations for managing users
- 📊 **Data Visualization** — Interactive charts and analytics
- 📱 **Fully Responsive** — Works seamlessly on all screen sizes
- ⚡ **Fast & Optimized** — Built with Vite for blazing fast performance
- 🌐 **GraphQL Integration** — Efficient data fetching and real-time updates

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
|-----------------|--------------------------------|
| React.js         | Frontend UI library            |
| TypeScript       | Type-safe development          |
| Refine Framework | Admin panel & CRUD operations  |
| Ant Design       | UI component library           |
| GraphQL          | API data fetching              |
| Vite             | Build tool                     |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18 or higher
- **npm** or **yarn**

### Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/FarhanCoder6/company-admin-dashboard.git

# Step 2: Navigate to project folder
cd company-admin-dashboard

# Step 3: Install dependencies
npm install

# Step 4: Start development server
npm run dev
```

Now open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 📁 Project Structure

```
company-admin-dashboard/
├── public/                      # Static assets
├── src/
│   ├── providers/               # Auth & data providers
│   │   ├── auth.ts              # Authentication provider
│   │   └── index.ts
│   ├── utilities/               # Helper functions
│   │   ├── date/
│   │   │   ├── get-date-colors.ts
│   │   │   └── index.ts
│   │   ├── currency-number.ts
│   │   ├── get-name-initials.ts
│   │   ├── get-random-color.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # Entry point
│   └── vite-env.d.ts
├── .gitignore
├── .npmrc
├── Dockerfile
├── eslint.config.js
├── graphql.config.ts            # GraphQL configuration
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

