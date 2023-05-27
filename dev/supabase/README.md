# Supabase

## TL;DR:

- LoopGate stores Unlockables in a Supabase instance. The data inside can be created/read/updated/deleted with the Supabase JS SDK: a PostgREST client. Ex => `const { data } = await Supabase.from("unlockables_with_criteria").select(`\*`)`
- **Row Level Security (RLS)** applies: only those with the correct credentials should be able to access these methods. Read access for most `tables` and `views` is public, which means the data can be queried from the client using the `anon` key. The other operations require the `service key` or a JWT. These operations are done server-side.

## Managing tables

- New tables cannot be instantiated with the Supabase JS SDK. Instead, they need to be configured from within the supabase web client. The visual builder may be used, but using the SQL editor with documented queries may be more suitable.
- See `/dev/supabase/sql/*` for the SQL used to create/update/delete/test these tables and views.

## Updating types

Use `npm run supabase:types` to update the types in `src/services/supabase/types.ts` 🚀
