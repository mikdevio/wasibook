import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/auth";

const Sidebar: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <></>;
};

export default Sidebar;
