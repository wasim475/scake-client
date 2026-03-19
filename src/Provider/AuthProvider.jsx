import { createContext, useState } from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, updateProfile , createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, FacebookAuthProvider } from "firebase/auth"
import app from './firebase.config';
import axios from 'axios';


export const Auth = createContext(null);
const AuthProvider = ({children}) => {
  const auth = getAuth(app);
  const [loading, setLoading]= useState(false)
  const GoogleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("loggedUser");
    return saved ? JSON.parse(saved) : null;
  });

    const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  // গুগল লগিন
  const googleSignIn= (dialogRef)=>{
        signInWithPopup(auth, GoogleProvider)
        .then(async (result)=>{
            console.log(result.user);
            if(result.user){
              setLoading(true)
               const userInfo={
                fullName: result.user.displayName,
                userName: result.user.email.split("@")[0],
                email: result.user.email,
                password:`rac3Student-${Math.floor(Math.random() * 10000)}`,
                profilePic:result.user.photoURL
               }
               const res = await axios.post('https://racb3-server.vercel.app/api/v1/auth/google-login',userInfo)
                if(res.data.user){
                  setLoading(false)
                  signIn(res.data.user)
                  toast.success("Login successfull.")
                      dialogRef.current.close();
                }
                    
                
               
                
                //   Navigate(from,{replace:true});
                console.log('user')
            }
        })
    }

    

const facebookProvider = new FacebookAuthProvider();

const facebookSignIn = () => {
  return signInWithPopup(auth, facebookProvider);
};

  // লগআউট
  const logout = (closeDrawer) => {
    Swal.fire({
  title: "Are you sure?",
  // text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Logout"
}).then((result) => {
  if (result.isConfirmed) {
    setUser(null);
    localStorage.removeItem("loggedUser");
    toast.success("Logout successfully.")
    closeDrawer()
  }
});
    
  };
    const authInfo={
        user,
        signIn,
        googleSignIn,
        facebookSignIn,
        logout,
        loading
    }
  return (
    <Auth.Provider value={authInfo}>
      {children}
    </Auth.Provider>
  )
}

export default AuthProvider