import { Comercio, User } from "../models";
import { indexComercio } from "../lib/algolia";

type ComercioData = {
  comercio: string;

  lat: number;
  lng: number;
  zone: string;
  rubro: string;
};

export async function reportComercio(userId: number, params: ComercioData) {
  const user = await User.findByPk(userId);
  if (user) {
    const newPet = await Comercio.create({
      ...params,
      userId: user.get("id"),
    });

    const algoliaRes = await indexComercio.saveObject({
      objectID: newPet.get("id"),
      _geoloc: {
        lat: newPet.get("lat"),
        lng: newPet.get("lng"),
      },
    });
    return { newPet, algoliaRes };
  } else {
    throw "usuario no encontrado";
  }
}

function bodyToIndex(body, id?) {
  const respuesta: any = {};
  if (body.lat && body.lng) {
    respuesta._geoloc = {
      lat: body.lat,
      lng: body.lng,
    };
  }
  if (id) {
    respuesta.objectID = id;
  }
  return respuesta;
}

export async function modifyComercio(params, comercioId: number) {
  if (!params) {
    throw "faltan datos de la mascota ";
  }

  const comercioData = { ...params };

  const modifyComercio = await Comercio.update(comercioData, {
    where: {
      id: comercioId,
    },
  });

  const indexItem = bodyToIndex(comercioData, comercioId);
  indexComercio.partialUpdateObject(indexItem);

  return modifyComercio;
}

export async function getComercio(comercioId: number) {
  const comercio = await Comercio.findByPk(comercioId);
  if (comercio) {
    return comercio;
  } else {
    throw "comercio not found";
  }
}

export async function deleteComercio(comercioId: number) {
  const comercio = await Comercio.destroy({
    where: {
      id: comercioId,
    },
  });
  return comercio;
}

export async function getUserComercio(userId: number) {
  const comercio = await Comercio.findAll({
    where: {
      userId,
    },
  });
  return comercio;
}

export async function searchComercioAround(lat, lng) {
  const { hits } = await indexComercio.search("", {
    aroundLatLng: [lat, lng].join(","),
    aroundRadius: 500000,
  });

  const comercios = [];
  for (const hit of hits) {
    const comercio = await Comercio.findByPk(hit.objectID);
    if (comercio) {
      comercios.push(comercio);
    }
  }
  return comercios;
}
