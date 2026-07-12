import { tripConfig } from "../data/tripConfig";
import type { Attraction, Coordinate } from "../types/trip";

export const getAttractionCoordinate = (attraction: Attraction): Coordinate => {
  if (typeof attraction.lng === "number" && typeof attraction.lat === "number") {
    return { lng: attraction.lng, lat: attraction.lat };
  }

  return tripConfig.hotelFallbackCoordinate;
};

export const isCoordinateFallback = (attraction: Attraction) =>
  !(typeof attraction.lng === "number" && typeof attraction.lat === "number");
