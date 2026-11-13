
const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {

    const password = passwordInput.value;

    let score = 0;
    let tips = [];

    // Security checks
    const checks = {
        length: password.length >= 12,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password)
    };

    // Update checklist
    updateCheck("lengthCheck", checks.length, "At least 12 characters");
    updateCheck("upperCheck", checks.upper, "Uppercase letters");
    updateCheck("lowerCheck", checks.lower, "Lowercase letters");
    updateCheck("numberCheck", checks.number, "Numbers");
    updateCheck("symbolCheck", checks.symbol, "Special characters");

    // Calculate score
    Object.values(checks).forEach(value => {
        if (value) score++;
    });

    // Common password warning
    const commonPasswords = [
        "password123",
        "123456789",
        "qwerty123",
        "admin123",
        "password"
    ];

    const isCommon = commonPasswords.includes(
        password.toLowerCase()
    );

    // Generate suggestions
    if (!checks.length)
        tips.push("Use at least 12 characters.");

    if (!checks.upper)
        tips.push("Add uppercase letters.");

    if (!checks.lower)
        tips.push("Add lowercase letters.");

    if (!checks.number)
        tips.push("Add numbers.");

    if (!checks.symbol)
        tips.push("Add special characters.");

    if (isCommon)
        tips.push("Avoid common passwords.");

    // Determine strength
    let strength = "Weak";
    let percentage = score * 20;

    if (isCommon) {
        strength = "Weak";
        percentage = 20;
    }
    else if (score >= 5) {
        strength = "Strong";
    }
    else if (score >= 3) {
        strength = "Medium";
    }

    if (password.length === 0) {
        document.getElementById("strengthText").textContent =
            "Not checked";

        document.getElementById("strengthFill").style.width =
            "0%";

        document.getElementById("suggestions").textContent =
            "Start typing to analyze your password.";

        return;
    }

    // Display result
    document.getElementById("strengthText").textContent =
        strength;

    const fill = document.getElementById("strengthFill");

    fill.style.width = percentage + "%";

    if (strength === "Weak")
        fill.style.background = "#ef4444";
    else if (strength === "Medium")
        fill.style.background = "#facc15";
    else
        fill.style.background = "#22c55e";

    document.getElementById("suggestions").textContent =
        isCommon
        ? tips.join(" ")
        : tips.length > 0
        ? tips.join(" ")
        : "Excellent! All five basic checks passed.";
}

// Checklist update function
function updateCheck(id, passed, label) {

    const element = document.getElementById(id);

    element.textContent =
        (passed ? "✓ " : "○ ") + label;

    element.classList.toggle("valid", passed);
}

// Show and hide password
function togglePassword() {

    const button = document.querySelector(".password-input button");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        button.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        button.textContent = "Show";
    }
}

// Password generator
function generatePassword() {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    const random = new Uint32Array(20);

    crypto.getRandomValues(random);

    let password = "";

    for (let i = 0; i < 20; i++) {
        password += chars[random[i] % chars.length];
    }

    document.getElementById("generated").textContent =
        "Generated Password: " + password;
}
