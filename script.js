// =====================
// SUPABASE INIT (FIXED)
// =====================
const SUPABASE_URL = "https://hcgmpsmiqpinayzkvavd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mmAQ4xNdT_acLKyIN9b9Qw_o3nPTSBj";

// IMPORTANT: use window.supabase (from CDN)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



// =====================
// SIGNUP
// =====================
async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Signup failed: " + error.message);
        return;
    }

    alert("Account created! Check your email.");
    window.location.href = "login.html";
}



// =====================
// LOGIN
// =====================
async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    window.location.href = "dashboard.html";
}



// =====================
// CHECK USER (DASHBOARD PROTECTION)
// =====================
async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        window.location.href = "login.html";
        return;
    }

    const el = document.getElementById("userText");
    if (el) {
        el.innerText = "Logged in as: " + data.user.email;
    }
}



// =====================
// LOGOUT
// =====================
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}
