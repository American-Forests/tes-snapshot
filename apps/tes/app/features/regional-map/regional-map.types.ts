
export interface City {
    /**
     * This is what shows up in URL slugs of each city.
     * So it needs to be URL-safe, no spaces, no quotes, etc.
     * Probably just letters and dashes at the most.
     */
    id: string
    /**
     * This is used in page layouts where we refer to the
     * city. Mostly in marketing pages - we use the shortTitle
     * more often in application pages, when it makes sense
     * to refer to the Richmond TESA rather than the Richmond, VA TESA.
     */
    title: string
    /**
     * Used in cases like {short_title} Tree Equity Report
     */
    shortTitle: string
    /**
     * Used for geocoder proximity preference
     */
    centerpoint: string
    /**
     * String appended to geocoder inputs
     * to make sure that we try to search for this city
     */
    geocoderPostfix: string
    /**
     * Initial view for the map
     */
    initialExtent: [number, number, number, number]
    /**
     * Mapbox tileset ID for the trees layer
     */
    treesTilesetId?: string
    /**
     * background image src for landing page
     */
    landingPageBackground?: string
    /**
     * photo credit for landing page background
     */
    photoCredit?: string
    /**
     * app release date for landing page
     */
    releaseDate?: string
    /**
     * funder name for landing page
     */
    funder?: string
    /**
     * funder link for landing page
     */
    funderLink?: string
    /**
     * list examples of supplementary data for landing page
     */
    supplementaryData?: string
    /**
     * list primary partner for landing page
     */
    PrimaryPartner?: string
    /**
     * list primary partner for landing page
     */
    PrimaryPartnerLink?: string
    /**
     * list all partners for landing page
     */
    partnerList?: string
    /**
     * locale for the TESA location, controls the units, defaults to en-US if not set
     */
    locale?: "en-US" | "en-CA"
    /**
     * list of links to methodology [0] and data glossary [1], if non-US
     */
    methodsLinks?: string[]
  }