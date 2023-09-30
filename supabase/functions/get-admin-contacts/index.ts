import { serve } from 'https://deno.land/std/http/server.ts'

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { validateToken } from '../_shared/jwt-helper.ts'

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    // const supabaseClient = createClient(
    //   // Supabase API URL - env var exported by default.
    //   Deno.env.get('SUPABASE_URL'),
    //   // Supabase API ANON KEY - env var exported by default.
    //   Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    //   // Create client with Auth context of the user that called the function.
    //   // This way your row-level-security (RLS) policies are applied.
    //   { global: { headers: { Authorization: req.headers.get('Authorization') } } }
    // )

    // Now we can get the session or user object
    // const { data: { user } } = await supabaseClient.auth.getUser()

    // OR Validate JWT using secret key and do not call DB
    const user = await validateToken(req)

    const contacts = []

    // Validate if User is Admin
    if (user.app_metadata.role === '1') {
      const supabaseAdminClient = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))

      const { data } = await supabaseAdminClient.from('contacts').select('*')

      if (data?.length) contacts.push(...data)
    }

    // And we can run queries in the context of our authenticated user
    return new Response(JSON.stringify(contacts), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400
    })
  }
})
