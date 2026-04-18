"use client";

import { useEffect, useRef } from "react";
import { type Resource, categoryLabels, categoryColors } from "@/lib/resources-data";
import { useBookmarks } from "@/lib/bookmarks-context";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ResourceMapProps {
  resources: Resource[];
}

// Custom marker colors based on category
const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    food: "#f59e0b",
    housing: "#3b82f6",
    health: "#f43f5e",
    education: "#8b5cf6",
    employment: "#10b981",
    youth: "#f97316",
    seniors: "#14b8a6",
    legal: "#64748b",
    community: "#ec4899",
  };
  return colors[category] || "#6b7280";
};

export const ResourceMap = ({ resources }: ResourceMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Atlanta center coordinates
    const atlantaCenter: [number, number] = [33.749, -84.388];

    // Initialize map
    const map = L.map(mapRef.current, {
      center: atlantaCenter,
      zoom: 11,
      zoomControl: true,
    });

    // Add dark-themed tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when resources change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for each resource
    resources.forEach((resource) => {
      const color = getCategoryColor(resource.category);
      const bookmarked = isBookmarked(resource.id);

      // Create custom icon
      const icon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: ${color};
            border: 3px solid ${bookmarked ? "#f43f5e" : "white"};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: white;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([resource.lat, resource.lng], { icon }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <div style="
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 10px;
            font-weight: 500;
            margin-bottom: 8px;
            background: ${color}33;
            color: ${color};
            border: 1px solid ${color}55;
          ">
            ${categoryLabels[resource.category]}
          </div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">
            ${resource.name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; line-height: 1.4;">
            ${resource.description.slice(0, 100)}...
          </p>
          <p style="margin: 0 0 4px 0; font-size: 11px; color: #888;">
            ${resource.address}
          </p>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #888;">
            ${resource.hours}
          </p>
          <a href="${resource.website}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            padding: 6px 12px;
            background: #1a1a1a;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 500;
          ">
            Visit Website
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
    });
  }, [resources, isBookmarked]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-border/30">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-xl p-3 border border-border/30 z-[1000]">
        <p className="text-xs font-medium text-foreground mb-2">Resource Types</p>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
          {Object.entries(categoryLabels).slice(0, 6).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: getCategoryColor(key) }}
              />
              <span className="text-[10px] text-foreground/70">{label.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
