import React, { useEffect, useState } from "react";
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
} from "maplibre-gl";
import * as turf from "@turf/turf";
import { useAuth } from "../contexts/AuthContextProvider";
import { useAlertContext } from "../contexts/AlertContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const Locator = () => {
  const [mapReady, setMapReady] = useState(false);
  const [position, setPosition] = useState<any>(null);
  const { setMapAlert, mapAlert } = useAlertContext();
  const navigate = useNavigate();

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!mapReady) return;
    const map0 = new MapLibreMap({
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
    setMap(map0);

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map0.addControl(nav, "top-left");

    // alert(`Flying to position ${pos.coords.latitude}`)

    const popup = new Popup({
      closeButton: false,
      closeOnClick: false,
    });
    map0.on("mouseenter", "great-circle", (e: any) => {
      map.getCanvas().style.cursor = "pointer";
      const coordinate = e;
    });
  }, [mapReady]);

  const patientMarker = new Marker({ color: "#FF0000" }).setLngLat([0, 0]);

  useEffect(() => {
    if (mapAlert === null) return;
    if (map === null || !map.isStyleLoaded()) {
      console.log("Before console", map);
      return;
    }
    console.log("Flying to");
    map.flyTo({
      center: [
        mapAlert.slice(-1)[0].currentLocation.longitude,
        mapAlert.slice(-1)[0].currentLocation.latitude,
      ],
      zoom: 12,
    });

    patientMarker.remove();
    patientMarker
      .setLngLat([
        mapAlert.slice(-1)[0].currentLocation.longitude,
        mapAlert.slice(-1)[0].currentLocation.latitude,
      ])
      .addTo(map);

    mapAlert
      .slice(-1)[0]
      .safeAreas.forEach((area: any, index: number, arr: Array<any>) => {
        new Marker({ color: "#0000FF" })
          .setLngLat([area.longitude, area.latitude])
          .addTo(map);

        const circle = turf.circle([area.longitude, area.latitude], 3, {
          steps: 64,
          units: "kilometers",
        });

        map.addLayer({
          id: `location-${index}`,
          type: "fill",
          source: {
            type: "geojson",
            data: circle,
          },
          paint: {
            "fill-color": "#8CFFFF",
            "fill-opacity": 0.5,
          },
        });

        const greatCircle = turf.greatCircle(
          turf.point([
            mapAlert.slice(-1)[0].currentLocation.longitude,
            mapAlert.slice(-1)[0].currentLocation.latitude,
          ]),
          turf.point([area.longitude, area.latitude]),
          {
            properties: { name: "Safe zone location" },
          }
        );

        if (mapAlert.length > 1) {
          const prevTimeStamp = mapAlert.slice(-2)[0].generatedAt;
          if (map.getLayer(`great-circle-${prevTimeStamp}-${index}`))
            map.removeLayer(`great-circle-${prevTimeStamp}-${index}`);
        }
        map.addLayer({
          id: `great-circle-${mapAlert.slice(-1)[0].generatedAt}-${index}`,
          type: "line",
          source: {
            type: "geojson",
            data: greatCircle,
          },
          paint: {
            "line-color": "#000000",
            "line-width": 3,
          },
        });
      });
  }, [mapAlert]);

  return (
    <>
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ref={() => setMapReady(true)}
        id="central-map"
      />
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

export default Locator;
