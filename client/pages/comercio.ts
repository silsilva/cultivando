import { state } from "../state";

customElements.define(
  "comercio-page",
  class extends HTMLElement {
    connectedCallback() {
      state.getMyShops();
      this.render();
      state.subscribe(() => {
        this.getUserPets();
      });
    }
    //obtiene las mascotas reportadas del usuario
    getUserPets() {
      const currentState = state.getState();
      const containerEl = this.querySelector(".cards__container");
      const userShops = currentState.shops;
      console.log(userShops, "revisar");
      // Limpiar el contenedor antes de añadir nuevas mascotas
      containerEl.innerHTML = "";

      if (userShops.length > 0) {
        for (const shops of userShops) {
          const cardEl = document.createElement("comercio-card");
          cardEl.setAttribute("type", "user");
          cardEl.setAttribute("id", shops.id);
          cardEl.setAttribute("name", shops.rubro);
          cardEl.setAttribute("zone", shops.zone);
          cardEl.setAttribute("comercio", shops.comercio);
          cardEl.setAttribute("userId", shops.id);
          containerEl.appendChild(cardEl);
        }
      }
    }

    render() {
      const containerEl = document.createElement("div");
      const styles = document.createElement("style");

      styles.innerHTML = `
      .main__container {
          max-width: 1200px; /* Establece un ancho máximo */
          margin: 0 auto; /* Centra el contenedor automáticamente */
          padding: 20px; /* Espacio interno */
        }
      .cards__container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        }
        @media (max-width: 800px) {
          .cards__container {
            grid-template-columns: 1fr; /* 1 columna en pantallas muy pequeñas */
            justify-items: center;
        }
      }
        `;
      this.innerHTML = `
        <nav-bar ></nav-bar>  
      <div class="main__container">
        <h2>Mis comercios reportadas</h2>
          <div class="cards__container ">
          </div>
       </div>    
          `;
      this.appendChild(styles);
    }
  }
);
