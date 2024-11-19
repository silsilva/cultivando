import { Model, DataTypes } from "sequelize";
import { sequelize } from "./db";

export class Comercio extends Model {
  push(comercio: Comercio) {
    throw new Error("Method not implemented.");
  }
}
Comercio.init(
  {
    comercio: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    zone: DataTypes.STRING,
    rubro: DataTypes.STRING,
  },
  { sequelize, modelName: "comercio" }
);
