import { Router } from "@vaadin/router";
import { state } from "../state";

customElements.define(
  "location-page",
  class extends HTMLElement {
    showShops = true;

    connectedCallback() {
      this.render();

      this.userLocation();
      state.subscribe(() => {
        const currentState = state.getState();
        console.log(currentState.shopsAround.lostComercio);
        if (currentState.shopsAround.lostComercio) {
          if (this.showShops) {
            this.nearbyShops();
          }
        }
      });
    }

    userLocation() {
      const buttonEl = this.querySelector(".button");
      if (buttonEl) {
        buttonEl.addEventListener("click", (e) => {
          e.preventDefault();
          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };

          function success(pos) {
            var crd = pos.coords;

            const coordinates = {
              lat: crd.latitude,
              lng: crd.longitude,
            };

            state.shopsAround(coordinates);
          }

          function error(err) {
            console.warn("ERROR(" + err.code + "): " + err.message);
          }

          navigator.geolocation.getCurrentPosition(success, error, options);
        });
      } else {
        console.error("El botón no está disponible en el DOM.");
      }
    }
    nearbyShops() {
      const currentState = state.getState();
      const containerEl = this.querySelector(".cards__container-home");

      if (!containerEl) {
        console.error("El contenedor de tarjetas no se encontró.");
        return; // Sal del método si el contenedor no está disponible
      }

      // Continúa con el resto de tu lógica
      const shopsAround = currentState.shopsAround.lostComercio;
      const getUbicationContainer = this.querySelector(".button");
      getUbicationContainer.classList.add("is-hidden");

      if (shopsAround.length > 0) {
        for (const shops of shopsAround) {
          const cardShops = document.createElement("comercio-card");
          cardShops.setAttribute("id", shops.id);
          cardShops.setAttribute("name", shops.rubro);
          cardShops.setAttribute("comercio", shops.comercio);
          cardShops.setAttribute("zone", shops.zone);
          cardShops.setAttribute("userId", shops.id);
          containerEl.appendChild(cardShops);
        }
      } else {
        const homeP = document.createElement("h3");
        homeP.innerText = "No hay comercios reportados cerca tuyo";
        containerEl.appendChild(homeP);
      }
      this.showShops = false;
    }

    render() {
      const styles = document.createElement("style");

      styles.innerHTML = `
        .is-hidden {
          display: none;
        }
        .ubication-check__container {
          display: flex; 
          flex-direction: column;
          justify-content: center; 
          align-items: center; 
          margin: 20px 0; 
        }
   
      `;

      this.innerHTML = `
        <nav-bar></nav-bar>    
        <div class="report">
          <report-card class="is-hidden"></report-card>
        </div>
        <div class="title">
          <h2>Comercios cerca tuyo</h2>
        </div>
        <div class="ubication-check__container">
          <p>Para ver los comercios reportados cerca tuyo necesitamos permiso para conocer tu ubicación.</p>
          <button class="button" id="button"> Dar mi ubicación </button>
        </div> 
        
        <div class="cards__container-home"></div>
        
        <custom-footer></custom-footer>
      `;
      this.appendChild(styles);
      this.userLocation(); // Llamar aquí para asegurar que se agregue el evento
    }
  }
);
