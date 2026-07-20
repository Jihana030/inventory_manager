import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function ping() {
    const { error } = await supabase
        .from("inventory")
        .select("no")
        .limit(1);

    if (error) {
        throw error;
    }

    console.log("✅ Supabase keep-alive success");
}

ping().catch((err) => {
    console.error(err);
    process.exit(1);
});