import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../contexts/AlertContextProvider";
import "./CareTaker.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { postSubmitData } from "../services/apiService";

import React, { useState } from "react";

const Family = () => {
  const { user, setUserData } = useAuth();
  const navigate = useNavigate();
  const { alert, mapAlert, data, setMapAlert } = useAlertContext();
  useEffect(() => {
    if (user === null) return;
    axios
      .get(
        `https://dementia-care-service-vhiugihsdq-ew.a.run.app/userdetails/familydetails?email=${user.email}`
      )
      .then((res: any) => {
        setUserData(res.data);
        setEmail(res.data.email);
        setCEmailAddress(res.data.patientDetails.caretakerEmailId);
        setDoctor(res.data.patientDetails.doctorName);
        setPatientName(res.data.patientDetails.name);
        if (res.data.patientDetails.medicines.length > 0) {
          setMedicineDetails1(res.data.patientDetails.medicines[0]);
          setMedicineName(res.data.patientDetails.medicines[0].name);
          setMedicineType(res.data.patientDetails.medicines[0].type);
          setDays(res.data.patientDetails.medicines[0].days[0]);
          setTime(res.data.patientDetails.medicines[0].times[0]);
          setReferredBy(res.data.patientDetails.medicines[0].referedBy);
          setComment(res.data.patientDetails.medicines[0].comment);
        }
        setDisease("Dementia");
      });
  }, [user]);
  function addMedicineDetails() {
    setMedicineDetails1(true);
    setMedicineDetails2(false);
    setMedicineDetails3(false);
    return false;
  }
  const [addMedicineDetails1, setMedicineDetails1] = useState(false);
  const [addMedicineDetails2, setMedicineDetails2] = useState(false);
  const [addMedicineDetails3, setMedicineDetails3] = useState(false);
  const [days, setDays] = React.useState("");
  const [time, setTime] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [patientName, setPatientName] = React.useState("");
  const [cEmailAddress, setCEmailAddress] = React.useState("");
  const [disease, setDisease] = React.useState("");
  const [doctor, setDoctor] = React.useState("");
  const [medicineName, setMedicineName] = React.useState("");
  const [medicineType, setMedicineType] = React.useState("");
  const [referredBy, setReferredBy] = React.useState("");
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios.post(
      `https://dementia-care-service-vhiugihsdq-ew.a.run.app/userdetails/addPatient?email=${email}&caretakerEmail=${cEmailAddress}`,
      {
        caretakerEmailId: cEmailAddress,
        name: patientName,
        medicines: [
          {
            id: "",
            name: medicineName,
            type: medicineType,
            days: [days],
            times: [time],
            referredBy: referredBy,
            comment: comment,
          },
        ],
        medicalDetails: disease,
        doctorName: doctor,
        safeAreas: [],
      }
    );
  };
  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value);
  };
  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleEmail = (event: SelectChangeEvent) => {
    setEmail(event.target.value);
  };
  const handlePatientName = (event: SelectChangeEvent) => {
    setPatientName(event.target.value);
  };
  const handleCEmailAddress = (event: SelectChangeEvent) => {
    setCEmailAddress(event.target.value);
  };
  const handleDisease = (event: SelectChangeEvent) => {
    setDisease(event.target.value);
  };
  const handleDoctor = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
  };
  const handleMedicineName = (event: SelectChangeEvent) => {
    setMedicineName(event.target.value);
  };
  const handleMedicineType = (event: SelectChangeEvent) => {
    setMedicineType(event.target.value);
  };
  const handleReferredBy = (event: SelectChangeEvent) => {
    setReferredBy(event.target.value);
  };
  const handleComment = (event: SelectChangeEvent) => {
    setComment(event.target.value);
  };
  return (
    <>
      <Navbar type="family" />
      
      <section className="py-10 bg-slate-950 min-h-screen h-fit">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="mt-6 overflow-hidden bg-white rounded-xl">
              <div className="px-6 py-12 sm:p-12">
                <h3 className="text-3xl font-semibold text-center text-gray-900">
                  Add Patient Details
                </h3>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  ></AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                          <div>
                            <label className="text-base font-medium text-gray-900">
                              {" "}
                              Personal Email{" "}
                            </label>
                            <div className="mt-2.5 relative">
                              <input
                                type="email"
                                name=""
                                id=""
                                required
                                onChange={handleEmail}
                                value={email}
                                placeholder="Enter your full name"
                                className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-base font-medium text-gray-900">
                              {" "}
                              Patient name{" "}
                            </label>
                            <div className="mt-2.5 relative">
                              <input
                                type="text"
                                name=""
                                required
                                id=""
                                onChange={handlePatientName}
                                value={patientName}
                                placeholder="Enter your full name"
                                className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-base font-medium text-gray-900">
                              {" "}
                              Caretaker email address{" "}
                            </label>
                            <div className="mt-2.5 relative">
                              <input
                                required
                                type="email"
                                name=""
                                id=""
                                onChange={handleCEmailAddress}
                                value={cEmailAddress}
                                placeholder="Enter your full name"
                                className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-base font-medium text-gray-900">
                              {" "}
                              Disease{" "}
                            </label>
                            <div className="mt-2.5 relative">
                              <input
                                required
                                type="text"
                                name=""
                                id=""
                                onChange={handleDisease}
                                value={disease}
                                placeholder="Enter disease diagnosed"
                                className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-base font-medium text-gray-900">
                              {" "}
                              Suggested Doctor{" "}
                            </label>
                            <div className="mt-2.5 relative">
                              <input
                                required
                                type="text"
                                name=""
                                id=""
                                onChange={handleDoctor}
                                value={doctor}
                                placeholder="Enter doctor's name"
                                className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-base font-medium text-gray-900">
                              {" "}
                              Medicine Details{" "}
                            </label>
                            <div className="mt-2.5 relative">
                              <button
                                type="button"
                                onClick={addMedicineDetails}
                                className="inline-flex items-center justify-center px-4 py-4 mt-2 text-base text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                              >
                                Add
                              </button>
                            </div>
                            {addMedicineDetails1 ? (
                              <div>
                                <div>
                                  <label className="text-base font-medium text-gray-900">
                                    {" "}
                                    Medicine Name{" "}
                                  </label>
                                  <div className="mt-2.5 relative">
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      required
                                      onChange={handleMedicineName}
                                      value={medicineName}
                                      placeholder="Enter Medicine Name"
                                      className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-base font-medium text-gray-900">
                                    {" "}
                                    Medicine Type{" "}
                                  </label>
                                  <div className="mt-2.5 relative">
                                    <input
                                      type="text"
                                      name=""
                                      required
                                      id=""
                                      onChange={handleMedicineType}
                                      value={medicineType}
                                      placeholder="Enter Medicine Name"
                                      className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <span className="direction1">
                                    <InputLabel id="demo-simple-select-standard-label">
                                      Days
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={days}
                                      onChange={handleChange}
                                      label="Days"
                                    >
                                      <MenuItem value={"MONDAY"}>
                                        MONDAY
                                      </MenuItem>
                                      <MenuItem value={"TUESDAY"}>
                                        TUESDAY
                                      </MenuItem>
                                      <MenuItem value={"WEDNESDAY"}>
                                        WEDNESDAY
                                      </MenuItem>
                                      <MenuItem value={"THURSDAY"}>
                                        THURSDAY
                                      </MenuItem>
                                      <MenuItem value={"FRIDAY"}>
                                        FRIDAY
                                      </MenuItem>
                                      <MenuItem value={"SATURDAY"}>
                                        SATURDAY
                                      </MenuItem>
                                      <MenuItem value={"SUNDAY"}>
                                        SUNDAY
                                      </MenuItem>
                                    </Select>
                                  </span>
                                  <span className="">
                                    <InputLabel id="demo-simple-select-standard-label">
                                      Time
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-standard-label"
                                      id="demo-simple-select-standard"
                                      value={time}
                                      onChange={handleTime}
                                      label="Time"
                                    >
                                      <MenuItem value={"12:00"}>12:00</MenuItem>
                                      <MenuItem value={"01:00"}>01:00</MenuItem>
                                      <MenuItem value={"02:00"}>02:00</MenuItem>
                                      <MenuItem value={"03:00"}>03:00</MenuItem>
                                      <MenuItem value={"04:00"}>04:00</MenuItem>
                                      <MenuItem value={"05:00"}>05:00</MenuItem>
                                      <MenuItem value={"06:00"}>06:00</MenuItem>
                                      <MenuItem value={"07:00"}>07:00</MenuItem>
                                      <MenuItem value={"08:00"}>08:00</MenuItem>
                                      <MenuItem value={"09:00"}>09:00</MenuItem>
                                      <MenuItem value={"10:00"}>10:00</MenuItem>
                                      <MenuItem value={"11:00"}>11:00</MenuItem>
                                    </Select>
                                  </span>
                                </div>

                                <div>
                                  <label className="text-base font-medium text-gray-900">
                                    {" "}
                                    Referred By{" "}
                                  </label>
                                  <div className="mt-2.5 relative">
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      onChange={handleReferredBy}
                                      value={referredBy}
                                      placeholder="Referred By"
                                      className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-base font-medium text-gray-900">
                                    {" "}
                                    Comment{" "}
                                  </label>
                                  <div className="mt-2.5 relative">
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      onChange={handleComment}
                                      value={comment}
                                      placeholder="Comment"
                                      className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          <div className="sm:col-span-2">
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => navigate("/set-location")}
                              className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                            >
                              Set safe zone areas
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
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
          className="alert alert-error shadow-lg sticky bottom-5 left-5 w-[600px] z-60"
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
              axios
                .put(
                  "https://dementia-care-service-vhiugihsdq-ew.a.run.app/safeArea/alerts/acknowledged",
                  {},
                  {
                    headers: {
                      email: mapAlert[0].userEmailId,
                      id: mapAlert[0].id,
                    },
                  }
                )
                .then(() => {
                  setMapAlert(null);
                });
            }}
            className="btn btn-sm"
          >
            Acknowledge
          </button>
          <button
            onClick={() => {
              navigate("/locator");
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
