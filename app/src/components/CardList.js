import React, { useState } from "react";
import { Card } from "./Card";
import axios from "axios";

// const initialUsers = [{

// }]

export const CardList = () => {
  const [card, setCard] = useState([]);

  axios.get("https://api-project-num4.herokuapp.com/api/users").then((res) => {
    console.log(res);
    setCard(res.data)
  });
  return <div></div>;
};
