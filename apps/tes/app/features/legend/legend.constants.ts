// It is used to translate the original values to the values we display in the filters panel.
export const FACET_VALUES_TO_DISPLAY_NAME_DICTIONARY: Record<string, Record<string, Record<string, string>>> = {
  "washington": { 
    "public_ownership_type": {
      "Authority": "AUTHORITY",
      "City": "CITY",
      "County":"CNTY",
      "District": "DIST",
      "Federal": "FED",
      "Joint": "JOINT",
      "Local": "LOC",
      "NGO": "NGO",
      "None": "none",
      "Nonprofit": "NONPROFIT",
      "Private": "PRIV",
      "Regional": "REGIONAL",
      "School": "SCHOOL",
      "State": "ST",
      "University": "UNIV",
      "Unknown": "UNKNOWN",
      "Utility": "UTIL"
    }
  }
}