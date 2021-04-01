module.exports = (connection, DataTypes) => {
    const schema = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8,50],
          notEmpty: true,
        },
      },
    };
  
    const ReaderModel = connection.define("Reader", schema);
    return ReaderModel;
  };
  