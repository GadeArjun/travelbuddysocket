import React, { useContext, useEffect, useState } from "react";
import "./Chats.css";
import UsersList from "../../components/UsersList/UsersList";
import MessageSection from "../../components/MessageSection/MessageSection";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import UserContext from "../../Context/UserContext";

function Chats() {
  const [userClick, setUserClick] = useState(null);
  const [user_email, set_user_email] = useState(null);
  const { nearestPlaces } = useContext(UserContext);
  const { id } = useParams();
  const explorePlace = nearestPlaces.find((place) => +place.id === +id);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [usersList, setUsersList] = useState([]);
  //

  useEffect(() => {
    async function getAllUsers() {
      try {
        // console.log("enter", explorePlace.name);

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/trips`
        );

        const tripData = response.data;
        // console.log({ tripData });

        const filteredUserList = tripData
          .filter((item) => item.destination === explorePlace?.name)
          .filter((item) => item.user_email !== user_email)
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex((obj) => obj.user_email === item.user_email)
          );
        setUsersList(filteredUserList);
        console.log({ filteredUserList });

        // console.log({ usersList }, "asdg");
      } catch (err) {
        // console.log(err);
      }
    }

    getAllUsers();
  }, [usersList, explorePlace, user_email]);

  useEffect(() => {
    try {
      setSocket(io("https://fuzzy-telegram-5gqvvqvgxxg6347w9-8081.app.github.dev"));
    } catch (error) {
      console.log({ error });
    }

   
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("travel_buddy_token");
    if (token) {
      socket?.emit("token", token);
    } else {
      navigate("/signup");
    }
  }, [socket, navigate]);

  async function fetchMessages(sender, receiver) {
    try {
      // console.log({ sender, receiver });
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/messages`,
        {
          params: { sender, receiver },
        }
      );

      if (response) {
        // console.log(response.data);
        const messages = response.data;
        messages?.foreach((msg, index) => {
          setMessages((prev) => [...prev, msg]);
        });
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    fetchMessages(user_email, userClick?.user_email);
  }, [userClick, user_email]);

  socket?.on("user_email", (user_email) => {
    // console.log(user_email);
    set_user_email(user_email);
  });

  function sendMsg(msg) {
    const msg_details = {
      receiver: userClick?.user_email,
      msg: msg,
      sender: user_email,
    };
    setMessages((prev) => [...prev, msg_details]);
    socket?.emit("msg", msg_details);
  }

  socket?.on("msg", (msg) => {
    setMessages((prev) => [...prev, msg]);

    // console.log(msg);
  });

  return (
    <div className="user-chat-container">
      <UsersList usersList={usersList} setUserClick={setUserClick} />
      <MessageSection
        messages={messages}
        userClick={userClick}
        sendMsg={sendMsg}
        user={user_email}
      />
    </div>
  );
}

export default Chats;
