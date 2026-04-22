const USERS_STORAGE_KEY = 'majiUsers';
const USER_SESSION_KEY = 'majiSession';

function prepareAdminAccount() {
  const allUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const hasAdmin = allUsers.some(u => u.email === 'admin@majisafi.com');
  
  if (!hasAdmin) {
    allUsers.push({
      id: 'admin-' + Date.now(),
      name: 'System Administrator',
      email: 'admin@majisafi.com',
      password: 'admin123',
      role: 'admin',
      county: 'All'
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers));
  }
}

function signup(fullName, emailAddress, secretPassword, userCounty) {
  const existingUsers = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  if (existingUsers.find(u => u.email === emailAddress)) {
    throw new Error('This email is already in use.');
  }
  
  const newUserRecord = {
    id: 'u-' + Math.random().toString(36).substr(2, 9),
    name: fullName,
    email: emailAddress,
    password: secretPassword,
    county: userCounty,
    role: 'user'
  };
  
  existingUsers.push(newUserRecord);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existingUsers));
  return newUserRecord;
}

function login(emailInput, passwordInput) {
  const usersList = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const matchedUser = usersList.find(u => u.email === emailInput && u.password === passwordInput);
  
  if (!matchedUser) {
    throw new Error('Incorrect email or password.');
  }
  
  const sessionData = {
    id: matchedUser.id,
    name: matchedUser.name,
    email: matchedUser.email,
    role: matchedUser.role,
    county: matchedUser.county
  };
  
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(sessionData));
  return matchedUser;
}

function logout() {
  document.body.style.opacity = '0.5';
  setTimeout(() => {
    localStorage.removeItem(USER_SESSION_KEY);
    window.location.href = 'index.html';
  }, 300);
}

function getSession() {
  const savedSession = localStorage.getItem(USER_SESSION_KEY);
  return savedSession ? JSON.parse(savedSession) : null;
}

function requireAuth(accessLevel = null) {
  const activeSession = getSession();
  if (!activeSession) {
    window.location.href = 'login.html';
    return;
  }
  if (accessLevel && activeSession.role !== accessLevel) {
    window.location.href = activeSession.role === 'admin' ? 'admin/index.html' : 'dashboard.html';
  }
}

prepareAdminAccount();