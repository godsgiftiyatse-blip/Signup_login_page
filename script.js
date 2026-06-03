// =====================
// SUPABASE INIT (FIXED)
// =====================
const SUPABASE_URL = "https://hcgmpsmiqpinayzkvavd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mmAQ4xNdT_acLKyIN9b9Qw_o3nPTSBj";

// IMPORTANT: use window.supabase from CDN
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
        console.error("Signup error:", error.message);
        throw error;
    }

    return data;
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
        console.error("Login error:", error.message);
        throw error;
    }

    return data;
}


// =====================
// LOGOUT
// =====================
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}


// =====================
// CHECK USER (DASHBOARD PROTECTION)
// =====================
async function checkUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        window.location.href = "login.html";
        return null;
    }

    const el = document.getElementById("userText");
    if (el) {
        el.innerText = "Logged in as: " + data.user.email;
    }

    return data.user;
}


// =====================
// AUTO CHECK SESSION (OPTIONAL)
// =====================
async function checkSessionRedirect() {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        window.location.href = "dashboard.html";
    }
}


// =====================
// OPTIONAL: HANDLE AUTH ROUTING
// =====================
async function handleAuth(email, password, mode) {
    if (mode === "signup") {
        return await signup(email, password);
    } else {
        return await login(email, password);
    }
}
