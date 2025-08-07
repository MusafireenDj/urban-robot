import { webcrypto } from 'crypto'; // Corrected import for crypto

// Polyfill for webcrypto in Node.js environment if needed, though Next.js might handle it.
// If this causes issues, consider a different approach for non-browser environments.
// For browser environments, window.crypto is available.
const crypto = typeof window !== 'undefined' ? window.crypto : webcrypto;

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin?: number;
  failedLoginAttempts?: number;
  lockoutUntil?: number;
}

export const PERMISSIONS = {
  MANAGE_PROPERTIES: 'manage_properties',
  MANAGE_USERS: 'manage_users',
  MANAGE_MEDIA: 'manage_media',
  MANAGE_SETTINGS: 'manage_settings',
};

const ROLES_PERMISSIONS: Record<User['role'], string[]> = {
  admin: [
    PERMISSIONS.MANAGE_PROPERTIES,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_MEDIA,
    PERMISSIONS.MANAGE_SETTINGS,
  ],
  editor: [
    PERMISSIONS.MANAGE_PROPERTIES,
    PERMISSIONS.MANAGE_MEDIA,
  ],
  viewer: [],
};

class UserManager {
  private static users: User[] = [];
  private static initialized = false;

  private static async initialize() {
    if (UserManager.initialized) return;

    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        UserManager.users = JSON.parse(storedUsers);
      } else {
        // Create a default admin user if no users exist
        const adminPassword = 'adminpassword'; // In a real app, use environment variable or secure input
        const adminHash = await UserManager.hashPassword(adminPassword);
        UserManager.users.push({
          id: 'admin-123',
          username: 'admin',
          passwordHash: adminHash,
          role: 'admin',
          failedLoginAttempts: 0,
        });
        UserManager.saveUsers();
      }
      UserManager.initialized = true;
    }
  }

  private static saveUsers() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(UserManager.users));
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashedPassword;
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const hashOfInput = await UserManager.hashPassword(password);
    return hashOfInput === hashedPassword;
  }

  static async authenticate(username: string, password: string): Promise<User | null> {
    await UserManager.initialize();
    const user = UserManager.users.find(u => u.username === username);

    if (!user) {
      console.warn(`🚫 محاولة تسجيل دخول فاشلة: المستخدم ${username} غير موجود.`);
      return null;
    }

    const now = Date.now();
    const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

    if (user.lockoutUntil && user.lockoutUntil > now) {
      console.warn(`🔒 المستخدم ${username} مقفل حتى ${new Date(user.lockoutUntil).toLocaleTimeString()}`);
      return null;
    }

    const isPasswordValid = await UserManager.verifyPassword(password, user.passwordHash);

    if (isPasswordValid) {
      user.lastLogin = now;
      user.failedLoginAttempts = 0;
      user.lockoutUntil = undefined;
      UserManager.saveUsers();
      console.log(`✅ تسجيل دخول ناجح للمستخدم: ${username}`);
      return user;
    } else {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      const MAX_ATTEMPTS = 3;
      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockoutUntil = now + LOCKOUT_DURATION;
        console.warn(`🚨 تم قفل المستخدم ${username} لمدة 5 دقائق بسبب محاولات تسجيل الدخول الفاشلة.`);
      }
      UserManager.saveUsers();
      console.warn(`❌ كلمة مرور غير صحيحة للمستخدم: ${username}`);
      return null;
    }
  }

  static getUserById(id: string): User | null {
    // Ensure initialization before accessing users
    // This is a quick fix for client-side context. In a real app, this would be server-side.
    if (!UserManager.initialized) {
      // This should ideally be awaited, but for a synchronous client-side call,
      // we'll assume it's initialized or handle potential race conditions.
      UserManager.initialize();
    }
    return UserManager.users.find(u => u.id === id) || null;
  }

  static getUserByUsername(username: string): User | null {
    if (!UserManager.initialized) {
      UserManager.initialize();
    }
    return UserManager.users.find(u => u.username === username) || null;
  }

  static async addUser(username: string, passwordPlain: string, role: User['role']): Promise<User | null> {
    await UserManager.initialize();
    if (UserManager.users.some(u => u.username === username)) {
      console.warn(`⚠️ المستخدم ${username} موجود بالفعل.`);
      return null;
    }
    const passwordHash = await UserManager.hashPassword(passwordPlain);
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      passwordHash,
      role,
      failedLoginAttempts: 0,
    };
    UserManager.users.push(newUser);
    UserManager.saveUsers();
    console.log(`➕ تم إضافة مستخدم جديد: ${username} بالدور ${role}`);
    return newUser;
  }

  static async updateUser(id: string, updates: Partial<Omit<User, 'passwordHash'>> & { newPassword?: string }): Promise<User | null> {
    await UserManager.initialize();
    const userIndex = UserManager.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      console.warn(`🚫 المستخدم بالمعرف ${id} غير موجود.`);
      return null;
    }

    const user = UserManager.users[userIndex];
    const updatedUser = { ...user, ...updates };

    if (updates.newPassword) {
      updatedUser.passwordHash = await UserManager.hashPassword(updates.newPassword);
      console.log(`🔑 تم تغيير كلمة مرور المستخدم ${user.username}`);
    }

    UserManager.users[userIndex] = updatedUser;
    UserManager.saveUsers();
    console.log(`✏️ تم تحديث المستخدم: ${user.username}`);
    return updatedUser;
  }

  static deleteUser(id: string): boolean {
    if (!UserManager.initialized) {
      UserManager.initialize();
    }
    const initialLength = UserManager.users.length;
    UserManager.users = UserManager.users.filter(u => u.id !== id);
    if (UserManager.users.length < initialLength) {
      UserManager.saveUsers();
      console.log(`🗑️ تم حذف المستخدم بالمعرف: ${id}`);
      return true;
    }
    console.warn(`🚫 فشل حذف المستخدم بالمعرف: ${id} (غير موجود)`);
    return false;
  }

  static getAllUsers(): User[] {
    if (!UserManager.initialized) {
      UserManager.initialize();
    }
    return UserManager.users;
  }

  static hasPermission(user: User | null, permission: string): boolean {
    if (!user) return false;
    const userPermissions = ROLES_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  }
}

// Client-side session validation using localStorage
export function validateSession(): boolean {
  if (typeof window === 'undefined') {
    return false; // Not in browser environment
  }

  const adminToken = localStorage.getItem('adminToken');
  const loginTime = localStorage.getItem('loginTime');
  const currentUserId = localStorage.getItem('currentUserId');

  if (!adminToken || !loginTime || !currentUserId) {
    return false;
  }

  const SESSION_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour
  const now = Date.now();

  if (now - parseInt(loginTime, 10) > SESSION_EXPIRATION_TIME) {
    console.log('Session expired. Logging out.');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('currentUserId');
    return false;
  }

  // In a real application, you would also validate the token with a backend.
  // For this example, we assume the presence of the token and recent login time is sufficient.
  return true;
}

export function sanitizeInput(input: string): string {
  // Create a temporary div element
  const div = document.createElement('div');
  // Set its text content to the input string, which automatically escapes HTML entities
  div.appendChild(document.createTextNode(input));
  // Return the innerHTML, which will be the escaped string
  return div.innerHTML;
}

export { UserManager };
