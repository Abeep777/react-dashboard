import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Grid } from "@mui/material";

function UserScreen() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Fetch user data from the backend (replace the URL with your actual backend endpoint)
    axios
      .get("../../../mockData/userData.json")
      .then((response) => setUserData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {userData ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <img
                src={userData.pfphoto}
                alt="profile-pic"
                height="200px"
                width="200px"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <p>Name: {userData.name}</p>
              <p>Date of Birth: {userData.dob}</p>
              <p>Email: {userData.email}</p>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserScreen;
