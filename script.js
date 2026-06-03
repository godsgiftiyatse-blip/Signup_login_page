// =====================
// SUPABASE INIT (FINAL FIX)
// =====================
const SUPABASE_URL = "https://hcgmpsmiqpinayzkvavd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mmAQ4xNdT_acLKyIN9b9Qw_o3nPTSBj";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


// =====================
// SIGNUP
// =====================
window.signup = async function (email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Signup failed: " + error.message);
        throw error;
    }

    alert("Account created! Check your email.");
    window.location.href = "login.html";

    return data;
};


// =====================
// LOGIN
// =====================
window.login = async function (email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Login failed: " + error.message);
        throw error;
    }

    window.location.href = "dashboard.html";
    return data;
};


// =====================
// CHECK USER (DASHBOARD)
// =====================
window.checkUser = async function () {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        window.location.href = "login.html";
        return null;
    }

    const el = document.getElementById("userText");
    if (el) {
        el.innerText = "Logged in as: " + data.user.email;
    }

    return data.user;
};


// =====================
// LOGOUT
// =====================
window.logout = async function () {
    await supabase.auth.signOut();
    window.location.href = "login.html";
};
