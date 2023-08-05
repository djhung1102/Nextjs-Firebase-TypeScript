import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig/firebaseConfig";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({
  user: {} as User | null,
  setUser: (_user: User) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
