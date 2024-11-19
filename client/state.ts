import map from "lodash/map";

const API_BASE_URL = "";

const state = {
  data: {
    authtoken: "",
    comercioData: {
      id: "",
      comercio: "",
      rubro: "",
      lat: 0,
      lng: 0,
      condition: "",
      userId: 0,
      zone: "",
      newPicture: false,
    },
    savedLocations: [] as Location[], // Agregar este campo para guardar ubicaciones
  },
  listeners: [],

  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    if (newState.authtoken) {
      localStorage.setItem("authtoken", JSON.stringify(newState.authtoken));
    }
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  async authUser(email) {
    const res = await fetch(" http://localhost:3000/check", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const resJson = await res.json();
    return resJson;
  },
  async signUp(userData) {
    const currentState = this.getState();

    const res = await fetch(" http://localhost:3000/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: currentState.userEmail,
        name: userData.name,
        password: userData.password,
      }),
    });

    const resJson = await res.json();
    return resJson;
  },

  async signIn(password) {
    const currentState = this.getState();

    const res = await fetch(" http://localhost:3000/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: currentState.userEmail,
        password,
      }),
    });

    const resJson = await res.json();

    currentState.authtoken = resJson;

    console.log(currentState.authtoken);

    state.setState(currentState);
    return true;
  },

  async myInfo() {
    const currentState = state.getState();
    const res = await fetch(" http://localhost:3000/me", {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${currentState.authtoken}`,
      },
    });

    const resJson = await res.json();
    return resJson;
  },

  async shopsAround(coordinates) {
    const currentState = this.getState();
    currentState.userLocation = coordinates;

    const res = await fetch(
      `http://localhost:3000/comercio-around?lat=${coordinates.lat}&lng=${coordinates.lng}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${currentState.authtoken.token}`,
        },
      }
    );

    const resJson = await res.json();
    currentState.shopsAround = resJson;
    console.log("PASO TODO OK", currentState.shopsAround.lostComercio);
    state.setState(currentState);
  },
  setposition(data, zone) {
    const coordinates = {
      lat: data[1],
      lng: data[0],
    };

    const currentState = state.getState();
    currentState.coordinates = coordinates;
    currentState.shopsZone = zone;

    if (currentState.shopsData) {
      currentState.shopsData.lat = data[1];
      currentState.shopsData.lng = data[0];
      currentState.shopsData.zone = zone;
    }
    state.setState(currentState);
  },
  //da de alta una nueva mascota
  async createShops(shopsData) {
    console.log(JSON.stringify({ shopsData: shopsData }, null, 2));

    const currentState = this.getState();

    const res = await fetch(" http://localhost:3000/comercio", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${currentState.authtoken.token}`,
      },
      body: JSON.stringify(shopsData),
    });

    const resJson = await res.json();

    return resJson;
  },

  //OBTIENE LOS DATOS DE LA MASCOTAS
  async getMyShops() {
    const currentState = this.getState();
    const res = await fetch(" http://localhost:3000/me/comercio/", {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${currentState.authtoken.token}`,
      },
    });

    const resJson = await res.json();
    console.log(resJson.shops, "resJson de state.pets");
    console.log(resJson.comercio, "resJson de state.comercio");

    this.setState({
      ...currentState,
      shops: resJson.comercio,
    });

    return resJson;
  },

  //obtiene los datos de una mascota y los guarda en el state
  async getShopsData(shopsId) {
    const currentState = this.getState();

    try {
      const res = await fetch("http://localhost:3000/comercio/" + shopsId, {
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${currentState.authtoken.token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error en la red: ${res.statusText}`);
      }

      const resJson = await res.json();
      const shopsData = {
        id: resJson.id,
        name: resJson.name,
        lat: resJson.lat,
        lng: resJson.lng,
        userId: resJson.userId,
        zone: resJson.zone,
      };
      currentState.shopsData = shopsData;
      state.setState(currentState);
    } catch (error) {
      console.error("Error al obtener datos de la mascota:", error);
      alert("No se pudo recuperar la información de la mascota.");
    }
  },

  //EDITA UNA MASCOTA
  async editShops(params) {
    const currentState = this.getState();
    const res = await fetch(
      ` http://localhost:3000/comercio/${currentState.shopsData.id}`,
      {
        method: "put",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${currentState.authtoken.token}`,
        },
        body: JSON.stringify(params),
      }
    );
    const resJson = await res.json();
    return resJson;
  },

  async deleteShops(shopsID: number) {
    const currentState = this.getState();
    const res = await fetch(" http://localhost:3000/comercio/" + shopsID, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${currentState.authtoken.token}`,
      },
    });

    const resJson = await res.json();
    return resJson;
  },

  async editMyInfo(params) {
    const currentState = this.getState();
    const res = await fetch(" http://localhost:3000/me", {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${currentState.authtoken}`,
      },
      body: JSON.stringify(params),
    });
    const resJson = await res.json();
    return resJson;
  },
  // Método para agregar una nueva ubicación guardada
  addSavedLocation(location) {
    const currentState = this.getState();
    currentState.savedLocations.push(location); // Agregar la nueva ubicación
    this.setState(currentState); // Actualizar el estado
  },

  // Método para obtener todas las ubicaciones guardadas
  getSavedLocations() {
    return this.getState().savedLocations; // Devolver las ubicaciones guardadas
  },
};

export { state };
