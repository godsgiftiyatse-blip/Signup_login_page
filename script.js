// =====================
// SUPABASE INIT
// =====================
const supabaseUrl = "https://hcgmpsmiqpinayzkvavd.supabase.co";
const supabaseKey = "sb_publishable_mmAQ4xNdT_acLKyIN9b9Qw_o3nPTSBj";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// =====================
// SIGNUP
// =====================
async function signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim()
    });

    if (error) {
        alert(error.message);
        return;
    }

    console.log("Signup success:", data);
    alert("Account created! Check your email.");
    window.location.href = "login.html";
}


// =====================
// LOGIN
// =====================
async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
    });

    if (error) {
        alert(error.message);
        return;
    }

    console.log("Login success:", data.user.email);
    window.location.href = "dashboard.html";
}


// =====================
// LOGOUT
// =====================
async function logout() {
    await supabase.auth.signOut();
    window.location.href = "login.html";
}


// =====================
// GET CURRENT USER
// =====================
async function getUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}


// =====================
// PROTECT PAGE (DASHBOARD)
// =====================
async function protectPage() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        window.location.href = "login.html";
    }
}


// =====================
// FORM HANDLERS
// =====================

// LOGIN FORM
async function handleLogin(event) {
    event.preventDefault();

    const button = event.target.querySelector("button");
    button.disabled = true;
    button.innerText = "Logging in...";

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    await login(email, password);

    button.disabled = false;
    button.innerText = "Login";
}


// SIGNUP FORM
async function handleSignup(event) {
    event.preventDefault();

    const button = event.target.querySelector("button");
    button.disabled = true;
    button.innerText = "Creating account...";

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    await signup(email, password);

    button.disabled = false;
    button.innerText = "Sign Up";
}


// =====================
// QUICK LOGIN TEST (OPTIONAL)
// =====================
async function testLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Login successful!");
    window.location.href = "dashboard.html";
}
