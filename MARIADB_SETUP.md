# Connecting The Foragers Calendar to MariaDB

This guide explains how to connect this application to a **MariaDB** (or MySQL) database instead of PostgreSQL using Prisma ORM.

---

## 1. Key Technical Differences (PostgreSQL vs. MariaDB)

| Feature | PostgreSQL | MariaDB / MySQL |
| :--- | :--- | :--- |
| **Prisma Provider** | `provider = "postgresql"` | `provider = "mysql"` |
| **Default Port** | `5432` | `3306` |
| **Scalar Arrays (`String[]`)** | Supported natively | Not supported. Mapped to `Json` (e.g. `habitats Json`) |
| **Long Text Fields** | `TEXT` default | Annotated with `@db.Text` to avoid 191-character limits |
| **Connection URL Scheme** | `postgresql://...` | `mysql://...` |

---

## 2. Step-by-Step Migration to MariaDB

### Step 1: Switch to the MariaDB Prisma Schema
A pre-configured, fully-tested MariaDB schema is included at `prisma/schema.mariadb.prisma`. Copy it over the active schema:

```bash
cp prisma/schema.mariadb.prisma prisma/schema.prisma
```

*(Alternatively, in `prisma/schema.prisma`, change `provider = "postgresql"` to `provider = "mysql"`, and change `habitats String[]` and `savedSpeciesIds String[]` to `Json`).*

### Step 2: Configure your `.env` File
Update `DATABASE_URL` in your `.env` file to point to your MariaDB instance:

```env
# Standard local MariaDB:
DATABASE_URL="mysql://username:password@localhost:3306/foragers_calendar"

# Remote MariaDB or Cloud instance with SSL:
DATABASE_URL="mysql://forager_admin:your_secure_password@db.example.com:3306/foragers_calendar?sslaccept=strict"
```

### Step 3: Create the MariaDB Database
Log into your MariaDB CLI or management console (phpMyAdmin, DBeaver, HeidiSQL) and create the database with UTF-8 character encoding:

```sql
CREATE DATABASE foragers_calendar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Optional: Create a dedicated user with permissions
CREATE USER 'forager'@'%' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON foragers_calendar.* TO 'forager'@'%';
FLUSH PRIVILEGES;
```

### Step 4: Regenerate Prisma Client
Run the Prisma generator to regenerate the client bindings for the `mysql` provider:

```bash
npx prisma generate
```

### Step 5: Push the Schema or Run Migrations
Synchronize the schema with your MariaDB database:

```bash
# Push schema directly (recommended for quick development):
npx prisma db push

# OR create a formal migration:
npx prisma migrate dev --name init_mariadb
```

### Step 6: Seed Verified Species Data
Populate your MariaDB database with the accredited botanical records, seasonal ranges, lookalike distinctions, and citations:

```bash
npm run db:seed
```

### Step 7: Start the Full-Stack Server
```bash
npm run dev
```

The application will now automatically connect to MariaDB for all species queries, regional lookups, and harvest alert triggers. If the database ever goes offline or credentials expire, the app gracefully falls back to the in-memory verified baseline.

---

## 3. MariaDB Connection String Parameters

Prisma's MySQL/MariaDB driver supports several connection parameters in `DATABASE_URL`:

- **Connection limit**: `?connection_limit=10`
- **Connect timeout**: `?connect_timeout=15`
- **SSL configuration**:
  - `?sslaccept=strict` (Verify certificate authority)
  - `?sslaccept=accept_invalid_certs` (For self-signed certificates in development)
- **Socket connection** (Unix socket):
  `DATABASE_URL="mysql://user:pass@localhost/foragers_calendar?socket=/var/run/mysqld/mysqld.sock"`
