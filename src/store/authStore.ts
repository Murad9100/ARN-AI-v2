import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  verificationCode: string | null;
  pendingEmail: string | null;
  
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<string>;
  verifyEmail: (code: string) => Promise<boolean>;
  logout: () => void;
  updateTokens: (used: number) => void;
  upgradePlan: (plan: 'free' | 'pro' | 'max') => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      verificationCode: null,
      pendingEmail: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const storedUsers = JSON.parse(localStorage.getItem('arn-users') || '[]');
        const user = storedUsers.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userData } = user;
          set({ 
            user: userData, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const code = generateCode();
        const storedUsers = JSON.parse(localStorage.getItem('arn-users') || '[]');
        
        if (storedUsers.find((u: any) => u.email === email)) {
          set({ isLoading: false });
          throw new Error('Bu email artıq qeydiyyatdan keçib');
        }

        const newUser = {
          id: generateId(),
          email,
          password,
          name,
          plan: 'free' as const,
          isVerified: false,
          createdAt: new Date(),
          tokensUsed: 0,
          tokensLimit: 1000
        };

        storedUsers.push(newUser);
        localStorage.setItem('arn-users', JSON.stringify(storedUsers));
        
        set({ 
          verificationCode: code, 
          pendingEmail: email, 
          isLoading: false 
        });
        
        return code;
      },

      verifyEmail: async (code: string) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { verificationCode, pendingEmail } = get();
        
        if (code === verificationCode && pendingEmail) {
          const storedUsers = JSON.parse(localStorage.getItem('arn-users') || '[]');
          const userIndex = storedUsers.findIndex((u: any) => u.email === pendingEmail);
          
          if (userIndex !== -1) {
            storedUsers[userIndex].isVerified = true;
            localStorage.setItem('arn-users', JSON.stringify(storedUsers));
            
            const { password: _, ...userData } = storedUsers[userIndex];
            set({ 
              user: userData, 
              isAuthenticated: true, 
              verificationCode: null, 
              pendingEmail: null,
              isLoading: false 
            });
            return true;
          }
        }
        
        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          verificationCode: null, 
          pendingEmail: null 
        });
      },

      updateTokens: (used: number) => {
        const { user } = get();
        if (user) {
          set({ 
            user: { ...user, tokensUsed: user.tokensUsed + used } 
          });
        }
      },

      upgradePlan: (plan: 'free' | 'pro' | 'max') => {
        const { user } = get();
        if (user) {
          const limits = { free: 1000, pro: 50000, max: 500000 };
          const updatedUser = { 
            ...user, 
            plan, 
            tokensLimit: limits[plan],
            tokensUsed: 0
          };
          set({ user: updatedUser });
          
          const storedUsers = JSON.parse(localStorage.getItem('arn-users') || '[]');
          const userIndex = storedUsers.findIndex((u: any) => u.id === user.id);
          if (userIndex !== -1) {
            storedUsers[userIndex] = { ...storedUsers[userIndex], ...updatedUser };
            localStorage.setItem('arn-users', JSON.stringify(storedUsers));
          }
        }
      }
    }),
    {
      name: 'arn-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);
