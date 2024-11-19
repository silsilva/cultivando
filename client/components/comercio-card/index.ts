import { Router } from "@vaadin/router";
import { state } from "../../state";
import { log } from "console";

customElements.define(
  "comercio-card",
  class extends HTMLElement {
    constructor() {
      super();
    }
    shopsData = {
      id: "",
      name: "",
      zone: "",
      condition: "",
      userId: "",
      comercio: "",
      lat: "",
      lng: "",
    };

    type: string;
    connectedCallback() {
      this.type = this.getAttribute("type");
      this.shopsData.id = this.getAttribute("id");
      this.shopsData.name = this.getAttribute("name");
      this.shopsData.zone = this.getAttribute("zone");
      this.shopsData.condition = this.getAttribute("condition");
      this.shopsData.userId = this.getAttribute("userId");
      this.shopsData.comercio = this.getAttribute("comercio");
      this.shopsData.lat = this.getAttribute("lat");
      this.shopsData.lng = this.getAttribute("lng");
      this.render();
      this.setReport();
      this.setTypeUser();
    }

    setTypeUser() {
      const cardFooterEl = this.querySelector(".card-footer");
      if (this.type == "user") {
        cardFooterEl.innerHTML = `<a href="#" class="card-footer-item">Editar</a>`;
        const linkEl = this.querySelector(".card-footer-item");

        linkEl.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("COMPONENTS", this.shopsData.id);
          const iid = this.shopsData.id;

          state
            .getShopsData(iid)
            .then(() => {
              Router.go("/edit");
            })
            .catch((error) => {
              // Captura errores
              console.error("Error al getshopsData:", error);
            });
        });
      }
    }
    // <map-el lat=${currentState.userLocation.lat}, lng=${currentState.userLocation.lng}, zone=${currentState.userLocation.zone}></map-el> `;

    setReport() {
      const linkEl = this.querySelector(".card-footer-item");
      let mapVisible = false;

      // Eliminar cualquier event listener existente antes de agregar uno nuevo
      const handleClick = (e) => {
        e.preventDefault();
        const currentState = state.getState();
        currentState.reportShopsId = this.shopsData.id;

        if (!mapVisible) {
          // Solo obtén los datos de la mascota si el mapa no está visible
          state.getShopsData(this.shopsData.id).then(() => {
            const existingMapEl = this.querySelector("map-el");
            if (existingMapEl) {
              existingMapEl.remove();
            }

            const mapEl = document.createElement("map-el");
            mapEl.setAttribute("lat", currentState.userLocation.lat);
            mapEl.setAttribute("lng", currentState.userLocation.lng);
            mapEl.setAttribute("zone", currentState.userLocation.zone);

            // Aplicar estilos al mapa
            mapEl.style.width = "50%";
            mapEl.style.height = "100px";
            mapEl.style.border = "1px solid black";

            this.appendChild(mapEl);

            console.log(
              "comercio:",
              currentState.userLocation.lat,
              currentState.userLocation.lng
            );
          });

          state.setState(currentState);
          mapVisible = true;
        } else {
          const existingMapEl = this.querySelector("map-el");
          if (existingMapEl) {
            existingMapEl.remove();
          }
          mapVisible = false;
        }

        const cardContentEl = this.querySelector(".media-content");
        cardContentEl.addEventListener("click", (e) => {
          e.preventDefault();
        });
      };

      // Añadir el event listener una sola vez
      linkEl.removeEventListener("click", handleClick); // Asegúrate de que no haya duplicados
      linkEl.addEventListener("click", handleClick);
    }

    render() {
      const styles = document.createElement("style");
      styles.innerHTML = `
         .contenedor-shops-card {
      width: 250px; /* Ancho fijo para que sea cuadrado */
      height: 200px; /* Alto fijo para que sea cuadrado */
      border: 2px solid #ccc; /* Un borde alrededor de la tarjeta */
      border-radius: 10px; /* Bordes redondeados */
      display: flex; /* Para centrar el contenido */
      flex-direction: column; /* Para apilar contenido verticalmente */
      justify-content: center; /* Centrar verticalmente */
      align-items: center; /* Centrar horizontalmente */
      background-color: #fff; /* Color de fondo */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para profundidad */
      margin-right: 20px; /* Espaciado derecho para el carrusel */
      scroll-snap-align: start; /* Alineación para el snapping */
    }

    .card-footer {
      margin-top: auto; /* Empuja el footer hacia abajo */
      width: 250px;
      background-color:#45a049;
      text-align: center;
     
    }

    .card-footer-item {
      cursor: pointer; /* Cambia el cursor al pasar por el enlace */
      color: #fff; /* Color del enlace */
      text-decoration: none; /* Subraya el texto */
    }
      .cards__container-home {
  display: flex; /* Para el carrusel */
  overflow-x: auto; /* Habilita el desplazamiento horizontal */
 
  scroll-snap-type: x mandatory; /* Habilita el desplazamiento por "snapping" en eje X */
  gap: 20px; /* Espacio entre tarjetas */
  padding: 20px; /* Espacio alrededor de las tarjetas */
}
      `;

      this.innerHTML = `
        <div class="contenedor-shops-card">
          <p>${this.shopsData.comercio}</p>
          <p>${this.shopsData.name}</p>
          <p>${this.shopsData.zone}</p>
          <div class="card-footer">
            <a class="card-footer-item" id="element">Ver en MAPA</a>
          </div>
        </div>
      `;
      this.appendChild(styles);
    }
  }
);
