import { Router } from "@vaadin/router";
const cultivo = require("url:./cultivo.jpg");
const cultivos = require("url:./cultivos.jpg");

customElements.define(
  "home-page",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const styles = document.createElement("style");
      styles.innerHTML = `
      .hero__container {
        width: 100vh;
        display: grid;
        align-content: center;
        text-align: center;
        background-image:  url(${cultivo}); /* Cambia esto a la ruta de tu imagen */
        background-size: cover; /* O 'contain', dependiendo de tu diseño */
        background-position: center; /* Centra la imagen */
        background-repeat: no-repeat; /* Evita repetir la imagen */
        }

        .hero__title {
          font-size: 3rem;
        }

        .hero__paragraph {
          margin-bottom: 20px;
        }

        .cta {
          display: inline-block;
          background-color: #20f990;
          justify-self: center;
          color: #fff;
          text-decoration: none;
          padding: 13px 30px;
          border-radius: 32px;
        }

        .about {
          text-align: center;
        }

        .subtitle {
        
          font-size: 2rem;
          margin-bottom: 25px;
        }

        .about__paragraph {
          line-height: 1.7;
        }

        .about__main {
          padding-top: 80px;
          display: grid;
          width: 90%;
          margin: 0 auto;
          gap: 1em;
          overflow: hidden;
          grid-template-columns: repeat(auto-fit, minmax(260px, auto));
        }


        .knowledge {
          background-color: #c7e3ca;
          background-image: radial-gradient(#94f2c5 0.5px, transparent 0.5px),
            radial-gradient(#94f2c5 0.5px, #c7e3ca 0.5px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          overflow: hidden;
         
        }

        .knowledge__container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1em;
          align-items: center;
        }

        .knowledge__picture {
          max-width: 500px;
        }

        .knowledge__paragraph {
          line-height: 1.7;
          margin-bottom: 15px;
        }
         @media (max-width: 800px) {
        .knowledge__container {
          grid-template-columns: 1fr; /* Una columna para el texto y la imagen */
          text-align: center; /* Centrar texto y imagen */
        }

        .knowledge__picture {
          margin-top: 20px; /* Espaciado opcional entre el texto y la imagen */
        }
      }
       

        .price {
          text-align: center;
        }

        
        
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
          padding: 100px 0;
        }
      `;

      this.innerHTML = `
        <nav-bar></nav-bar>

    <div class="container">
      <section class="hero__container container">
        <h1 class="hero__title">Ayudanos a comprar y comer SALUDABLE</h1>
        <p class="hero__paragraph">
          Creemos que una buena alimentación es fundamental para vivir más,
          vivir mejor y vivir más felices, pero también lo es el placer de comer
          cosas ricas..
        </p>
        
      </section>
        <section class="container about">
        <h2 class="subtitle">Ayudanos a AYUDARTE</h2>
        <p class="about__paragraph">
          Estamos en la busqueda de huertas naturales y pequeñas plantaciones
          100% naturales para volver a sentir los sabores primarios.
        </p>

        <div class="about__main">
          <article class="about__icons">
            ✅
            <h3 class="about__title">Te ayudamos</h3>
            <p class="about__paragrah">
              Si estas cansado de comprar frutas y verduras, sin sabor y en mal
              estado, aca te vamos a proporcionar una lista donde todo esto
              queda en el pasado...
            </p>
          </article>

          <article class="about__icons">
            ✅
           
            <h3 class="about__title">Buscamos</h3>
            <p class="about__paragrah">
              Porque estamos convencidos que lo natural es lo mejor, buscamos
              lugares donde lo podemos encontrar...
            </p>
          </article>

          <article class="about__icons">
            ✅
            <h3 class="about__title">Garantizamos</h3>
            <p class="about__paragrah">
              Creamos esta comunidad para ayudarnos entre nosotros y que cada
              miembro recomiende a conciencia cada lugar.
            </p>
          </article>
        </div>
      </section>

      <section class="knowledge">
        <div class="knowledge__container container">
          <div class="knowledege__texts">
            <h2 class="subtitle">Queres saber que lugares podes visitar?</h2>
            <p class="knowledge__paragraph">
              Hemos creado una lista de lugares donde podes ir a comprar,
              productos de primera calidad, recien salidos de la tierra sin
              alteraciones humanas.
            </p>
            <a href="/location" class="cta">Podes ir</a>
          </div>

          <figure class="knowledge__picture">
               <img  src=${cultivo} style="object-fit: contain; width: 100%; height: auto;"> 
          </figure>
        </div>
      </section>

      <section class="price container">
        <h2 class="subtitle">Ahora te toca a vos!</h2>
        <section class="knowledge">
          <div class="knowledge__container container">
            <div class="knowledege__texts">
              <h2 class="subtitle">Conoces algun lugar que podamos visitar?</h2>
              <p class="knowledge__paragraph">
               No importa de donde seas, si conoces algun lugar que tengan plantaciones, huertas y productos naturales y vos ya hayas consumido,  RECOMENDALO, no solo nos ayudas a nosotros, si no tambien ayudas al pequeño productor.
              </p>
              <a href="/report" class="cta">Podes ir</a>
            </div>
  
            <figure class="knowledge__picture">
               <img  src=${cultivos} style="object-fit: contain; width: 100%; height: auto;"> 
            </figure>
          </div>
        </section>
       
      

      <section class="questions container">
        <h2 class="subtitle">Preguntas frecuentes</h2>
        <section class="questions__container" id="questions__container">
          <article class="questions__padding">
            <div class="questions__answer">
              <h3 class="questions__title">
                ¿Tienen local?
                <span class="questions__arrow">
                 🔽
                </span>
              </h3>

              <p class="questions__show">
              No, no tenemos un local, por que no somos comerciantes. simplemente buscamos
              los mejores lugares para comprar verduras y frutas de calidad.
              </p>
            </div>
          </article>

          <article class="questions__padding">
            <div class="questions__answer">
              <h3 class="questions__title">
                ¿Cuales son los criterios que usan para recomendar lugares?
                <span class="questions__arrow">
                  🔽
                </span>
              </h3>

              <p class="questions__show">
                El principal requisito que buscamos es que la materia prima sea de excelente 
                calidad, que la propia persona que lo recomienda ya lo haya probado. Basicamente
                que tanto la verdura o fruta que dice ser sepa a eso... que "el tomate sepa a tomate"
              </p>
            </div>
          </article>

          <article class="questions__padding">
            <div class="questions__answer">
              <h3 class="questions__title">
                ¿Hay alguna restriccion de zonas?
                <span class="questions__arrow">
                  🔽
                </span>
              </h3>

              <p class="questions__show">
                NO, no importa de donde seas, cuanto mas federal sea la info mejor sera nuestra 
                ayuda... tal vez hasta tu propio vecino este buscando esa data y no lo sabes.
              </p>
            </div>
          </article>
        </section>

        
      </section>
      </div>
        <custom-footer></custom-footer>
      `;

      this.appendChild(styles);
    }
  }
);
