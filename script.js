// LOGIN
async function login(email, password) {
  const res = await fetch("https://YOUR-REPLIT-URL.replit.app/api/auth/login", {
    method: "POST",
    credentials: "include",               // ← required for the cookie
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const user = await res.json();
    console.log("Logged in as", user.email);
    // redirect or update UI
  } else {
    const err = await res.json();
    alert(err.error); // "Invalid email or password"
  }
}

// SIGN UP
async function signup(email, password) {
  const res = await fetch("https://YOUR-REPLIT-URL.replit.app/api/auth/signup", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const user = await res.json();
    console.log("Account created for", user.email);
  } else {
    const err = await res.json();
    alert(err.error); // "Email already in use" etc.
  }
}
