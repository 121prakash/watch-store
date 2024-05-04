

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8XNHSReG3DydV2UkA6g9hfHnclpzmV54",
    authDomain: "login-with-firebase-data-93278.firebaseapp.com",
    projectId: "login-with-firebase-data-93278",
    storageBucket: "login-with-firebase-data-93278.appspot.com",
    messagingSenderId: "76594646317",
    appId: "1:76594646317:web:50aa9db3214cd1649d97a4",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  function register() {
    // Get the required input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const full_name = document.getElementById('full_name').value;
    const mobile_number = document.getElementById('mobile_number').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is invalid.');
        return;  // Stop execution if validation fails
    }
    if (!validate_field(full_name) || !validate_field(mobile_number)) { // Validate mobile number
      alert('Full name or Mobile number is invalid.');
      return;  // Stop execution if validation fails
  }

    // Proceed with Firebase Authentication to create a new user
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            const user = auth.currentUser;

            // Add user data to Firebase Database
            const database_ref = database.ref();

            // Create user data object
            const user_data = {
                email: email,
                full_name: full_name,
                mobile_number: mobile_number,
                last_login: Date.now()
            };

            // Push user data to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)
                .then(function() {
                    // Notify user of successful registration
                    alert('User created successfully!');
                    // Refresh the browser tab
                    window.location.reload();
                })
                .catch(function(error) {
                    // Handle database update errors
                    console.error('Error updating user data:', error);
                    alert('Failed to update user data.');
                });
        })
        .catch(function(error) {
            // Handle authentication errors
            console.error('Error during registration:', error);
            alert('Registration failed: ' + error.message);
        });
}

  
  function login() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!validate_email(email) || !validate_password(password)) {
        alert('Email or Password is invalid.');
        return;  // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            const user = auth.currentUser;

            // Add this user to Firebase Database
            const database_ref = database.ref();

            // Create user data
            const user_data = {
                last_login: Date.now()
            };

            // Update the user's last login time in the database
            database_ref.child('users/' + user.uid).update(user_data)
                .then(function() {
                    // Redirect to the index.html page after successful login
                    window.location.href = 'index.html';
                })
                .catch(function(error) {
                    console.error('Error updating last login time:', error);
                    alert('Failed to update user data.');
                });

            // Notify user of successful login
            alert('User Logged In!');
        })
        .catch(function(error) {
            // Handle any errors during login
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        });
}

  
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }