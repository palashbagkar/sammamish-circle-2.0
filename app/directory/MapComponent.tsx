"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Resource {
  id: number;
  title: string;
  type: string;
  location: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface MapComponentProps {
  resources: Resource[];
  hoveredResourceId: number | null;
}

export default function MapComponent({
  resources,
  hoveredResourceId,
}: MapComponentProps) {
  
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      const map = L.map("map").setView([47.6062, -122.0355], 12);

map.attributionControl.setPrefix(false);

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "© OpenStreetMap" }
).addTo(map);






      mapRef.current = map;
    }

    return () => {
      // Clean up markers
      Object.values(markersRef.current).forEach((marker) => {
        marker.remove();
      });
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove();
    });
    markersRef.current = {};

    // Create custom icon function
    const createIcon = (isHighlighted: boolean) => {
      return L.divIcon({
        
        className: "custom-marker",
        html: `
          <div class="marker-pin ${isHighlighted ? "highlighted" : ""}">
            <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C16.7956 32 17.5763 31.9397 18.3382 31.8234L16 42L13.6618 31.8234C14.4237 31.9397 15.2044 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" fill="${
                isHighlighted ? "#FFC300" : "#244747"
              }"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
            </svg>
          </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });
    };

    // Add markers for each resource
    resources.forEach((resource) => {
      const isHighlighted = hoveredResourceId === resource.id;
      const icon = createIcon(isHighlighted);

      const marker = L.marker([resource.latitude, resource.longitude], {
        icon,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div class="map-popup">
          <h4>${resource.title}</h4>
          <p class="popup-type">${resource.type}</p>
          <p class="popup-location">${resource.location}</p>
          <p class="popup-location">${resource.address}</p>
        </div>
      `);

      // Open popup when hovering over the card
      if (isHighlighted) {
        marker.openPopup();
        mapRef.current!.setView([resource.latitude, resource.longitude], 13, {
          animate: true,
        });
      }

      markersRef.current[resource.id] = marker;
    });
  }, [resources, hoveredResourceId]);

  return <div id="map" className="leaflet-map"></div>;
}
