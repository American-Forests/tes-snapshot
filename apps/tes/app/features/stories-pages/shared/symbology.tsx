import { Expression } from "mapbox-gl"
import { GeoJsonProperties } from "geojson"

export const shadeFillSymbology = (timeColumn: string) => ({
    'fill-color': [
        'interpolate',
        ['linear'],
        ['get', timeColumn],
        0, '#F6D0B1',
        16.6, '#C2CAD4',
        33.3, '#8B929E',
        50, '#47505F',
        100, '#47505F'
    ] as Expression,
    'fill-opacity': 0.85,
    'fill-outline-color': '#11090E'
})

 export const shadeLineSymbology = (timeColumn: string, hoveredFeature: GeoJsonProperties | null = null) => ({
    'line-color': [
        'interpolate',
        ['linear'],
        ['get', timeColumn],
        0, '#F6D0B1',
        16.6, '#C2CAD4',
        33.3, '#8B929E',
        50, '#47505F',
        100, '#47505F'
    ] as Expression,
    'line-opacity': 0.85,
    'line-width': [
        'case',
        ['==', 
            ['get', 'sidewalks_'],
            hoveredFeature?.sidewalks_ || ''
        ],
        8,  // Width when hovered
        4   // Default width
    ] as Expression
})

export const detroitShadeSymbology = (timeColumn: string) => ({
    'fill-color': [
        'interpolate',
        ['linear'],
        ['get', timeColumn],
        0, '#F6D0B1',
        0.166, '#C2CAD4',
        0.333, '#8B929E',
        0.5, '#3D485B',
        1, '#3D485B'
    ] as Expression,
    'fill-opacity': 0.85,
    'fill-outline-color': '#343434'
})

export const busStopSymbology = (timeColumn: string, hoveredFeature: GeoJsonProperties | null = null ) => ({
    'circle-color': [
        'interpolate',
        ['linear'],
        ['get', timeColumn],
        0, '#F6D0B1',
        16.6, '#C2CAD4',
        33.3, '#8B929E',
        50, '#3D485B',
        100, '#3D485B'
    ] as Expression,
    'circle-opacity': 0.85,
    'circle-stroke-width': [
        'case',
        ['==',
            ['get', 'Descriptio'],
            hoveredFeature?.Descriptio || ''
        ],
        2,
        1
    ] as Expression,
    'circle-stroke-color': [
        'case',
        ['==', 
            ['get', 'Descriptio'],
            hoveredFeature?.Descriptio || ''
        ],
        "#FFBC2B",  // Width when hovered
        "#FFFFFF"   // Default width
      ] as Expression,
    'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', timeColumn],
        0, 3,
        25, Math.sqrt(25) * 1.5,
        50, Math.sqrt(50) * 1.5,
        75, Math.sqrt(75) * 1.5,
        100, Math.sqrt(100) * 1.5 
    ] as Expression
})