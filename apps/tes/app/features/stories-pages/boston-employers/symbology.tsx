import { Expression, SymbolLayout } from "mapbox-gl"
import { GeoJsonProperties } from "geojson"

export const TESFillSymbology = ({
    'fill-color': [
        'interpolate',
        ['linear'],
        ["get", "tes"],
        0, '#F99D3E',
        70, '#F99D3E',
        100, '#6CC396'
    ] as Expression,
    'fill-opacity': 0.75,
    'fill-outline-color': '#11090E'
})

export const MunipsOutlineSymbology = ({
    'line-color': '#343434',
    'line-width': 2
})

export const MunipsLabelSymbology = {
    'layout': {
        'text-field': ['get', 'place'] as Expression,
        'text-font': ['Open Sans Regular'],
        'text-size': 12,
        'text-anchor': 'center'
    } as SymbolLayout,
    'paint': {
      'text-color': '#333',
      'text-halo-color': '#fff',
      'text-halo-width': 2
    }
}

export const DemographicFillSymbology = (demoColumn: string) => ({
    'fill-color': [
        'interpolate',
        ['linear'],
        ['get', demoColumn],
        0, '#FFFFFF',
        1, '#007185'
    ] as Expression,
    'fill-opacity': 0.75,
    'fill-outline-color': '#343434'
})

export const EmployerSymbology = (hoveredFeature: GeoJsonProperties | null = null ) => ({
    'circle-color': '#FFFFFF',
    'circle-opacity': 0.75,
    'circle-stroke-width': [
        'case',
        ['==',
            ['get', 'company'],
            hoveredFeature?.company || ''
        ],
        4,
        2
    ] as Expression,
    'circle-stroke-color': [
        'case',
        ['==',
            ['get', 'company'],
            hoveredFeature?.company || ''
        ],
        "#1f573a",
        "#2C7D53"
      ] as Expression,
    'circle-radius': 7
})

export const busSymbology = ({
    'line-color': '#686868',
    'line-opacity': 0.55,
    'line-width': 2
})

export const railSymbology = ({
    'line-color': ['get', 'LINE'] as Expression,
    'line-opacity': 0.85,
    'line-width': 5
})

export const transitStopSymbology = ({
    'circle-color': '#686868',
    'circle-opacity': 0.4,
    'circle-radius': 4
})
