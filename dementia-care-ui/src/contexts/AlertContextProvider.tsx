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
    }, 10 * 1000);
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
    <AlertContext.Provider value={{ alert, setAlert, mapAlert, setMapAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
