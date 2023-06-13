import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

// SignIn brings up the google sign in pop up AND works
// for both signing in AND registering a user

export const googleAuth = {
  // Works to sign in AND register a user
  signInRegister: function(navigate) {
    return new Promise((res) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((userCredential) => {
          const userAuth = {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            uid: userCredential.user.uid,
            type: "google",
          };
          
          // Saves the user to localstorage
          localStorage.setItem("capstone_user", JSON.stringify(userAuth));
          fetch(`https://localhost:7158/api/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userAuth),
    })
      .then((response) => response.json())
          // Navigate us back to home
          navigate("/");
          console.log("you did it");
        })
        .catch((error) => {
          console.log("Google Sign In Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
          console.log("error email", error.email);
        });
    });
  },
  // Sign out a user
  signOut: function(navigate) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Remove user from localStorage
        localStorage.removeItem("capstone_user");
        // Navigate us back home
        navigate("/");
        console.log("Sign Out Success!");
      })
      .catch((error) => {
        console.log("Google SignOut Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
};
