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

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const Locator = () => {
  const [mapReady, setMapReady] = useState(false);
  const [position, setPosition] = useState<any>(null);
  const { mapAlert } = useAlertContext();
  console.log(mapAlert);

  const [map, setMap] = useState<any>();

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

  const patientMarker = new Marker({ color: "#FF0000" })
      .setLngLat([0, 0]);

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

        console.log(map.getLayer(`great-circle-${index}`));
        // if(map.getLayer) then update the same layer (next set of)
        // else create new layer (first time)
        if (mapAlert.length > 1) {
          const prevTimeStamp = mapAlert.slice(-2)[0].generatedAt;
          if(map.getLayer(`great-circle-${prevTimeStamp}-${index}`) )
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
    </>
  );
};

export default Locator;
