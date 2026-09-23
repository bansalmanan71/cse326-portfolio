const form = document.getElementById('registrationForm');

// Utility arrow function to show errors
const showError = (inputId, message) => {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}Error`);
    
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
};

// Utility arrow function to clear specific errors
const clearError = (inputId) => {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}Error`);
    
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
};

// Main form submission event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Clear all previous errors first
    ['username', 'email', 'dob', 'password'].forEach(id => clearError(id));

    // Fetching values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    // 1. Username Validation
    if (username.length < 3) {
        showError('username', 'Username must be at least 3 characters.');
        isValid = false;
    }

    // 2. Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    // 3. Date of Birth Validation
    if (!dob) {
        showError('dob', 'Please select your date of birth.');
        isValid = false;
    }

    // 4. Password Validation (Regex)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('password', 'Must be 8+ chars with 1 uppercase and 1 number.');
        isValid = false;
    }

    // Final Check & Saving to Local Storage
    if (isValid) {
        // Create an object to store (simulating sending to a database)
        const userData = { username, email, dob };
        
        // Use Web Storage API (Unit V syllabus requirement)
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        
        alert(`Success! User ${username} has been registered and saved locally.`);
        form.reset();
    }
});