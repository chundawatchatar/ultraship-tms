# Task - Full stack

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Shadcn
- **Backend**: Node.js, Express, TypeScript, GraphQL, Prisma, Postgres
- **Monorepo**: Turborepo, pnpm workspaces

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation and Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/chundawatchatar/ultraship-tms.git
    cd ultraship-tms
    ```

2.  **Setup project:**
    ```sh
    pnpm dx
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project by using **.env.example** file.
    ```sh
    cp .env.example .env
    ```

### Running the Application

To start both the frontend and backend in development mode, run:

```sh
pnpm dev
```

The web app will be available at `http://localhost:5173` and the API at `http://localhost:4000`.
