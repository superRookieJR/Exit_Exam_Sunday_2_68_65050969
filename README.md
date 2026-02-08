# SupportFlow 🚀

SupportFlow is a modern, high-performance complaint management system designed for food stalls and canteens. It provides a seamless interface for users to report issues and for administrators to track and resolve them in real-time.

## ✨ Features

- **Beautiful Light Mode UI**: A premium, forced-light interface designed for clarity and visual excellence.
- **Real-time Dashboard**: Overview of active and resolved complaints with live statistics.
- **Complaint Management**: Detailed tracking of complaint codes, descriptions, and statuses.
- **Response History**: Threaded communication for each complaint to ensure full transparency.
- **Stall Overview**: Map-linked list of all food stalls with aggregate report counts.

## 🛠 Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router), [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend**: Next.js API Routes, [Prisma ORM](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (v20 or later)
- npm or yarn

### Development Environment

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd 2-68
   ```

2. **Start the Database**:
   Use Docker Compose to spin up the PostgreSQL instance with pre-configured schemas and seeds.
   ```bash
   docker compose -f compose.develop.yaml up -d
   ```

3. **Install Dependencies**:
   ```bash
   cd app
   npm install
   ```

4. **Initialize Prisma**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

### Production Environment

To run the entire stack (Database + Application) in production mode using Docker:

1. **Configure Environment**:
   Ensure your `.env` file in the `app` directory has the correct `DATABASE_URL`.

2. **Spin up with Docker Compose**:
   ```bash
   docker compose -f compose.production.yaml up -d --build
   ```

---

## 📁 Project Structure

- `app/`: Next.js application source code.
  - `app/`: Next.js App Router pages and layouts.
  - `components/`: Reusable UI components (Shadcn UI).
  - `hooks/`: Custom React hooks for data fetching (API controllers).
  - `libs/`: Shared library configurations (Prisma, etc.).
  - `stores/`: Zustand state management.
- `db/`: Database initialization scripts (`init.sql`, `seed.sql`).
- `compose.develop.yaml`: Docker configuration for local development.
- `compose.production.yaml`: Docker configuration for production deployment.

## 🤝 Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
