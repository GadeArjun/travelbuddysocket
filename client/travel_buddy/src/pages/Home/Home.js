import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiplePlaceCard from "../../components/MultiplePlaceCard/MultiplePlaceCard";
import axios from "axios";
import UserContext from "../../Context/UserContext";

function Home() {
  const navigate = useNavigate();
  const { position, nearestPlaces, setUserData } = useContext(UserContext);
  // console.log({ position });

  useEffect(() => {
    async function authenticatingUser(token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          navigate("/signup");
          // console.log(response.status);
        }
        // console.log(response.data);
      } catch (err) {
        console.log({ err });
        navigate("/signup");
      }
    }


    const token = localStorage.getItem("travel_buddy_token");
    if (!token || token === undefined || token === null) {
      navigate("/signin");
    } else {
      authenticatingUser(token);
    }
  }, [navigate, setUserData]);

  return (
    <div>
      <MultiplePlaceCard
        title={"Nearest Places"}
        places={nearestPlaces}
        position={position}
      />
    </div>
  );
}

export default Home;
