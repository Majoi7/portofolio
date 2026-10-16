# Supabase Setup Instructions

This guide explains how to set up Supabase as the backend for the portfolio application.

## Step 1: Create a Supabase Project

1. Go to [Supabase.com](https://supabase.com) and sign up/log in
2. Create a new project
3. Note down your project URL and anonymous public key from Settings → API

## Step 2: Configure Environment Variables

Copy the `.env.example` file to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Then edit `.env` to replace the placeholder values:

```
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

## Step 3: Set up the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `supabase/migrations/001_init_schema.sql`
5. Run the query to create the necessary tables and insert default data

## Step 4: Start the Application

```bash
npm run dev
```

The application will now use Supabase as its backend instead of localStorage.

## Database Tables Created

The schema creates the following tables:

- `settings`: Stores site configuration (wordmark, colors, contact info, etc.)
- `projects`: Stores portfolio projects with case studies
- `technologies`: Stores technology stack information
- `services`: Stores service offerings
- `inquiries`: Stores client inquiries from the contact form
- `admin_auth`: Stores admin authentication state

## Features Enabled

With Supabase integration, the application now offers:

- Real-time persistence across sessions and devices
- Multi-user support (each user sees the same data)
- Automatic backups and data safety
- Potential for real-time subscriptions (future enhancement)
- Better scalability than localStorage

## Troubleshooting

If you encounter connection issues:

1. Verify your Supabase URL and anon key are correct in `.env`
2. Check that the tables have been created successfully in Supabase
3. Ensure your network allows connections to Supabase
4. Check the browser console for any error messages

For development, you can also check the Supabase logs in your project dashboard.