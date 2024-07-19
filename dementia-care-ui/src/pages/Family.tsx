import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Family = () => {
  const { user, setUserData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) return;
    axios
      .get(
        `https://dementia-care-service-vhiugihsdq-ew.a.run.app/userdetails/familydetails?email=${user.email}`
      )
      .then((res: any) => {
        setUserData(res.data);
      });
  }, [user]);
  return (
    <>
      <Navbar type="family" />
      <button
        onClick={() => navigate("/locator")}
        className="absolute bottom-[8rem] right-5 p-4 rounded-full bg-[#d71e1e] font-bold text-white tracking-widest uppercase transform hover:scale-105 hover:bg-[#e04721] transition-colors duration-200"
      >
        SOS
      </button>
    </>
  );
};

export default Family;
