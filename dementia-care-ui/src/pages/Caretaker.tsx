import { useEffect } from "react";
import Navbar from "../components/Navbar";

import "./CareTaker.scss";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { fetchPosts1 } from "../services/apiService";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContextProvider";
interface IProps {}
const imageArray = [
  "https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg",
  "https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg",
  "https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg",
];
const chartSetting = {
  xAxis: [
    {
      label: "Ratings",
    },
  ],
  width: 300,
  height: 220,
};

const dataset = [
  {
    value: 10,
    rating: "Great",
  },
  {
    value: 3,
    rating: "Good",
  },
  {
    value: 7,
    rating: "Poor",
  },
];

const CareTaker = () => {
  const [postData, setPostData] = useState<any>({});
  const { user } = useAuth();
  useEffect(() => {
    if (user === null) return;
    const getPosts = () => {
      const payload: any = {
        email: user.email,
      };
      try {
        fetchPosts1(payload).then((res) => {
          setPostData(res);
        });
      } catch (error) {
      } finally {
      }
    };

    getPosts();
  }, [user]);
  return (
    <>
      <Navbar type="caretaker" />
      <section className="py-10 sm:py-8 bg-slate-950 min-h-screen h-fit">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl direction1 chartPadding">
          <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-rows-3">
            <div className="overflow-hidden bg-white rounded-xl">
              <div className="p-6 fontData">Total Patient : 200 +</div>
              <div className="p-6 fontData">
                Total Appointments Till Date : 289
              </div>
              <div className="p-6 fontData">Active Patient : 3</div>
            </div>
            <div className="overflow-hidden bg-white rounded-xl">
              <div className="p-6">
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "New Patient" },
                        { id: 1, value: 15, label: "Old Patient" },
                        { id: 2, value: 25, label: "Total Patient" },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded-xl">
              <div className="p-6">
                <BarChart
                  dataset={dataset}
                  yAxis={[{ scaleType: "band", dataKey: "rating" }]}
                  series={[{ dataKey: "value", label: "Patient Reviews" }]}
                  layout="horizontal"
                  {...chartSetting}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl ">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl fontColor">
              Welcome {postData.caretakerName} !
            </h2>
            {/* <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p> */}
          </div>

          <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
              <div className="overflow-hidden bg-white rounded-xl">
                <div className="p-6">
                  <svg
                    className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p className="mt-6 text-lg font-medium text-gray-900">
                    {postData.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden bg-white rounded-xl">
                <div className="p-6">
                  <svg
                    className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-6 text-lg font-medium text-gray-900">
                    {postData.caretakerEmail}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden bg-white rounded-xl">
                <div className="p-6">
                  <svg
                    className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                    {postData.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden bg-white rounded-xl">
              <div className="px-6 py-12 sm:p-12">
                <section className="py-10 bg-gray-100 sm:py-8">
                  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-3xl font-semibold text-center text-gray-900">
                        Active Patient Information
                      </h3>
                    </div>

                    <div className="grid max-w-xl grid-cols-1 mx-auto mt-8 text-center lg:max-w-full sm:mt-12 lg:mt-20 lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-6">
                      {postData.familyDetailsResponseDTOS &&
                        postData.familyDetailsResponseDTOS.map(
                          (patient: any, index: any) => {
                            return (
                              <div className="overflow-hidden bg-white rounded-md shadow">
                                <div className="px-8 py-12">
                                  <div className="relative w-24 h-24 mx-auto">
                                    <img
                                      className="relative object-cover w-24 h-24 mx-auto rounded-full"
                                      src={imageArray[index]}
                                      alt=""
                                    />
                                    {/* <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                                                                <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path
                                                                        d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                                                    ></path>
                                                                </svg>
                                                            </div> */}
                                  </div>
                                  <div>
                                    <span className="mt-1 text-base patient-font">
                                      Name :{" "}
                                    </span>
                                    <span className="mt-1 text-base text-gray-600">
                                      {patient.patientDetails.name}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="mt-1 text-base patient-font">
                                      Doctor :{" "}
                                    </span>
                                    <span className="mt-1 text-base text-gray-600">
                                      {patient.patientDetails.doctorName}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="mt-1 text-base patient-font">
                                      Comment :{" "}
                                    </span>
                                    <span className="mt-1 text-base text-gray-600">
                                      {
                                        patient.patientDetails.medicines[0]
                                          .comment
                                      }
                                    </span>
                                  </div>
                                  <div>
                                    <span className="mt-1 text-base patient-font">
                                      Medicine name :{" "}
                                    </span>
                                    <span className="mt-1 text-base text-gray-600">
                                      {patient.patientDetails.medicines[0].name}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="mt-1 text-base patient-font">
                                      Medicine type :{" "}
                                    </span>
                                    <span className="mt-1 text-base text-gray-600">
                                      {patient.patientDetails.medicines[0].type}
                                    </span>
                                  </div>
                                  {/* <div><span className="mt-1 text-base text-gray-600">Referred by : </span><span className="mt-1 text-base text-gray-600">{patient.patientDetails.medicines[0].referredBy}</span></div> */}
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareTaker;
