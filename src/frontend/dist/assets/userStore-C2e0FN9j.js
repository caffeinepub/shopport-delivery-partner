const KEY = "shopport_user_profile";
function getUserProfile() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}
function setUserProfile(data) {
  const existing = getUserProfile();
  localStorage.setItem(KEY, JSON.stringify({ ...existing, ...data }));
}
export {
  getUserProfile as g,
  setUserProfile as s
};
