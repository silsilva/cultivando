import { state } from "../state";
import { Router } from "@vaadin/router";

customElements.define(
  "edit-page",
  class extends HTMLElement {
    shopsData = state.data.comercioData;

    connectedCallback() {
      const currentState = state.getState();
      console.log(currentState.shopsData.id);
      this.shopsData = currentState.shops;
      this.render();
      this.modifyShops();
      this.deleteShops();

      state.subscribe(() => {
        const currentState = state.getState();
        this.shopsData = currentState.shops;
      });
    }

    modifyShops() {
      const currentState = state.getState();
      const form = this.querySelector(".form");

      form.addEventListener("submit", (e) => {
        const target = e.target as any;
        e.preventDefault();

        let shopsData = this.shopsData;

        if (target.name.value) {
          shopsData = {
            ...shopsData,
            comercio: target.name.value,
          };
        }

        state.editShops(shopsData).then(() => {
          console.log(currentState.shopsData.id);
          Router.go("/user-comercio");
        });
      });
    }

    deleteShops() {
      const form2 = this.querySelector(".borrar");
      const currentState = state.getState();
      form2.addEventListener("click", (e) => {
        e.preventDefault();

        state.deleteShops(parseInt(currentState.shopsData.id));

        alert("Comercio eliminado");
        Router.go("/user-comercio");
      });
    }

    render() {
      const styles = document.createElement("style");
      styles.innerHTML = `
      .container {
        height: 90vh;
        width: 40%;
      }
      .control2 {
         display: flex;
        justify-content: center; /* Centra los botones horizontalmente */
        gap: 10px; /* Espacio entre los botones */
        margin-top: 2em; /* Espacio superior para los botones */
      }
     
      input {
        margin-bottom: 1em;
        width: 100%;
        margin-bottom: 7em;
      border-bottom: 2px solid #45a049;
      color:#45a049;
      }
      @media screen and (max-width: 800px) {
        .container {
          height: 90vh;
          width: 100%;
        }
        
      }
      `;
      this.innerHTML = `
        <nav-bar></nav-bar>
        <div class="wrapper">    
          <div class="container">
            <h2>Editar Comercio</h2>
            <form class="form">           
             
              <div class="control">
                <input class="input" type="text" name="name" placeholder="Comercio"/>
              </div>          

              <div class="control">
                <map-el lat=${this.shopsData.lat} lng=${this.shopsData.lng} zone=${this.shopsData.zone}></map-el>
              </div>

              <div class="control2">
                <button class="guardar" style="background-color: green;">Guardar</button>
                <button class="borrar" style="background-color: red;" >BORRAR</button>    
              </div>      
            
            </form>
          </div>
        </div>
      `;

      this.appendChild(styles);
    }
  }
);
