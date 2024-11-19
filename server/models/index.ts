import { User } from "./users";
import { Comercio } from "./comercio";

User.hasMany(Comercio);
Comercio.belongsTo(User);

export { User, Comercio };
