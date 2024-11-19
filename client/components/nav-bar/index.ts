import { Router } from "@vaadin/router";
import { state } from "../../state";
const logo = require("url:./culti5.png");
const hambur = require("url:./menu-hambur.png");
customElements.define(
  "nav-bar",
  class extends HTMLElement {
    connectedCallback() {
      const currentState = state.getState();

      this.render();
      this.setLogin();

      this.setUserName();
    }

    setUserName() {
      const currentState = state.getState();
      console.log(currentState);

      if (currentState.userEmail) {
        const titleEl = this.querySelector(".title");

        titleEl.innerHTML = currentState.userEmail;
        const titleContainer = this.querySelector(".user-name_container");
        titleContainer.classList.remove("is-hidden");

        const loginButton = this.querySelector(".login_container");
        loginButton.classList.add("is-hidden");
      }
    }

    removeUserName() {
      const titleContainer = this.querySelector(".user-name_container");
      titleContainer.classList.add("is-hidden");

      const loginButton = this.querySelector(".login_container");
      loginButton.classList.remove("is-hidden");
    }

    setLogin() {
      const nav = this.querySelector("#nav");
      const abrir = this.querySelector("#abrir");
      const cerrar = this.querySelector("#cerrar");
      abrir.addEventListener("click", () => {
        nav.classList.add("visible");
      });
      cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
      });

      const home = this.querySelector("#home");
      home.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/");
      });

      const loginButtonEl = this.querySelector("#user-data");
      loginButtonEl.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/edit-me");
      });
      const login = this.querySelector("#login");
      login.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/login");
      });
      const reportt = this.querySelector("#report");
      reportt.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/report");
      });

      const shops = this.querySelector("#user-comercio");
      shops.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/user-comercio");
      });
      const location = this.querySelector("#location");
      location.addEventListener("click", (e) => {
        e.preventDefault();
        Router.go("/location");
      });
    }

    render() {
      const container = document.createElement("div");
      const styles = document.createElement("style");

      container.classList.add("menu");

      styles.innerHTML = `
    
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 10vh;
        background-image: linear-gradient(90deg, #012d07, #015521, #012d07);
       
      }
      
      .logo {
        max-width: 7rem;
        height: auto; 
       
    
      }
      
      .nav-list {
        list-style-type: none;
        display: flex;
        gap: 1rem;
        position: relative; /* Para el pseudo-elemento */
      }
      
      .nav-list::after {
      content: '';
      position: absolute;
      bottom: -20px; /* Altura de la línea */
      left: 0;
      width: 100%;
      height: 2px; /* Grosor de la línea */
      background-color: #b5b5b5; /* Color de la línea */
    }

    .nav-list li a {
      text-decoration: none;
      color: #e5e5e5;
    }
      .nav-list li a:hover {
      border: 1px solid; /* Mantenerlo así */
      border-radius: 7px;
      box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.2);
      outline-color: rgba(144, 238, 144, 0.5);
      outline-offset: 15px;
      text-shadow: 1px 1px 2px #427388;
      background-color: #45a049; /* Cambia este color para el hover */
      color: #ffffff; /* Cambia el color del texto en hover si es necesario */
    }
      
      .abrir-menu,
      .cerrar-menu {
        display: none;
      }
      
      @media screen and (max-width: 800px) {
        .abrir-menu,
        .cerrar-menu {
          display: block;
          border: 0;
          font-size: 1.25rem;
          background-color: transparent;
          cursor: pointer;
        }
      
        .abrir-menu {
          color: #1c1c1c;
        }
      
        .cerrar-menu {
          color: #ececec;
        }
      
        .nav {
          opacity: 0;
          visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: end;
          gap: 1rem;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          background-color: #1c1c1c;
          padding: 2rem;
          box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
        }
      
        .nav.visible {
          opacity: 1;
          visibility: visible;
        }
      
        .nav-list {
          flex-direction: column;
          align-items: end;
        }
      
        .nav-list li a {
          color: #ecececec;
        }
      }    
      }
        `;

      this.innerHTML = `
      
      <header>
                   <img class="logo" id="home" src=${logo} style="object-fit: contain">          
                   <img class="abrir-menu" id="abrir" src=${hambur} width="112" height="88" style="object-fit: contain">          
                   <nav class="nav" id="nav">
                   <button class="cerrar-menu" id="cerrar">X</i></button>
                   
                   <ul class="nav-list">
                     <li><a href="#" id="user-data">Mis datos</a></li>
                     <li><a href="#" id="location">Cerca tuyo</a></li>
                     <li><a href="#" id="user-comercio">mis comercios</a></li>
                     <li><a href="#" id="report">Avisar comercios</a></li>
                     <li><a href="#" id="login">Log in</a></li>
                     <h5 class="title is-5"></h3>
                   </ul>
                 </nav>
      </header>
      
          `;
      this.appendChild(styles);
    }
  }
);
