import type {
  SourceProps,
  LayerProps,
  SymbolLayer
} from "react-map-gl"
import type { Expression } from "mapbox-gl"
import { TILESERVER_URL } from "app/constants"
import type { 
  Feature, 
  Point 
} from "geojson"
import { MAPBOX_TOKEN } from "../shared/constants"

export const viewportConfigs = {
  // whole city of Austin
  viewport1: {
    longitude: -97.7220,
    latitude: 30.2900,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  },

  // Kealing Middle School 1
  viewport2: {
    longitude: -97.7218,
    latitude: 30.271,
    zoom: 16.5,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  },

  // Kealing Middle School 2
  viewport3: {
    longitude: -97.7207,
    latitude: 30.2730,
    zoom: 16,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  }
}

export const flyToOptions = {
  duration: 1000,
  essential: true,
  padding: { top: 20, bottom: 20, left: 20, right: 20 }, 
  curve: 1,
  speed: 0.6,
  easing: (t: number) => t
}

const formatTileserverUrl = (layer: string): string => {
  return `${TILESERVER_URL}/${layer}/{z}/{x}/{y}.pbf`
}

export const mapCommonProps = {
  mapboxAccessToken: MAPBOX_TOKEN,
  style: { width: '100%', height: '100%' },
  scrollZoom: false,
  interactiveLayerIds: ['tree-canopy-layer', 'shade-layer', 'route1-layer', 'route2-layer', 'public-schools-layer', 'private-schools-layer', 'sidewalks-layer']
}

export const publicSchoolsSymbology = {
  paint: {
    'circle-radius': 4,
    'circle-color': '#FFD7FB',
    'circle-opacity': 0.3,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#FFE2FC',
    'circle-stroke-opacity': 1
  }
}

export const privateSchoolsSymbology = {
  paint: {
    'circle-radius': 4,
    'circle-color': '#EFB74F',
    'circle-opacity': 0.3,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#EFB74F',
    'circle-stroke-opacity': 1
  }
}

export const blockgroupsSourceProps: SourceProps = {
  id: "aus_bg-d7t0py",
  type: "vector",
  url: `mapbox://grosenberg-af.9fsuktli`
}

export const treeCanopyLayerProps: LayerProps = {
  id: "tree-canopy-layer",
  type: "fill",
  source: "austin-blockgroups",
  'source-layer': "aus_bg-d7t0py",
  paint: {
    'fill-color': [
      'interpolate',
      ['linear'],
      ['get', 'tree_canop'],
      0, '#FFFFFF', // Color for values < 0.5
      0.5, '#379C68', // Color for values > 0.5
      1, '#379C68'
    ] as Expression,
    'fill-opacity': [
      'step',
      ['get', 'tree_canop'],
      0.7,
      0.5, 1
    ],
    'fill-outline-color': '#11090E'
  }
}

export const publicSchoolsSourceProps: SourceProps = {
  id: "public_schools-91ceeq",
  type: "vector",
  url: "mapbox://grosenberg-af.5i4yygai"
}

export const publicSchoolsLayerProps: LayerProps = {
  id: "public-schools-layer",
  type: "circle",
  source: "public-schools",
  'source-layer': "public_schools-91ceeq",
  ...publicSchoolsSymbology
}

export const privateSchoolsSourceProps: SourceProps = {
  id: "private_schools-4pzbh7",
  type: "vector",
  url: "mapbox://grosenberg-af.8ou5vb0e"
}

export const privateSchoolsLayerProps: LayerProps = {
  id: "private-schools-layer",
  type: "circle",
  source: "private-schools",
  'source-layer': "private_schools-4pzbh7",
  ...privateSchoolsSymbology
}

export const route1SourceProps: SourceProps = {
  id: "route1",
  type: "vector",
  url: "mapbox://grosenberg-af.b18pxyfu"
}

export const route2SourceProps: SourceProps = {
  id: "route2",
  type: "vector",
  url: "mapbox://grosenberg-af.0zztp5fn"
}

export const labelSources: Record<string, Feature<Point>> = {
  route1Label: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-97.722, 30.2738]
    },
    properties: {
      title: "Route 1 ↓"
    }
  },
  route2Label: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-97.718, 30.274]
    },
    properties: {
      title: "← Route 2"
    }
  },
  schoolLabel: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-97.7216, 30.271]
    },
    properties: {
      title: "Kealing Middle School"
    }
  },
  homeLabel: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-97.719, 30.2752]
    },
    properties: {
      title: "Home"
    }
  }
}

export const createLabelLayout = (visibility: "visible" | "none"): SymbolLayer['layout'] => ({
  "text-field": ["get", "title"] as Expression,
  "text-size": 20,
  "text-anchor": "center",
  "text-allow-overlap": true,
  "text-ignore-placement": true,
  "text-font": ["Arial Unicode MS Bold"],
  visibility
})

export const labelPaint: SymbolLayer['paint'] = {
  "text-color": "#ffffff",
  "text-halo-color": "#000000",
  "text-halo-width": 2
}

export const treesSourceProps: SourceProps = {
  id: "austin_tree",
  type: "vector",
  maxzoom: 15,
  // This tells Mapbox to use the tiles from zoom 15 when zooming beyond it
  promoteId: {
    'data': 'id'
  },
  tiles: [formatTileserverUrl("austin_tree")]
}

export const treesLayerProps: LayerProps = {
  id: "trees-layer",
  type: "fill",
  source: "trees",
  'source-layer': "data",
  maxzoom: 20,
  paint: {
    'fill-color': '#005251',
    'fill-opacity': 0.2,
    'fill-outline-color': '#00AE95'
  }
}

export const sidewalksSourceProps: SourceProps = {
  id: "austin_sidewalks",
  type: "vector",
  maxzoom: 15,
  // This tells Mapbox to use the tiles from zoom 15 when zooming beyond it
  promoteId: {
    'data': 'id'
  },
  tiles: [formatTileserverUrl("austin_sidewalks")]
}