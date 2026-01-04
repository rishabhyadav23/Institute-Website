export const registerUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Registered with:", userData);
      resolve({ success: true, token: "new-fake-jwt", user: { name: userData.fullName } });
    }, 2000);
  });
};


// Simulates sending a reset password email
export const requestPasswordReset = async (email) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log(`Reset link sent to: ${email}`);
      resolve({ success: true, message: "Reset link sent" });
    }, 2000);
  });
};

// Simulate Login API
export const loginUser = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Logged in with:", credentials);
      resolve({ success: true, token: "fake-jwt-token", user: { name: "User" } });
    }, 2000);
  });
};