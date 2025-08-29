import mapboxgl from "mapbox-gl"

// class created following Mapbox's specification for adding interactive controls for map: https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol
export default class PrintMapControl {
  // properties
  _map?: mapboxgl.Map
  _container!: HTMLDivElement
  _startPDFUpdateProcess: () => void

  // constructor
  constructor(startPDFUpdateProcess: () => void) {
    this._startPDFUpdateProcess = startPDFUpdateProcess
  }

  onAdd(map: mapboxgl.Map) {
    this._map = map
    this._container = document.createElement("div")
    this._container.setAttribute("class", "mapboxgl-ctrl mapboxgl-ctrl-group") // use Mapbox GL JS's default control styling
    const print_button = document.createElement("button")
    print_button.addEventListener("click", () => this._startPDFUpdateProcess())

    const camera_icon = document.createElement("img")
    camera_icon.setAttribute("src", "/icons/camera.svg")
    camera_icon.setAttribute("alt", "Print Map")
    print_button.appendChild(camera_icon)
    this._container.appendChild(print_button)

    return this._container
  }

  onRemove() {
    this._container.parentNode?.removeChild(this._container)
    this._map = undefined
  }
}
