import mapboxgl from "mapbox-gl"
import { useEffect } from "react"
import { GetScenario } from "app/scenarios/queries/getScenario"
import {
  MUNICIPALITY_OUTLINE_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  BLOCKGROUP_OUTLINE_LAYER_NAME,
  PARCEL_LAYER_NAME,
  PARCEL_OUTLINE_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
  RIGHT_OF_WAY_OUTLINE_LAYER_NAME,
  MUNICIPALITY_LINE_COLOR,
  MUNICIPALITY_LINE_WIDTH,
  BLOCKGROUP_LINE_COLOR,
  BLOCKGROUP_LINE_WIDTH,
  BLOCKGROUP_HOVER_LINE_WIDTH,
  BLOCKGROUP_FILL_OPACITY,
  PARCEL_LINE_COLOR,
  PARCEL_LINE_WIDTH,
  PARCEL_HOVER_LINE_WIDTH,
  PARCEL_FILL_OPACITY,
  ROW_LINE_COLOR,
  ROW_LINE_WIDTH,
  ROW_HOVER_LINE_WIDTH,
  ROW_FILL_OPACITY,
  SCENARIO_BLOCKGROUP_LINE_COLOR,
  SCENARIO_BLOCKGROUP_LINE_WIDTH,
  SCENARIO_AREA_LINE_COLOR,
  SCENARIO_AREA_LINE_WIDTH,
  ROW_HOVER_LINE_COLOR,
  PARCEL_HOVER_LINE_COLOR,
  SATELLITE_LAYER_LINE_COLOR,
  MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
  PARCEL_OUTLINE_HOVER_LAYER_NAME,
  RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME,
  BLOCKGROUP_HOVER_LINE_COLOR,
  BLOCKGROUP_ZOOM,
  PARCEL_ZOOM,
  SCENARIO_EDITING_AREA_LINE_COLOR,
  SCENARIO_EDITING_AREA_LINE_WIDTH,
  SCENARIO_EDITING_BLOCKGROUP_LINE_WIDTH,
  SCENARIO_EDITING_BLOCKGROUP_LINE_COLOR,
  DATA_LAYERS,
  BLOCKGROUP_SELECTED_LINE_WIDTH,
  BLOCKGROUP_SELECTED_LINE_COLOR,
} from "app/constants"
import { BaseMapStyle, SATELLITE_MAP_STYLE } from "./use_base_map"
import { selectedFeatureAtom } from "app/state"
import { useAtomValue } from "jotai"
import { ScenarioArea, ScenarioBlockgroup } from "types/data"

function getBlockgroupInScenarioLineColor(
  blockgroupsInScenario: string[],
  selectedFeature: mapboxgl.MapboxGeoJSONFeature | null,
): mapboxgl.Expression {
  const expression: mapboxgl.Expression = ["case"]
  if (selectedFeature && selectedFeature.layer.id == "blockgroup") {
    const selectedBlockgroupId: string = selectedFeature.properties!.id
    expression.push(
      ["in", ["get", "id"], ["literal", [selectedBlockgroupId]]],
      SCENARIO_EDITING_BLOCKGROUP_LINE_COLOR,
    )
  }

  expression.push(
    ["in", ["get", "id"], ["literal", blockgroupsInScenario]],
    SCENARIO_BLOCKGROUP_LINE_COLOR,
    ["boolean", ["feature-state", "hover"], false],
    BLOCKGROUP_HOVER_LINE_COLOR,
    BLOCKGROUP_LINE_COLOR,
  )

  return expression
}

function getBlockgroupInScenarioLineWidth(
  blockgroupsInScenario: string[],
  selectedFeature: mapboxgl.MapboxGeoJSONFeature | null,
): mapboxgl.Expression {
  if (selectedFeature && selectedFeature.layer.id == "blockgroup") {
    const selectedBlockgroupId: string = selectedFeature.properties!.id
    return [
      "step",
      ["zoom"],
      [
        "case",
        ["in", ["get", "id"], ["literal", [selectedBlockgroupId]]],
        SCENARIO_EDITING_BLOCKGROUP_LINE_WIDTH,
        ["in", ["get", "id"], ["literal", blockgroupsInScenario]],
        SCENARIO_BLOCKGROUP_LINE_WIDTH,
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_HOVER_LINE_WIDTH,
        0,
      ],
      PARCEL_ZOOM,
      [
        "case",
        ["in", ["get", "id"], ["literal", [selectedBlockgroupId]]],
        SCENARIO_EDITING_BLOCKGROUP_LINE_WIDTH * 2,
        ["in", ["get", "id"], ["literal", blockgroupsInScenario]],
        SCENARIO_BLOCKGROUP_LINE_WIDTH * 2,
        0,
      ],
    ]
  }

  return [
    "step",
    ["zoom"],
    [
      "case",
      ["in", ["get", "id"], ["literal", blockgroupsInScenario]],
      SCENARIO_BLOCKGROUP_LINE_WIDTH,
      ["boolean", ["feature-state", "hover"], false],
      BLOCKGROUP_HOVER_LINE_WIDTH,
      0,
    ],
    PARCEL_ZOOM,
    [
      "case",
      ["in", ["get", "id"], ["literal", blockgroupsInScenario]],
      SCENARIO_BLOCKGROUP_LINE_WIDTH * 2,
      0,
    ],
  ]
}

function getParcelInScenarioLineColor(
  parcelsInScenario: string[],
  selectedFeature: mapboxgl.MapboxGeoJSONFeature | null,
): mapboxgl.Expression {
  const expression: mapboxgl.Expression = ["case"]
  if (selectedFeature && selectedFeature.layer.id == "parcel") {
    const selectedParcelId: string = selectedFeature.properties!.id
    expression.push(
      ["in", ["get", "id"], ["literal", [selectedParcelId]]],
      SCENARIO_EDITING_AREA_LINE_COLOR,
    )
  }

  expression.push(
    ["in", ["get", "id"], ["literal", parcelsInScenario]],
    SCENARIO_AREA_LINE_COLOR,
    ["boolean", ["feature-state", "hover"], false],
    PARCEL_HOVER_LINE_COLOR,
    PARCEL_LINE_COLOR,
  )

  return expression
}

function getParcelInScenarioLineWidth(
  parcelsInScenario: string[],
  selectedFeature: mapboxgl.MapboxGeoJSONFeature | null,
): mapboxgl.Expression {
  const expression: mapboxgl.Expression = ["case"]
  if (selectedFeature && selectedFeature.layer.id == "parcel") {
    const selectedParcelId: string = selectedFeature.properties!.id
    expression.push(
      ["in", ["get", "id"], ["literal", [selectedParcelId]]],
      SCENARIO_EDITING_AREA_LINE_WIDTH,
    )
  }

  expression.push(
    ["in", ["get", "id"], ["literal", parcelsInScenario]],
    SCENARIO_AREA_LINE_WIDTH,
    ["boolean", ["feature-state", "hover"], false],
    PARCEL_HOVER_LINE_WIDTH,
    0,
  )

  return expression
}

function getRowInScenarioLineColor(
  rowsInScenario: string[],
  selectedFeature: mapboxgl.MapboxGeoJSONFeature | null,
): mapboxgl.Expression {
  const expression: mapboxgl.Expression = ["case"]
  if (selectedFeature && selectedFeature.layer.id == "right_of_way") {
    const selectedRowId: string = selectedFeature.properties!.id
    expression.push(
      ["in", ["get", "id"], ["literal", [selectedRowId]]],
      SCENARIO_EDITING_AREA_LINE_COLOR,
    )
  }

  expression.push(
    ["in", ["get", "id"], ["literal", rowsInScenario]],
    SCENARIO_AREA_LINE_COLOR,
    ["boolean", ["feature-state", "hover"], false],
    ROW_HOVER_LINE_COLOR,
    ROW_LINE_COLOR,
  )

  return expression
}

function getRowInScenarioLineWidth(
  rowsInScenario: string[],
  selectedFeature: mapboxgl.MapboxGeoJSONFeature | null,
): mapboxgl.Expression {
  const expression: mapboxgl.Expression = ["case"]
  if (selectedFeature && selectedFeature.layer.id == "right_of_way") {
    const selectedRowId: string = selectedFeature.properties!.id
    expression.push(
      ["in", ["get", "id"], ["literal", [selectedRowId]]],
      SCENARIO_EDITING_AREA_LINE_WIDTH,
    )
  }

  expression.push(
    ["in", ["get", "id"], ["literal", rowsInScenario]],
    SCENARIO_AREA_LINE_WIDTH,
    ["boolean", ["feature-state", "hover"], false],
    ROW_HOVER_LINE_WIDTH,
    0,
  )

  return expression
}

export default function usePaint(params: {
  map: mapboxgl.Map | null
  scenario: GetScenario | undefined
  baseMapStyle: BaseMapStyle
  baseMapStyleIsLoaded: boolean
  layers?: string[]
}) {
  const { map, scenario, baseMapStyle, baseMapStyleIsLoaded, layers } = params
  const checkLayers = layers ? layers : DATA_LAYERS
  const STYLE_RIGHT_OF_WAY = checkLayers.includes(RIGHT_OF_WAY_LAYER_NAME)
  const STYLE_PARCEL = checkLayers.includes(PARCEL_LAYER_NAME)
  const STYLE_BLOCKGROUP = checkLayers.includes(BLOCKGROUP_LAYER_NAME)
  const STYLE_MUNICIPALITY = checkLayers.includes(MUNICIPALITY_LAYER_NAME)
  const selectedFeature = useAtomValue(selectedFeatureAtom)

  useEffect(() => {
    if (!map && !scenario) return
    if (!baseMapStyleIsLoaded) return

    /**
     * Default map styling. Some paint properties may get overwritten below if a scenario is open
     * and we want the scenario to look different.
     */
    if (map) {
      if (baseMapStyle == SATELLITE_MAP_STYLE) {
        if (STYLE_MUNICIPALITY) {
          map.setPaintProperty(
            MUNICIPALITY_OUTLINE_LAYER_NAME,
            "line-color",
            SATELLITE_LAYER_LINE_COLOR,
          )
        }

        if (STYLE_BLOCKGROUP) {
          map.setPaintProperty(
            BLOCKGROUP_OUTLINE_LAYER_NAME,
            "line-color",
            SATELLITE_LAYER_LINE_COLOR,
          )
        }

        if (STYLE_PARCEL) {
          map.setPaintProperty(PARCEL_OUTLINE_LAYER_NAME, "line-color", SATELLITE_LAYER_LINE_COLOR)
        }

        if (STYLE_RIGHT_OF_WAY) {
          map.setPaintProperty(
            RIGHT_OF_WAY_OUTLINE_LAYER_NAME,
            "line-color",
            SATELLITE_LAYER_LINE_COLOR,
          )
        }
      } else {
        if (STYLE_MUNICIPALITY)
          map.setPaintProperty(
            MUNICIPALITY_OUTLINE_LAYER_NAME,
            "line-color",
            MUNICIPALITY_LINE_COLOR,
          )
        if (STYLE_BLOCKGROUP)
          map.setPaintProperty(BLOCKGROUP_OUTLINE_LAYER_NAME, "line-color", BLOCKGROUP_LINE_COLOR)
        if (STYLE_PARCEL)
          map.setPaintProperty(PARCEL_OUTLINE_LAYER_NAME, "line-color", PARCEL_LINE_COLOR)
        if (STYLE_RIGHT_OF_WAY)
          map.setPaintProperty(RIGHT_OF_WAY_OUTLINE_LAYER_NAME, "line-color", ROW_LINE_COLOR)
      }

      /**
       * default styling for municipalities
       */
      if (STYLE_MUNICIPALITY) {
        map.setPaintProperty(MUNICIPALITY_OUTLINE_LAYER_NAME, "line-width", [
          "step",
          ["zoom"],
          // zoom < BLOCKGROUP_ZOOM --> line_width will be 0
          // zoom >= BLOCKGROUP_ZOOM --> line_width is MUNICIPALITY_LINE_WIDTH
          1,
          BLOCKGROUP_ZOOM,
          MUNICIPALITY_LINE_WIDTH,
        ])
        map.setPaintProperty(MUNICIPALITY_LAYER_NAME, "fill-opacity", BLOCKGROUP_FILL_OPACITY)
      }

      // get selected feature id
      let selectedFeatureId = ""
      if (selectedFeature) {
        if (selectedFeature.layer.id === "blockgroup")
          selectedFeatureId = selectedFeature.properties!.id
        else selectedFeatureId = selectedFeature.properties!.id
      }

      /**
       * default styling for blockgroups
       */
      if (STYLE_BLOCKGROUP) {
        map.setPaintProperty(BLOCKGROUP_LAYER_NAME, "fill-opacity", BLOCKGROUP_FILL_OPACITY)
        map.setPaintProperty(BLOCKGROUP_OUTLINE_LAYER_NAME, "line-width", [
          "step",
          ["zoom"],
          BLOCKGROUP_LINE_WIDTH,
          PARCEL_ZOOM,
          BLOCKGROUP_LINE_WIDTH + 1,
        ])
        map.setPaintProperty(BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME, "line-color", [
          "case",
          [
            "in",
            ["get", "id"],
            [
              "literal",
              [
                selectedFeature && selectedFeature.layer.id == "blockgroup"
                  ? selectedFeatureId
                  : "",
              ],
            ],
          ],
          BLOCKGROUP_SELECTED_LINE_COLOR,
          ["boolean", ["feature-state", "hover"], false],
          BLOCKGROUP_HOVER_LINE_COLOR,
          BLOCKGROUP_LINE_COLOR,
        ])
        map.setPaintProperty(BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME, "line-width", [
          "case",
          [
            "in",
            ["get", "id"],
            [
              "literal",
              [
                selectedFeature && selectedFeature.layer.id == "blockgroup"
                  ? selectedFeatureId
                  : "",
              ],
            ],
          ],
          BLOCKGROUP_SELECTED_LINE_WIDTH,
          ["boolean", ["feature-state", "hover"], false],
          BLOCKGROUP_HOVER_LINE_WIDTH,
          0,
        ])
      }

      /**
       * default styling for parcels
       */
      if (STYLE_PARCEL) {
        map.setPaintProperty(PARCEL_LAYER_NAME, "fill-opacity", PARCEL_FILL_OPACITY)
        map.setPaintProperty(PARCEL_OUTLINE_LAYER_NAME, "line-width", PARCEL_LINE_WIDTH)
        map.setPaintProperty(PARCEL_OUTLINE_HOVER_LAYER_NAME, "line-color", PARCEL_HOVER_LINE_COLOR)
        map.setPaintProperty(PARCEL_OUTLINE_HOVER_LAYER_NAME, "line-width", [
          "case",
          [
            "in",
            ["get", "id"],
            [
              "literal",
              [selectedFeature && selectedFeature.layer.id == "parcel" ? selectedFeatureId : ""],
            ],
          ],
          PARCEL_HOVER_LINE_WIDTH,
          ["boolean", ["feature-state", "hover"], false],
          PARCEL_HOVER_LINE_WIDTH,
          0,
        ])
      }

      /**
       * default syling for row
       */

      if (STYLE_RIGHT_OF_WAY) {
        map.setPaintProperty(RIGHT_OF_WAY_LAYER_NAME, "fill-opacity", ROW_FILL_OPACITY)
        map.setPaintProperty(RIGHT_OF_WAY_OUTLINE_LAYER_NAME, "line-width", ROW_LINE_WIDTH)
        map.setPaintProperty(
          RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME,
          "line-color",
          ROW_HOVER_LINE_COLOR,
        )
        map.setPaintProperty(RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME, "line-width", [
          "case",
          [
            "in",
            ["get", "id"],
            [
              "literal",
              [
                selectedFeature && selectedFeature.layer.id == "right_of_way"
                  ? selectedFeatureId
                  : "",
              ],
            ],
          ],
          ROW_HOVER_LINE_WIDTH,
          ["boolean", ["feature-state", "hover"], false],
          ROW_HOVER_LINE_WIDTH,
          0,
        ])
      }
    }

    /**
     * Map styling for scenario
     */
    if (map && scenario) {
      /**
       * Blockgroup styling in scenario.
       */
      const blockgroups = scenario.blockgroups.map((bg: ScenarioBlockgroup) => bg.blockgroupId)

      map.setPaintProperty(BLOCKGROUP_OUTLINE_LAYER_NAME, "line-width", [
        "step",
        ["zoom"],
        BLOCKGROUP_LINE_WIDTH,
        PARCEL_ZOOM,
        BLOCKGROUP_LINE_WIDTH + 1,
      ])
      map.setPaintProperty(
        BLOCKGROUP_OUTLINE_LAYER_NAME,
        "line-color",
        baseMapStyle === SATELLITE_MAP_STYLE ? SATELLITE_LAYER_LINE_COLOR : BLOCKGROUP_LINE_COLOR,
      )

      map.setPaintProperty(
        BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
        "line-width",
        getBlockgroupInScenarioLineWidth(blockgroups, selectedFeature),
      )

      map.setPaintProperty(
        BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME,
        "line-color",
        getBlockgroupInScenarioLineColor(blockgroups, selectedFeature),
      )

      /**
       * Parcel styling in scenario.
       */
      const parcels = scenario.areas
        .filter((a: ScenarioArea) => a.area.type === "PARCEL")
        .map((parcel: ScenarioArea) => parcel.area.id)

      map.setPaintProperty(PARCEL_OUTLINE_LAYER_NAME, "line-width", PARCEL_LINE_WIDTH)
      map.setPaintProperty(
        PARCEL_OUTLINE_LAYER_NAME,
        "line-color",
        baseMapStyle === SATELLITE_MAP_STYLE ? SATELLITE_LAYER_LINE_COLOR : PARCEL_LINE_COLOR,
      )

      // hover layer drawn on top of regular area outlines, used to make sure outline appears to be drawn on top
      // while area selected in scenario or on hover
      map.setPaintProperty(
        PARCEL_OUTLINE_HOVER_LAYER_NAME,
        "line-width",
        getParcelInScenarioLineWidth(parcels, selectedFeature),
      )

      map.setPaintProperty(
        PARCEL_OUTLINE_HOVER_LAYER_NAME,
        "line-color",
        getParcelInScenarioLineColor(parcels, selectedFeature),
      )

      /**
       * ROW styling in scenario.
       */
      const rows = scenario.areas
        .filter((a: ScenarioArea) => a.area.type === "RIGHT_OF_WAY")
        .map((row: ScenarioArea) => row.area.id)

      map.setPaintProperty(
        RIGHT_OF_WAY_OUTLINE_LAYER_NAME,
        "line-color",
        baseMapStyle === SATELLITE_MAP_STYLE ? SATELLITE_LAYER_LINE_COLOR : ROW_LINE_COLOR,
      )
      map.setPaintProperty(RIGHT_OF_WAY_OUTLINE_LAYER_NAME, "line-width", ROW_LINE_WIDTH)

      // hover layer drawn on top of regular area outlines, used to make sure outline appears to be drawn on top
      // while area selected in scenario or on hover
      map.setPaintProperty(
        RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME,
        "line-width",
        getRowInScenarioLineWidth(rows, selectedFeature),
      )
      map.setPaintProperty(
        RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME,
        "line-color",
        getRowInScenarioLineColor(rows, selectedFeature),
      )
    }
  }, [map, scenario, baseMapStyleIsLoaded, selectedFeature])
}
