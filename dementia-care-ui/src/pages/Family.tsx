import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../contexts/AlertContextProvider";

const Family = () => {
  const { user, setUserData } = useAuth();
  const navigate = useNavigate();
  const {alert, mapAlert, data, setMapAlert} = useAlertContext();
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
      {alert !== null && (
        <div
          role="alert"
          className="alert alert-error shadow-lg absolute bottom-5 left-5 w-[500px] z-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">{data && data.type}</h3>
            <div className="text-xs">{data && data.comment}</div>
          </div>
          <button className="btn btn-sm">See</button>
        </div>
      )}
      {mapAlert !== null && (
        <div
          role="alert"
          className="alert alert-error shadow-lg absolute bottom-5 left-5 w-[600px] z-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">
              {mapAlert && "Patient has moved out of safe zone area"}
            </h3>
          </div>
          <button
            onClick={() => {
              axios.put(
                "https://dementia-care-service-vhiugihsdq-ew.a.run.app/safeArea/alerts/acknowledged",
                {},
                {
                  headers: {
                    email: mapAlert[0].userEmailId,
                    id: mapAlert[0].id,
                  },
                }
              ).then(() => {setMapAlert(null)});
            }}
            className="btn btn-sm"
          >
            Acknowledge
          </button>
          <button
            onClick={() => {
              navigate("/locator")
            }}
            className="btn btn-sm"
          >
            See location
          </button>
        </div>
      )}
    </>
  );
};

export default Family;
