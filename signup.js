document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('signupForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('name').value;
      const userEmail = document.getElementById('email').value;
      const userPass = document.getElementById('password').value;
      const userCounty = document.getElementById('county').value;
      
      try {
        const newlyCreatedUser = signup(userName, userEmail, userPass, userCounty);
        login(userEmail, userPass);
        window.location.href = 'dashboard.html';
      } catch (err) {
        alert(err.message);
      }
    });
  }
});