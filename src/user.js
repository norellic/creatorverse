let currentUser = JSON.parse(localStorage.getItem("user")) || null;

export function setUser(user) {
  currentUser = user;
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return currentUser;
}

export function clearUser() {
  currentUser = null;
  localStorage.removeItem("user");
}
