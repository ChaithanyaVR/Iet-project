import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function VerificationPage() {
  const { token } = useParams();
  const history = useLocation();
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3003/verify/${token}`)
      .then((response) => {
        if (response.data.status === "verified") {
            console.log("Email successfully verified");
          setVerificationStatus("Email successfully verified");
        } else {
            console.log("Verification failed");
          setVerificationStatus("Verification failed");
        }
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
        setVerificationStatus("Verification failed");
      });
  }, [token]);

  const handleOkClick = () => {
    // Redirect to IetPage after email verification
    history.push('/');
  };

  return (
    <div>
       <h2>Email Verification Status</h2>
      {verificationStatus && (
        <div>
          <p>{verificationStatus}</p>
          {verificationStatus === 'Email successfully verified' && (
            <button onClick={handleOkClick}>OK</button>
          )}
        </div>
      )}
    </div>
  );
}

export default VerificationPage;
