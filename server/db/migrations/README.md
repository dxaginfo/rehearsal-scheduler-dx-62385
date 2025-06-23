# Database Migrations

This directory contains SQL migration files for database schema changes. Migrations are applied in sequence based on their numerical prefix.

## Running Migrations

To apply migrations:

```bash
npm run db:migrate
```

## Migration Files

- `001_initial_schema.sql`: Initial database schema with core tables
- `002_add_indexes.sql`: Additional indexes for performance optimization
- `003_add_advanced_features.sql`: Schema updates for newer features