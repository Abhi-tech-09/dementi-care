import React, { useEffect, useState } from "react";
import { Map as MapLibreMap, Marker, NavigationControl, Popup } from "maplibre-gl";
import * as turf from "@turf/turf";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const Locator = () => {
  const [mapReady, setMapReady] = useState(false);
  const [position, setPosition] = useState<any>(null);

  const safeZone = {
    lng: 73.78135740433044,
    lat: 18.566126359865734,
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
          new Marker({ color: "#0000FF" })
            .setLngLat([safeZone.lng, safeZone.lat])
            .addTo(map);

          const circle = turf.circle([safeZone.lng, safeZone.lat], 3, {
            steps: 64,
            units: "kilometers",
          });

          map.addLayer({
            id: "location",
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
            turf.point([pos.coords.longitude, pos.coords.latitude]),
            turf.point([safeZone.lng, safeZone.lat]),
            {
              properties: { name: "Safe zone location" },
            }
          );

          console.log(greatCircle)

          map.addLayer({
            id: "great-circle",
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
    });

    const popup = new Popup({
        closeButton: false, 
        closeOnClick: false,
    }); 
    map.on('mouseenter', 'great-circle', (e) => {
        map.getCanvas().style.cursor = 'pointer'; 
        const coordinate = e
    } )
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
          alert("Calculating your distance from safezones");
        }}
        className="btn btn-primary z-20 absolute top-5 left-20"
      >
        Set current location
      </button>
    </>
  );
};

export default Locator;
