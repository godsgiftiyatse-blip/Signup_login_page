// =====================
// LOGIN FUNCTION
// =====================
async function login(email, password) {
  try {
    const res = await fetch("https://YOUR-REPLIT-URL.replit.app/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    console.log("Logged in as:", data.email);

    // redirect after login
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("Network error");
  }
}


// =====================
// SIGNUP FUNCTION
// =====================
async function signup(email, password) {
  try {
    const res = await fetch("https://YOUR-REPLIT-URL.replit.app/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Signup failed");
      return;
    }

    console.log("Account created for:", data.email);

    // redirect after signup
    window.location.href = "login.html";

  } catch (error) {
    console.error(error);
    alert("Network error");
  }
}


// =====================
// FORM HANDLERS
// =====================

// LOGIN FORM HANDLER
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  login(email, password);
}


// SIGNUP FORM HANDLER
function handleSignup(event) {
  event.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  signup(email, password);
}
