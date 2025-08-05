import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Create user profile in backend
      await apiService.createUser({
        firebaseUid: result.user.uid,
        email: result.user.email,
        displayName: displayName
      });
      
      toast.success('Account created successfully!');
      return result;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      return result;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user exists in backend, create if not
      try {
        await apiService.getUser(result.user.uid);
      } catch (error) {
        if (error.response?.status === 404) {
          await apiService.createUser({
            firebaseUid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName
          });
        }
      }
      
      toast.success('Welcome to AptiBattle!');
      return result;
    } catch (error) {
      toast.error('Google sign-in failed.');
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Error signing out.');
      throw error;
    }
  };

  // Get user profile from backend
  const fetchUserProfile = async (firebaseUid) => {
    try {
      const profile = await apiService.getUser(firebaseUid);
      setUserProfile(profile);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      if (currentUser) {
        const updatedProfile = await apiService.updateUser(currentUser.uid, updates);
        setUserProfile(updatedProfile);
        toast.success('Profile updated successfully!');
        return updatedProfile;
      }
    } catch (error) {
      toast.error('Failed to update profile.');
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile from backend
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    loginWithGoogle,
    logout,
    fetchUserProfile,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}