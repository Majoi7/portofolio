# Supabase RLS Fix Summary

## Issues Fixed

### 1. Missing INSERT Policies Causing 401 Errors
**Problem**: POST requests to Supabase `/rest/v1/settings` and `/rest/v1/admin_auth` endpoints were returning 401 Unauthorized errors due to missing Row Level Security (RLS) policies for INSERT operations.

**Root Cause**: The existing `rls-policies.sql` file only contained SELECT policies and lacked INSERT policies for:
- settings table (needed for initial data synchronization)
- admin_auth table (needed for admin authentication status storage)

**Solution**: Added the following policies to `supabase/rls-policies.sql`:

```sql
-- Politique d'insertion publique pour settings (à restreindre selon besoin)
drop policy if exists "Public insert settings" on settings;
create policy "Public insert settings" on settings
  for insert to anon, authenticated
  with check (true);

-- Politique d'insertion restreinte pour admin_auth (authentifié uniquement)
drop policy if exists "Auth insert admin_auth" on admin_auth;
create policy "Auth insert admin_auth" on admin_auth
  for insert to authenticated
  with check (true);

-- Grants explicites pour l'insertion
grant insert on settings, admin_auth to anon, authenticated;
```

### 2. Documentation Update
**Problem**: The README.md file did not indicate that the RLS policy script needs to be re-executed after modifications.

**Solution**: Updated `supabase/README.md` to include:
> **Important**: Whenever this file is modified, you must re-execute the SQL commands in the Supabase SQL Editor to apply the changes.

## Files Modified
1. `supabase/rls-policies.sql` - Added INSERT policies for settings and admin_auth tables
2. `supabase/README.md` - Updated documentation to mention re-execution requirement

## Verification
✅ Frontend uses correct anon key (verified in `src/lib/supabase.ts` and `.env`)  
✅ Build succeeds: `npm run build` completes without errors  
✅ No existing functionality removed or broken  
✅ All policies properly formatted and compatible with existing RLS setup  

## Next Steps
To apply these fixes in your Supabase project:
1. Copy the contents of `supabase/rls-policies.sql`
2. Paste into the SQL Editor in your Supabase dashboard
3. Execute the script to apply the new RLS policies