

//getting data
db.collection('guides').get().then((snapshot)=>{
  setupGuides(snapshot.docs);
});

//Listenin to auth status changes
auth.onAuthStateChanged(user => {
  if(user){
    console.log(user.email + " is logged in");
  }else{
    console.log("user is logged out");
  }

});

//signup a new User
  const signupForm = document.querySelector('#signup-form');

  signupForm.addEventListener('submit',(e)=>{
      e.preventDefault();

      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;

      //Singup users
      auth.createUserWithEmailAndPassword(email, password).then(
        (cred)=>{
            //console.log(cred.user);
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        }
      );

  });

//Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
  e.preventDefault();
  auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
  e.preventDefault();

  //get users info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then((cred)=>{
      //console.log(cred.user);
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
});
