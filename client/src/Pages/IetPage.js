import React, { useState,useEffect } from "react";
import "./IetPage.css";
import banner from "../images/banner.jpg";
import Header from "../Components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";

function IetPage() {
  const [formData, setFormData] = useState({
    Name: "",
    PhoneNumber: "",
    Email: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("status") === "verified") {
      setVerificationMessage("Check your email for the verification link.");
    }
  }, [location.search]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormButtonClick = () => {
    setShowForm(true);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3003/iet", formData);

      if (response.status === 201) {
        setShowForm(false);
        setVerificationMessage(
          "Check your email for the verification link."
        );
      } else {
        console.error("Error saving Iet details:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving Iet details:", error);
    }
  };


  return (
    <>
      <div className="Iet-container">
        <Header />
        <div className="banner-container">
          <img src={banner} alt="Logo" />
        </div>
        <div className="form-main-container">
        {verificationMessage && (
            <div className="verification-message">
              {verificationMessage}
            </div>
          )}
          <div className="sample-content">
            <p>
              To conclude, it is clear that content marketing is the way
              forward. Whether you are an individual looking to make your mark
              as a content writer or an organization seeking to build your
              online presence, content is key. Therefore, you must devise a
              strategy for the whole year and plan your content dissemination
              accordingly. Remember to use an interesting mix of content that
              includes social media posts, blogs, and videos. Podcasts are
              emerging as the next big thing in the content space, so you might
              want to consider adding that to your mix. The best part about
              digital media is that you can evaluate what is working and what is
              not. The trick is to orient your content according to what
              customers seem to consume more of. At the same time, ensure your
              content is topical and relevant to the consumers. Once you have a
              winning content formula in place, run with it, stay consistent
              with the style, and be honest about the promises you make.
              Because, as Maya Angelou says, “At the end of the day, people
              won’t remember what you said or did, they will remember how you
              made them feel.”
            </p>
            {!showForm && (
              <button onClick={handleFormButtonClick}>Open Form</button>
            )}
          </div>
          {showForm && (
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="Name">Name:</label>
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="PhoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Email">Email:</label>
                  <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default IetPage;
