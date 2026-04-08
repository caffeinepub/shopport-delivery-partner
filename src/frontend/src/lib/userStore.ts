export interface UserProfile {
  profilePhoto?: string;
  name?: string;
  gender?: string;
  vehicleType?: string;
  vehicleNumber?: string;
  fuelType?: string;
  phone?: string;
  address?: string;
  aadhaarDoc?: string;
  drivingLicenseDoc?: string;
  rcDoc?: string;
  insuranceDoc?: string;
}

const KEY = "shopport_user_profile";

export function getUserProfile(): UserProfile {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function setUserProfile(data: Partial<UserProfile>) {
  const existing = getUserProfile();
  localStorage.setItem(KEY, JSON.stringify({ ...existing, ...data }));
}
