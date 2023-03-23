module.exports = (Sequelize, DataTypes) => {
    const alias = "Producto";
    const column = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
          },
          id_marca: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
          },
          nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          precio: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          cantidad_descuento: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          img: {
            type: DataTypes.STRING(255),
            allowNull: false
          },
          descripcion: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
          },
          id_categoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
          }
    };

    const config = {
        tableName: 'producto',
        timestamps: false
    };
    
    const Producto = Sequelize.define(alias, column, config);

    // hacer relaciones aca //

    Producto.associate = (models) =>{
      //relacion de mucho a mucho
      Producto.belongsToMany(models.Factura, {
          //nombre de la relacion
          as: "facturas",
          //nombre de la tabla pibot
          through: "Producto_factura",
          //nombre de la columna que hace referencia a la tabla actual
          foreignKey: "id_product",
          //nombre de la columna que hace referencia a la tabla 
          otherKey: "id_factura",
          timestamps: false
      });
      
      //relacion de producto y marca
      Producto.belongsTo(models.Marca, {
        as: "marcas",
        foreignKey: "id_marca"
      });

      //categorias
      Producto.belongsTo(models.Categoria, {
        as: "categorias",
        foreignKey: "id_categoria"
      });
  }

    // Marca.hasMany(Producto, { foreignKey: 'id_marca' });
    // Producto.belongsTo(Marca, { foreignKey: 'id_marca' });

    // Categoria.hasMany(Producto, { foreignKey: 'id_categoria' });
    // Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });

    return Producto

}

