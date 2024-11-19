customElements.define(
  "custom-footer",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const container = document.createElement("div");
      const styles = document.createElement("style");

      styles.innerHTML = `
          footer {
          position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            background-color: #012d07;
            color: #e5e5e5;
            border-top: 2px solid #b5b5b5;
            text-align: center;
            width: 100%;
            bottom: 0;
          }
  
          .social-links {
            list-style-type: none;
            display: flex;
            gap: 1rem;
            padding: 0;
            margin: 0;
          }
  
          .social-links li a {
            text-decoration: none;
            color: #e5e5e5;
            transition: color 0.3s;
          }
  
          .social-links li a:hover {
            color: #45a049;
          }
  
          .email {
            margin-top: 0.5rem;
          }
        `;

      this.innerHTML = `
          <footer>
            <ul class="social-links">
              <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank">LinkedIn</a></li>
            </ul>
            <div class="email">Email: silsilva.89@gmail.com</div>
          </footer>
        `;

      this.appendChild(styles);
    }
  }
);
