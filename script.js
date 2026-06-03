// =====================
// SUPABASE SETUP
// =====================
const supabaseUrl = "https://hcgmpsmiqpinayzkvavd.supabase.co";
const supabaseKey = "sb_publishable_mmAQ4xNdT_acLKyIN9b9Qw_o3nPTSBj";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



// =====================
// SIGNUP
// =====================
async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
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
        alert(error.message);
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

    document.getElementById("userText").innerText =
        "Logged in as: " + data.user.email;
}



// =====================
// LOGOUT
// =====================
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}
