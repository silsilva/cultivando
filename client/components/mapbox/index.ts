/*-------------------------IMPORTACIONES------------------------------------- */

import * as MapboxClient from "mapbox";
import mapboxgl from "../../../node_modules/mapbox-gl/dist/mapbox-gl.js";
import { state } from "../../state";
/*---------------------- DEFINICION DEL TOKEN Y EL CLIENTE------------------- */
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic2x2IiwiYSI6ImNsaTRteXhxZDAwbTUzbHF1MjNlcDZidHYifQ.irMKtbo9BzdoJ3iSnqEA0w";
export const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

/*----------------------DEFINICION DEL COMPONENTE---------------------------- */
customElements.define(
  "map-el",
  class extends HTMLElement {
    constructor() {
      super();
    }

    /*------------------------PROPIEDADES DEL COMPONENTE------------------------ */
    lat = "";
    lng = "";
    zone = "";
    shadow = this.attachShadow({ mode: "open" });

    /*----------------------CICLO DE VIDA:CONNECTEDCALLBACK------------------- */
    connectedCallback() {
      this.lat = this.getAttribute("lat");
      this.lng = this.getAttribute("lng");
      this.zone = this.getAttribute("zone");
      this.render();
    }

    /*------------------------METODO RENDER----------------------------------- */
    render() {
      const container = document.createElement("div");
      container.classList.add("page__container");

      const headEl = document.createElement("head");
      const style = document.createElement("style");
      style.innerHTML = `
      @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
      *{
        box-sizing:border-box;
      }

      #map {
        width: 100%; 
        height:200px;
      }
      .page__container{
        width: 100%;
        height:100%;
        display:flex;
        flex-direction:column;
        gap:10px;
      }
      `;
      headEl.innerHTML = `
      <link href='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css' rel='stylesheet' />
      `;
      container.innerHTML = `

    <div id="map"></div>
    <form class="search-form" autocomplete="off">
      <div class="field is-grouped">
        <div class="control is-expanded">
          <input class="input" type="search" name="q">

        </div>
        <div class="control">

          <button class="button is-info">Buscar</button>
        </div>
    </div>
  </form>

      `;

      /*---------------------------MAPA Y FOMULARIO-------------------------------------- */
      this.shadow.appendChild(style);
      this.shadow.appendChild(headEl);
      this.shadow.appendChild(container);
      const map = this.shadow.getElementById("map");
      const form = this.shadow.querySelector(".search-form");
      const mapBox = this.initMap(map);

      /*-------------------------METODOS DEL COMPONENTE-------------------------------- */
      this.setDefaultLocation(mapBox);
      this.initSearchForm(form, mapBox);
      // Agregar esta línea para cargar las ubicaciones guardadas al iniciar el mapa
      this.addSavedLocations(mapBox);
    }

    setDefaultLocation(map) {
      if (this.lat && this.lng) {
        const marker = new mapboxgl.Marker()
          .setLngLat({ lat: this.lat, lng: this.lng })
          .addTo(map);
        map.setCenter({ lat: this.lat, lng: this.lng });
        map.setZoom(18);
      }
      if (this.zone) {
        const inputEl = this.shadow.querySelector(".input");
        inputEl.setAttribute("placeholder", this.zone);
      }
    }

    initMap(map) {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      return new mapboxgl.Map({
        container: map,
        style: "mapbox://styles/mapbox/streets-v11",
      });
    }

    initSearchForm(form, map) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        mapboxClient.geocodeForward(
          e.target.q.value,
          {
            country: "ar",
            autocomplete: true,
            language: "es",
          },
          function (err, data, res) {
            if (!err) {
              const firstResult = data.features[0];
              const coordinates = firstResult.geometry.coordinates;
              const zone = firstResult.text;
              // Crear el popup con la descripción
              const popup = new mapboxgl.Popup()
                .setHTML(`<h3>${zone}</h3>`) // Aquí se puede agregar más información
                .setMaxWidth("300px");

              const marker = new mapboxgl.Marker()
                .setLngLat(coordinates)
                .setPopup(popup) // Vincula el popup al marcador
                .addTo(map);
              map.setCenter(coordinates);
              map.setZoom(18);
              //state.setposition(coordinates, zone);
              state.addSavedLocation({
                coordinates: { lat: coordinates[1], lng: coordinates[0] },
                zone,
              });
            }
          }
        );
      });
    }
    // En la función addSavedLocations
    addSavedLocations(map) {
      const savedLocations = state.getSavedLocations(); // Obtiene las ubicaciones guardadas
      savedLocations.forEach((location) => {
        // Crear el popup con la descripción
        const popup = new mapboxgl.Popup()
          .setHTML(`<h3>${location.zone}</h3>`) // Aquí se puede agregar más información
          .setMaxWidth("300px");
        const marker = new mapboxgl.Marker()
          .setLngLat(location.coordinates) // Usa las coordenadas de la ubicación
          .setPopup(popup) // Vincula el popup al marcador
          .addTo(map);
      });
    }
  }
);
