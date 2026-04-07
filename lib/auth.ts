export type AuthUser = {
  email: string;
  password: string;
  fullName: string;
  createdAt: string;
};

export const AUTH_EVENT = "kan-auth-changed";

const USERS_KEY = "kan-auth-users";
const SESSION_KEY = "kan-auth-session";

const canUseStorage = () => typeof window !== "undefined";

const readJson = <T,>(key: string, fallback: T): T => {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const emitAuthChange = () => {
  if (!canUseStorage()) return;
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const getStoredUsers = () => readJson<AuthUser[]>(USERS_KEY, []);

export const getSessionUser = () => readJson<AuthUser | null>(SESSION_KEY, null);

export const signupUser = (user: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const users = getStoredUsers();
  const normalizedEmail = user.email.trim().toLowerCase();

  if (users.some((entry) => entry.email.toLowerCase() === normalizedEmail)) {
    return { ok: false as const, message: "An account with this email already exists." };
  }

  const newUser: AuthUser = {
    fullName: user.fullName.trim(),
    email: normalizedEmail,
    password: user.password,
    createdAt: new Date().toISOString(),
  };

  writeJson(USERS_KEY, [...users, newUser]);
  writeJson(SESSION_KEY, newUser);
  emitAuthChange();

  return { ok: true as const, user: newUser };
};

export const loginUser = (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getStoredUsers().find(
    (entry) =>
      entry.email.toLowerCase() === normalizedEmail && entry.password === password,
  );

  if (!user) {
    return { ok: false as const, message: "Invalid email or password." };
  }

  writeJson(SESSION_KEY, user);
  emitAuthChange();

  return { ok: true as const, user };
};

export const logoutUser = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
  emitAuthChange();
};

export const updatePassword = (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getStoredUsers();
  const userIndex = users.findIndex(
    (entry) => entry.email.toLowerCase() === normalizedEmail,
  );

  if (userIndex === -1) {
    return { ok: false as const, message: "We couldn't find an account with that email." };
  }

  const updatedUser = { ...users[userIndex], password };
  const nextUsers = [...users];
  nextUsers[userIndex] = updatedUser;

  writeJson(USERS_KEY, nextUsers);

  const sessionUser = getSessionUser();
  if (sessionUser?.email.toLowerCase() === normalizedEmail) {
    writeJson(SESSION_KEY, updatedUser);
  }

  emitAuthChange();
  return { ok: true as const, user: updatedUser };
};

export const updateUserProfile = (currentEmail: string, profile: {
  fullName: string;
  email: string;
}) => {
  const normalizedCurrentEmail = currentEmail.trim().toLowerCase();
  const normalizedNextEmail = profile.email.trim().toLowerCase();
  const nextFullName = profile.fullName.trim();
  const users = getStoredUsers();
  const userIndex = users.findIndex(
    (entry) => entry.email.toLowerCase() === normalizedCurrentEmail,
  );

  if (userIndex === -1) {
    return { ok: false as const, message: "We couldn't find that account." };
  }

  const emailTaken = users.some(
    (entry, index) =>
      index !== userIndex && entry.email.toLowerCase() === normalizedNextEmail,
  );

  if (emailTaken) {
    return { ok: false as const, message: "That email is already in use." };
  }

  const updatedUser: AuthUser = {
    ...users[userIndex],
    fullName: nextFullName,
    email: normalizedNextEmail,
  };

  const nextUsers = [...users];
  nextUsers[userIndex] = updatedUser;

  writeJson(USERS_KEY, nextUsers);
  writeJson(SESSION_KEY, updatedUser);
  emitAuthChange();

  return { ok: true as const, user: updatedUser };
};

export const socialLogin = (provider: string) => {
  const normalizedProvider = provider.toLowerCase();
  const email = `${normalizedProvider}@kan-demo.com`;
  const existing = getStoredUsers().find((entry) => entry.email === email);

  if (existing) {
    writeJson(SESSION_KEY, existing);
    emitAuthChange();
    return { ok: true as const, user: existing };
  }

  return signupUser({
    fullName: `${provider} User`,
    email,
    password: `${provider.toLowerCase()}-demo-password`,
  });
};
