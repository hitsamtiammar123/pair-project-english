'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;
  const bcrypt=require('bcrypt');

  class User extends Model{

    static hash(myPlaintextPassword){
      const saltRounds = 10;

      return bcrypt.hash(myPlaintextPassword, saltRounds);
    }

    static validateInput(body){
      let obj={};
      obj.name=body.name;
      obj.username=body.username;
      obj.email=body.email;
      obj.role='user';

      return obj
      

    }

    static checkHash(email,plainPassword){
      return User.findOne({
        where:{
          email:email
        }
      })
      .then((user)=>{
        let hash=user.password;
        return bcrypt.compare(plainPassword, hash);
      })
      .catch((err)=>Promise.reject(err))
    }

  }

  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('user','role')
  },{sequelize,modelName: 'User'});

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Course,{through:'UserCourse',foreignKey:'userId'})
  };
  return User;
};