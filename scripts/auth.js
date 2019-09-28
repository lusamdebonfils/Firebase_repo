
//Listenin to auth status changes
auth.onAuthStateChanged(user => {
  if(user){
    //getting data
    //db.collection('guides').get().then((snapshot)=>{
    db.collection('guides').onSnapshot((snapshot)=>{//Adding a listener to the Database
      setupGuides(snapshot.docs);
      setupUI(user);
    },(err)=>{
      console.log(err.message);
    });

  }else{
    setupUI();
    setupGuides([]);
  }

});

//create New GUIDE
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
  e.preventDefault();

  const titlePassed = createForm['title'].value;
  const contentPassed = createForm['content'].value;

  db.collection('guides').add({
    title : titlePassed,
    content : contentPassed
  }).then(()=>{
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err=>{
    console.log(err.message);
  });
});


//signup a new User
  const signupForm = document.querySelector('#signup-form');

  signupForm.addEventListener('submit',(e)=>{
      e.preventDefault();

      const email = signupForm['signup-email'].value;
      const password = signupForm['signup-password'].value;
      const bioGraphy = signupForm['signup-bio'].value;

      //Singup users
      auth.createUserWithEmailAndPassword(email, password).then((cred)=>{
          return db.collection('users').doc(cred.user.uid).set({
            bio : bioGraphy
          });
        }).then(()=>{
          const modal = document.querySelector('#modal-signup');
          M.Modal.getInstance(modal).close();
          signupForm.reset();
        });

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
