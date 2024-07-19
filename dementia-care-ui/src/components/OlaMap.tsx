import { useEffect, useState } from "react";
import { Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { useAuth } from "../contexts/AuthContextProvider";
import axios from "axios";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const OlaMap = () => {
  const [mapReady, setMapReady] = useState(false);
  const [position, setPosition] = useState<Array<Array<number>>>([]);
  const { userData, user} = useAuth();

  console.log(user, userData)
  const addSafeZone = () => {
    axios.put(
      `https://dementia-care-service-vhiugihsdq-ew.a.run.app/userdetails/updatePatient?familymMemberEmail=${user.email}`,
      {
        ...userData.patientDetails,
        safeAreas: position.map((pos: any) => ({
          latitude: pos[1],
          longitude: pos[0],
        })),
      }
    );
  };


  useEffect(() => {
    if (!mapReady) return;
    const map = new MapLibreMap({
      container: "central-map",
      center: [0, 0],
      zoom: 0,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        console.log(url);
        url =
          url +
          `${url.split("?")[1] ? "&" : "?"}` +
          "api_key=0rFV3uJj3h02TgqSmIfctiIjMpPvtQQYaJ02wBf9";
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // alert(`Flying to position ${pos.coords.latitude}`)
          map.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 12,
          });
          new Marker({ color: "#FF0000" })
            .setLngLat([pos.coords.longitude, pos.coords.latitude])
            .addTo(map);
          alert("Detected your current location");
        },
        () => {},
        options
      );
    }, 4000);

    map.on("click", (e) => {
      console.log("Clicked", e);
      new Marker({ color: "#0000FF" })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(map);
      setPosition((prevPosition) => [
        ...prevPosition,
        [e.lngLat.lng, e.lngLat.lat],
      ]);
    });
  }, [mapReady]);

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
      <button
        onClick={() => {
          alert("Capturing your safe zone locations");
          addSafeZone();
        }}
        className="btn btn-primary z-20 absolute top-5 left-20"
      >
        Set safe zone locations{" "}
      </button>
    </>
  );
};

export default OlaMap;
