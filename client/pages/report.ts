import { state } from "../state";
import Dropzone from "dropzone";
import { Router } from "@vaadin/router";

customElements.define(
  "report-page",
  class extends HTMLElement {
    pictureUrl = "";
    connectedCallback() {
      this.render();
      this.shopsReport();
      this.shopsCancel();
    }
    shopsReport() {
      const form = this.querySelector(".form");

      form.addEventListener("submit", (e) => {
        const currentState = state.getState();
        const target = e.target as any;
        e.preventDefault();
        console.log(target.name.value, "OBSERVANDO");

        const shopsData = {
          comercio: target.name.value,
          lat: currentState.savedLocations[0].coordinates.lat,
          lng: currentState.savedLocations[0].coordinates.lng,
          zone: currentState.savedLocations[0].zone,
          rubro: target.rubro.value,
        };

        state
          .createShops(shopsData)
          .then(() => {
            Router.go("/user-comercio");
          })
          .catch((error) => {
            console.error("Error reportando comercio:", error);
            alert("Ocurrió un error al reportar el comercio.");
          });
      });
    }
    shopsCancel() {
      const buttonEl = this.querySelector(".cancel-button");
      buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/");
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
      input{
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
        <div class="container ">
                <div class="main__container">
                   <h2>AVISAR</h2>
                 <form class="form ">              
                 <input class="input name" placeholder="Nombre" type="text" name="name"/>
                 <br/>
                 <input class="input rubro" placeholder="Rubro" type="text" name="rubro"/>
                                                       
              <div class="control">
              <map-el></map-el>              
              </div>              
            <div class="control2">
            <button class="button ">Avisar</button>        
            <button class="button  cancel-button" type="button">Cancelar</button>
            </div>
              
            </form>
            </div>
           </div>
           </div>
       
                `;

      this.appendChild(styles);
    }
  }
);
