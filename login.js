document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const pass = document.getElementById('password').value;
      
      try {
        const loggedUser = login(email, pass);
        if (loggedUser.role === 'admin') {
          window.location.href = 'admin/index.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      } catch (err) {
        alert(err.message);
      }
    });
  }
});