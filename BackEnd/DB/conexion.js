import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./DB/empleadosRegistro.sqlite"
});

export default sequelize;