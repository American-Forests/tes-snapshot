import { ViewState } from "react-map-gl"
import { LngLatLike } from "react-map-gl"

export interface MapProps {
  activeStep?: string
}

export interface ViewportState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  bearing: number;
  duration?: number;
  essential?: boolean;
  curve?: number;
  speed?: number;
  easing?: (t: number) => number;
}

export interface FlourishProps {
  storyId: string,
  width?: string
}

// avoid any type error
export interface WindowWithVisuals extends Window {
  visuals?: {
    loadEmbed?: (storyId: string) => Promise<void>
  }
  FlourishLoaded?: boolean
}

export interface CoverSectionProps {
  location: string;
  title: string;
  subtitle: string;
  coverImage: string;
  locationColor: string;
  titleColor: string | null;
  titleLength?: "long" |"short"
}

export interface NavSection {
  id: string
  labelTop: string,
  labelBottom: string,
  activeIds?: string[],
  adjustment?: number
}

export interface StickyNavbarProps {
  sections: NavSection[]
  activeSection: string
  isVisible: boolean
  activeColor: string
}

export interface BasicLinkProps {
  url: string;
  text: string;
}

export interface StoryContentProps {
  onStepEnter: (data: { data: string | null }) => void
  currentStepImage: string
}

interface GeocoderOptions {
  bbox?: [number, number, number, number];
  proximity?: LngLatLike;
  country?: string;
  types?: Set<string>
}

interface SearchFeature {
  geometry: {
    coordinates: [number, number]
  }
}

interface SearchResponse {
  features: SearchFeature[]
}

export interface GeocoderComponentProps {
  options?: GeocoderOptions;
  onRetrieve?: (response: SearchResponse) => void
}

export interface GeocoderProps {
  viewport: ViewState;
  setViewport: (viewport: ViewState) => void;
  bbox?: [number, number, number, number];
  proximity?: LngLatLike;
  placeholder?: string
}