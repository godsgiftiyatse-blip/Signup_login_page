const supabaseUrl = 'https://hcgmpsmiqpinayzkvavd.supabase.co';

const supabaseKey = 'sb_publishable_mmAQ4xNdT_acLKyIN9b9Qw_o3nPTSBj';

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);// =====================
// BASE API
// =====================
const API_URL = "https://YOUR-REPLIT-URL.replit.app/api/auth";

async function apiRequest(endpoint, body) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return { ok: res.ok, data };

  } catch (error) {
    return { ok: false, data: { error: "Network error" } };
  }
}


// =====================
// LOGIN
// =====================
async function login(email, password) {
  const result = await apiRequest("login", {
    email: email.trim(),
    password: password.trim()
  });

  if (!result.ok) {
    alert(result.data.error || "Login failed");
    return;
  }

  console.log("Logged in as:", result.data.email);
  window.location.href = "dashboard.html";
}


// =====================
// SIGNUP
// =====================
async function signup(email, password) {
  const result = await apiRequest("signup", {
    email: email.trim(),
    password: password.trim()
  });

  if (!result.ok) {
    alert(result.data.error || "Signup failed");
    return;
  }

  console.log("Account created for:", result.data.email);
  window.location.href = "login.html";
}


// =====================
// FORM HANDLERS
// =====================
function handleLogin(event) {
  event.preventDefault();

  const button = event.target.querySelector("button");
  button.disabled = true;
  button.innerText = "Logging in...";

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  login(email, password).finally(() => {
    button.disabled = false;
    button.innerText = "Login";
  });
}


function handleSignup(event) {
  event.preventDefault();

  const button = event.target.querySelector("button");
  button.disabled = true;
  button.innerText = "Creating account...";

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  signup(email, password).finally(() => {
    button.disabled = false;
    button.innerText = "Sign Up";
  });
}
