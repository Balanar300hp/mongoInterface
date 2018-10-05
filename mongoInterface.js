const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class MongoInterface{

  constructor(){
    this.materialsScheme = new Schema({
      name: {
        type: String,
        required: true,
        minlength:5,
        index: true,
        unique: true,
        dropDups: true
      },
      "Полезные материалы":{
        type: Array,
        required: true,
        "default" : []
      },
      "Книги":{
        type: Array,
        required: true,
        "default": []
      }
    });
  }

//Connecting Promise
  async connectToDb(){
    await mongoose.connect("mongodb://localhost:27017/test",{ useNewUrlParser: true , autoIndes : false});
  }

//Disconnecting Promise
  async disconnectFromDb(){
    await mongoose.disconnect();
  }

//Add obj to collection by sheme
  async addToDb(collectionName, objScheme, objInfo){
    const objArr = mongoose.model(collectionName,objScheme);
    const obj = new objArr(objInfo);
    return await obj.save((err)=>{
      if(err) return console.log(err);;
    });
  }

//Print object from collection by key
  async printFromDb(collectionName,objScheme,objName,field){
    const objArr=mongoose.model(collectionName,objScheme);
    return await objArr.findOne({[field]:objName},(err,res)=>{
      if (err) console.log(err);
      return res;
    });
  }

//Get materialsScheme
  getMaterials(){
    return this.materialsScheme;
  }

//Update field
  async updateFieldInDb(collectionName, objScheme, comparator, content){
    const modelDB=mongoose.model(collectionName,objScheme);
    return await modelDB.update(comparator,content);
  }

//Remove object from collection
  async removeFromDb(collectionName,objScheme,comparator){
    const modelDB=mongoose.model(collectionName,objScheme);
    return await modelDB.deleteOne(comparator);
  }
};

  const mongooseClient = new MongoInterface();
  module.exports = mongooseClient;
