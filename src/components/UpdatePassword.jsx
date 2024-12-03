import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//   const [showForm, setShowForm] = useState(false); // To manage form visibility
//   alert('your in')

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await axios.put('/update-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword

      });
      console.log('Password updated successfully:', response);
      alert('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error.response || error.message);
        alert(
            error.response?.data?.message || 'Failed to update password. Please try again.'
        );
    }
  };

  return (
    <div>
      <div className="login-page-wrapper yellow">
        <div className="login-page">
          <div className="form">
            <h2 className="loginTitle">Update Password</h2>

            {/* Button to show form */}
            {/* <button onClick={() => setShowForm(true)}>Show Password Update Form</button> */}

 {/* {setShowForm(true)} */}
            {/* Conditionally render form */}
           
              <form
                className="login-form"
                method="post"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password Confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" onClick={handleUpdatePassword}>
                  Update
                </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
