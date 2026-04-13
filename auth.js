const USERS_KEY = 'majiUsers';
const SESSION_KEY = 'majiSession';

// Seed Admin if not exists
function seedAdmin() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const adminExists = users.find(u => u.email === 'admin@majisafi.com');
  
  if (!adminExists) {
    users.push({
      id: 'usr-' + Date.now(),
      name: 'System Admin',
      email: 'admin@majisafi.com',
      password: 'admin123', // In a real app, this would be hashed
      role: 'admin',
      county: 'All'
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    console.log('Admin account seeded: admin@majisafi.com / admin123');
  }
}

function signup(name, email, password, county) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.find(u => u.email === email)) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: 'usr-' + Date.now(),
    name,
    email,
    password,
    county,
    role: 'user'
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
}

function login(email, password) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    county: user.county
  }));
  
  return user;
}

function logout() {
  document.body.style.transition = 'opacity 0.4s ease';
  document.body.style.opacity = '0.5';
  document.body.style.pointerEvents = 'none';
  
  setTimeout(() => {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = '/index.html';
  }, 600);
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function isAuthenticated() {
  return !!localStorage.getItem(SESSION_KEY);
}

function requireAuth(role = null) {
  const session = getSession();
  if (!session) {
    window.location.href = '/login.html';
    return;
  }
  if (role && session.role !== role) {
    window.location.href = session.role === 'admin' ? '/admin/index.html' : '/dashboard.html';
  }
}

// Auto-seed on load
seedAdmin();
