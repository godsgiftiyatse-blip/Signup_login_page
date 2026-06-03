// =====================
// BASE API FUNCTION
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
  const result = await apiRequest("login", { email, password });

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
  const result = await apiRequest("signup", { email, password });

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

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  login(email, password);
}

function handleSignup(event) {
  event.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  signup(email, password);
}
