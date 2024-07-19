import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContextProvider";
import { useNavigate } from "react-router-dom";

const AlertContext = React.createContext<any>({});

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("Something bad happened");
  }
  return context;
};

const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const { user } = useAuth();
  const [mapAlert, setMapAlert] = useState<any>(null);

  useEffect(() => {
    axios
      .get(
        "https://dementia-care-service-vhiugihsdq-ew.a.run.app/medicine/reminder/mathe@db.com/alerts"
      )
      .then((res: any) => {
        console.log(res);
      })
      .catch((e: any) => setAlert(true));
    setInterval(() => {
      axios
        .get(
          "https://dementia-care-service-vhiugihsdq-ew.a.run.app/medicine/reminder/mathe@db.com/alerts"
        )
        .then((res: any) => {
          console.log(res.data);
          if (res.data.length === 0) return;
          setData(res.data);
          setAlert(true);
        });
    }, 60 * 1000);
  }, []);

  useEffect(() => {
    if (user === null) return;
    axios
      .get(
        "https://dementia-care-service-vhiugihsdq-ew.a.run.app/safeArea/alerts",
        { headers: { email: user.email } }
      )
      .then((res: any) => {
        if (res.data.length === 0) {
          return;
        }
        setMapAlert(res.data);
      });
    setInterval(() => {
      axios
        .get(
          "https://dementia-care-service-vhiugihsdq-ew.a.run.app/safeArea/alerts",
          { headers: { email: user.email } }
        )
        .then((res: any) => {
          if (res.data.length === 0) return;
          if (res.data[0].acknowledged === true) {
            setMapAlert(null);
            return;
          }
          setMapAlert(res.data);
        });
    }, 30 * 1000);
  }, [user]);

  useEffect(() => {
    if (alert !== null) {
      setTimeout(() => {
        setAlert(null);
        setData(null);
      }, 5000);
    }
  }, [alert]);
  return (
    <AlertContext.Provider value={{ alert, setAlert, mapAlert }}>
      {children}
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
              window.location.replace(window.location.origin + "/locator");
            }}
            className="btn btn-sm"
          >
            See location
          </button>
        </div>
      )}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
