# Ticket Management Backend

This project was built using Symfony and is part of the Ticket Management System.  
The backend handles all the business logic, database operations, and exposes a secure REST API for managing tickets.

## Development Server

To start a local development server, run:

```bash
# Navigate to the backend directory if not already there
cd backend

# Install PHP dependencies using Composer
composer install

# Copy the environment file and configure your database settings
cp .env .env.local

# Create the database (if it does not exist)
php bin/console doctrine:database:create

# Run migrations to update the database schema
php bin/console doctrine:migrations:migrate

# Start the Symfony development server
symfony server:start
