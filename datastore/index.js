const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {

  counter.getNextUniqueId((err,id) => {
    if(err) {
      console.log('error getting next id');
    } else {
      var name = './test/testData/' + id.toString() + '.txt';
      fs.writeFile(name, text, (err) => {
        if (err) {
          console.log('cannot write file');
        } else {
          callback(null, { id, text })
        }
      })
    }
  })
};

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })

exports.readAll = (callback) => {
  var data = [];
  fs.readdir('./test/testData', (err, files) => {
    files.forEach(file => {
     
      console.log(file);
    


    });
    // _.each(files, (text, id) => {
    //   console.log(id);
    //   console.log(text);
    //   data.push({id, text})
    // })
  });
  // _.each(items, (text, id) => {
  //   data.push({ id, text });
  // });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
