import { AccordionItemType, HelpWidgetContent, HelpWidgetPanel } from "ui"
export const SUPPORTED_LANGUAGES = ["en", "es"]
export const DEFAULT_LANGUAGE = "en"
const SHARED_TREE_CANOPY_MEASURES_TRANSLATION_KEYS = [
  {
    title: "data:data_glossary.tree_canopy_measures.neighborhood_tree_canopy_goal.title",
    content:
      "data:data_glossary.tree_canopy_measures.neighborhood_tree_canopy_goal.description",
  },
  {
    title: "data:data_glossary.tree_canopy_measures.tree_canopy_gap.title",
    content: "data:data_glossary.tree_canopy_measures.tree_canopy_gap.description",
  }
]

export const NATIONAL_DATA_GLOSSARY_TRANSLATION_KEYS: HelpWidgetPanel = {
  tabSlug: "data-glossary",
  accordionItems: [
    {
      title: "facets:tree_equity_score.name",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "facets:tree_equity_score.name",
          content: "data:data_glossary.tree_equity_score.description",
        },
        {
          title: "data:data_glossary.composite_scores.title",
          content: "data:data_glossary.composite_scores.description",
        },
      ],
    },
    {
      title: "data:data_glossary.tree_canopy_measures.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        ...SHARED_TREE_CANOPY_MEASURES_TRANSLATION_KEYS,
        {
          title: "data:data_glossary.tree_canopy_measures.tree_canopy_cover.title",
          content: "data:data_glossary.tree_canopy_measures.tree_canopy_cover.description",
        },
      ],
    },
    {
      title: "data:data_glossary.places.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:data_glossary.places.census_block_group.title",
          content: "data:data_glossary.places.census_block_group.description",
        },
        {
          title: "data:data_glossary.places.locality.title",
          content: "data:data_glossary.places.locality.description",
        },
        {
          title: "data:data_glossary.places.county.title",
          content: "data:data_glossary.places.county.description",
        },
        {
          title: "data:data_glossary.places.urban_area.title",
          content: "data:data_glossary.places.urban_area.description",
        },
      ],
    },
    {
      title: "data:data_glossary.demographic_measures.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:data_glossary.demographic_measures.children.title",
          content: "data:data_glossary.demographic_measures.children.description",
        },
        {
          title: "data:data_glossary.demographic_measures.dependency_ratio.title",
          content: "data:data_glossary.demographic_measures.dependency_ratio.description",
        },
        {
          title: "data:data_glossary.demographic_measures.linguistic_isolation.title",
          content: "data:data_glossary.demographic_measures.linguistic_isolation.description",
        },
        {
          title: "data:data_glossary.demographic_measures.people_of_color.title",
          content: "data:data_glossary.demographic_measures.people_of_color.description",
        },
        {
          title: "data:data_glossary.demographic_measures.people_in_poverty.title",
          content: "data:data_glossary.demographic_measures.people_in_poverty.description",
        },
        {
          title: "data:data_glossary.demographic_measures.seniors.title",
          content: "data:data_glossary.demographic_measures.seniors.description",
        },
        {
          title: "data:data_glossary.demographic_measures.unemployment_rate.title",
          content: "data:data_glossary.demographic_measures.unemployment_rate.description",
        },
      ],
    },
    {
      title: "data:data_glossary.climate_public_health.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:data_glossary.climate_public_health.health_burden_index.title",
          content: "data:data_glossary.climate_public_health.health_burden_index.description",
        },
        {
          title: "data:data_glossary.climate_public_health.heat_extremity.title",
          content: "data:data_glossary.climate_public_health.heat_extremity.description",
        },
        {
          title: "data:data_glossary.climate_public_health.heat_disparity.title",
          content: "data:data_glossary.climate_public_health.heat_disparity.description",
        },
      ],
    },
    {
      title: "data:data_glossary.tree_canopy_benefits.title",
      type: "accordion",
      content: undefined,
      nestedAccordionContent: [
        {
          title: "data:data_glossary.tree_canopy_benefits.ecosystem_services.title",
          content: "data:data_glossary.tree_canopy_benefits.ecosystem_services.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.annual_ecosystem_service_value.title",
          content:
            "data:data_glossary.tree_canopy_benefits.annual_ecosystem_service_value.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.carbon_sequestration.title",
          content: "data:data_glossary.tree_canopy_benefits.carbon_sequestration.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.nitrogen_dioxide.title",
          content: "data:data_glossary.tree_canopy_benefits.nitrogen_dioxide.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.sulfur_dioxide.title",
          content: "data:data_glossary.tree_canopy_benefits.sulfur_dioxide.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.pm25.title",
          content: "data:data_glossary.tree_canopy_benefits.pm25.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.pm10.title",
          content: "data:data_glossary.tree_canopy_benefits.pm10.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.ozone.title",
          content: "data:data_glossary.tree_canopy_benefits.ozone.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.stormwater_runoff_prevented.title",
          content:
            "data:data_glossary.tree_canopy_benefits.stormwater_runoff_prevented.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.rain_interception.title",
          content: "data:data_glossary.tree_canopy_benefits.rain_interception.description",
        },
        {
          title: "data:data_glossary.tree_canopy_benefits.jobs_supported.title",
          content: "data:data_glossary.tree_canopy_benefits.jobs_supported.description",
        },
      ],
    },
    {
      title: "data:data_glossary.other.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:data_glossary.other.redlining.title",
          content: "data:data_glossary.other.redlining.description",
        },
        {
          title: "data:data_glossary.other.epa.title",
          content: "data:data_glossary.other.epa.description",
        },
        {
          title: "data:data_glossary.other.shade.title",
          content: "data:data_glossary.other.shade.description",
        },
      ],
    }
  ],
}

export const HELP_WIDGET_CONTENT: HelpWidgetContent = {
  panels: [
    {
      tabSlug: "quick-start",
      accordionItems: [
            {
                title: "map:quick_start.navigate_the_map.title",
                type: "list",
                content: "map:quick_start.navigate_the_map.content",
                nestedAccordionContent: []
            },
            {
                title: "map:quick_start.sidebar_data.title",
                type: "accordion",
                content: "map:quick_start.sidebar_data.content",
                nestedAccordionContent: [
                    {
                        title: "map:quick_start.sidebar_data.blockgroups.title",
                        content: "map:quick_start.sidebar_data.blockgroups.content",
                    },
                    {
                        title: "map:quick_start.sidebar_data.blockgroups_rank.title",
                        content: "map:quick_start.sidebar_data.blockgroups_rank.content",
                    },
                    {
                        title: "map:quick_start.sidebar_data.blockgroup_priority.title",
                        content: "map:quick_start.sidebar_data.blockgroup_priority.content",
                    },
                    {
                        title: "map:quick_start.sidebar_data.spider_chart.title",
                        content: "map:quick_start.sidebar_data.spider_chart.content",
                    },
                    {
                        title: "map:quick_start.sidebar_data.tree_canopy_goal.title",
                        content: "map:quick_start.sidebar_data.tree_canopy_goal.content",
                    }
                ]
            },
            {
                title: "map:quick_start.map_layers.title",
                type: "list",
                content: "map:quick_start.map_layers.content",
                nestedAccordionContent: []
            },
            {
                title: "map:quick_start.layers_filters.title",
                type: "list",
                content: "map:quick_start.layers_filters.content",
                nestedAccordionContent: []
            },
            {
                title: "map:quick_start.location_insights.title",
                type: "accordion",
                content: "map:quick_start.location_insights.content",
                nestedAccordionContent: [
                    {
                        title: "map:quick_start.location_insights.access_location_insights.title",
                        content: "map:quick_start.location_insights.access_location_insights.content",
                    },
                    {
                        title: "map:quick_start.location_insights.overview.title",
                        content: "map:quick_start.location_insights.overview.content",
                    },
                    {
                        title: "map:quick_start.location_insights.planning.title",
                        content: "map:quick_start.location_insights.planning.content",
                    },
                    {
                        title: "map:quick_start.location_insights.canopy_benefits.title",
                        content: "map:quick_start.location_insights.canopy_benefits.content",
                    },
                    {
                        title: "map:quick_start.location_insights.planning_tools.title",
                        content: "map:quick_start.location_insights.planning_tools.content",
                    },
                    {
                        title: "map:quick_start.location_insights.bar_charts.title",
                        content: "map:quick_start.location_insights.bar_charts.content",
                    },
                    {
                        title: "map:quick_start.location_insights.block_chart.title",
                        content: "map:quick_start.location_insights.block_chart.content",
                    },
                    {
                        title: "map:quick_start.location_insights.compare_neighborhoods.title",
                        content: "map:quick_start.location_insights.compare_neighborhoods.content",
                    },
                    {
                        title: "map:quick_start.location_insights.share_location.title",
                        content: "map:quick_start.location_insights.share_location.content",
                    }
                ]
            },
            {
                title: "map:quick_start.export_a_map.title",
                type: "list",
                content: "map:quick_start.export_a_map.content",
                nestedAccordionContent: []
            }
        ]
    },
    NATIONAL_DATA_GLOSSARY_TRANSLATION_KEYS
  ],
  tabs: [
    {
      title: "map:quick_start.title",
      slug: "quick-start",
    },
    {
      title: "data:data_glossary.title",
      slug: "data-glossary",
    },
  ],
}

const TES_TREE_CANOPY_MEASURES_TRANSLATION_KEYS:AccordionItemType = {
  title: "data:data_glossary.tree_canopy_measures.title",
  type: "accordion",
  content: "",
  nestedAccordionContent: [
    ...SHARED_TREE_CANOPY_MEASURES_TRANSLATION_KEYS,
    {
      title: "data:data_glossary.tree_canopy_measures.tree_canopy_cover_tesas.title",
      content: "data:data_glossary.tree_canopy_measures.tree_canopy_cover_tesas.description",
    },
  ],
}


export const LOCAL_DATA_GLOSSARY_TRANSLATION_KEYS:HelpWidgetPanel = {
  tabSlug: "data-glossary",
  accordionItems: [
    // This logic is needed because the tree canopy measures are shared between national and local data glossary with different content
    ...NATIONAL_DATA_GLOSSARY_TRANSLATION_KEYS.accordionItems.flatMap((item) => item.title !== "data:data_glossary.tree_canopy_measures.title" ? [item] : [TES_TREE_CANOPY_MEASURES_TRANSLATION_KEYS]),
      {title: "data:data_glossary.tesa.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:data_glossary.tesa.austin.title",
          content: "data:data_glossary.tesa.austin.description",
        },
        {
          title: "data:data_glossary.tesa.boston.title",
          content: "data:data_glossary.tesa.boston.description",
        },
        {
          title: "data:data_glossary.tesa.columbus.title",
          content: "data:data_glossary.tesa.columbus.description",
        },
        {
          title: "data:data_glossary.tesa.dallas.title",
          content: "data:data_glossary.tesa.dallas.description",
        },
        {
          title: "data:data_glossary.tesa.dc.title",
          content: "data:data_glossary.tesa.dc.description",
        },
        {
          title: "data:data_glossary.tesa.detroit.title",
          content: "data:data_glossary.tesa.detroit.description",
        },
        {
          title: "data:data_glossary.tesa.indianapolis.title",
          content: "data:data_glossary.tesa.indianapolis.description",
        },
        {
          title: "data:data_glossary.tesa.lincoln.title",
          content: "data:data_glossary.tesa.lincoln.description",
        },
        {
          title: "data:data_glossary.tesa.maricopa.title",
          content: "data:data_glossary.tesa.maricopa.description",
        },
        {
          title: "data:data_glossary.tesa.rhode_island.title",
          content: "data:data_glossary.tesa.rhode_island.description",
        },
        {
          title: "data:data_glossary.tesa.richmond.title",
          content: "data:data_glossary.tesa.richmond.description",
        },
        {
          title: "data:data_glossary.tesa.toronto.title",
          content: "data:data_glossary.tesa.toronto.description",
        },
        {
          title: "data:data_glossary.tesa.washington.title",
          content: "data:data_glossary.tesa.washington.description",
        }
      ],
    },
  ]
}

export const FAQS_TRANSLATION_KEYS:HelpWidgetPanel = {
  tabSlug: "faqs",
  accordionItems: [
    {
      title: "data:faqs.national.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:faqs.national.changed_score.title",
          content: "data:faqs.national.changed_score.description",
        },
        {
          title: "data:faqs.national.changed_blockgroup.title",
          content: "data:faqs.national.changed_blockgroup.description",
        },
        {
          title: "data:faqs.national.tes_importance.title",
          content: "data:faqs.national.tes_importance.description",
        },
        {
          title: "data:faqs.national.tes_origins.title",
          content: "data:faqs.national.tes_origins.description",
        },
        {
          title: "data:faqs.national.tes_values.title",
          content: "data:faqs.national.tes_values.description",
        },
        {
          title: "data:faqs.national.data_availability.title",
          content: "data:faqs.national.data_availability.description",
        },
        {
          title: "data:faqs.national.data_procedence.title",
          content: "data:faqs.national.data_procedence.description",
        },
        {
          title: "data:faqs.national.canopy_goal.title",
          content: "data:faqs.national.canopy_goal.description",
        },
        {
          title: "data:faqs.national.data_updates.title",
          content: "data:faqs.national.data_updates.description",
        },
        {
          title: "data:faqs.national.plantable_area.title",
          content: "data:faqs.national.plantable_area.description",
        },
        {
          title: "data:faqs.national.gentrification.title",
          content: "data:faqs.national.gentrification.description",
        },
        {
          title: "data:faqs.national.tress_species.title",
          content: "data:faqs.national.tress_species.description",
        },
        {
          title: "data:faqs.national.national_local.title",
          content: "data:faqs.national.national_local.description",
        },
        {
          title: "data:faqs.national.get_tesa.title",
          content: "data:faqs.national.get_tesa.description",
        },
      ],
    },
    {
      title: "data:faqs.local.title",
      type: "accordion",
      content: "",
      nestedAccordionContent: [
        {
          title: "data:faqs.local.tesa_usage.title",
          content: "data:faqs.local.tesa_usage.description",
        },
        {
          title: "data:faqs.local.tailored_tesa.title",
          content: "data:faqs.local.tailored_tesa.description",
        },
        {
          title: "data:faqs.local.planting_limits.title",
          content: "data:faqs.local.planting_limits.description",
        },
        {
          title: "data:faqs.local.layers.title",
          content: "data:faqs.local.layers.description",
        },
        {
          title: "data:faqs.local.data_updates.title",
          content: "data:faqs.local.data_updates.description",
        },
      ],
    }
  ]
}
