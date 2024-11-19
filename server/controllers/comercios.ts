import { Model, DataTypes } from "sequelize";
import { sequelize } from "../models/db";

export class Comercio extends Model {}
Comercio.init(
  {
    nombre: DataTypes.STRING,
    rubro: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Comercio",
  }
);
