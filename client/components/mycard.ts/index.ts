import { state } from "../../state";
import { capitalize } from "lodash";
import { Router } from "@vaadin/router";

customElements.define(
  "my-card",
  class extends HTMLElement {
    shops: any = [];
    async connectedCallback() {
      //Guardo en this.pets mis mascotas reportadas
      const { myShops } = await state.getMyShops();
      this.shops = myShops;
      this.render();
    }
    render() {
      const style = document.createElement("style");
      style.innerHTML = `
      .card-container{
          display:flex;  
          flex-direction:column;     
          justify-content:center;
          align-items:center;
          width:320px;
          border:solid 4px #ECF0F1 ;
          margin-bottom:20px;
          border-radius:15px;
          padding:13px 0;
      }
      .card-image{
          width:60%;
      }
      .card-info{
        text-align:center;
        padding:10px;        
      }
      .card-name{
          font-size:40px;
          font-weight:700;
          color:#ECF0F1;
          margin:0;
      }
      .card-place{
        font-size:24px;
        font-weight:700;
        color:#ECF0F1;
        margin:0 0 5px 0;
      }
      .card-link{
          color:#ECF0F1;
          text-align:center;
          font-weight:700;
          margin:0;
      }

      `;

      this.appendChild(style);

      this.shops.forEach((shops) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card-container">
          
            <div class="card-info">
                <h2 class="card-name">${capitalize(shops.shopsName)}</h2>
                <h3 class="card-place">${capitalize(shops.place)}</h3>       
                <a class="card-link">EDITAR</a> 
            </div>    
        </div>`;

        this.appendChild(div);
      });
    }
  }
);
