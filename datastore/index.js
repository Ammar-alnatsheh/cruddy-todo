const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('error getting next id');
    } else {
      var name = './test/testData/' + id.toString() + '.txt';
      fs.writeFile(name, text, (err) => {
        if (err) {
          console.log('cannot write file');
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  var data = [];
  fs.readdir('./test/testData', (err, files) => {
    _.each(files, file => {
      var id = file.split('.')[0];
      data.push({id, text: id});  
    });
    callback(null, data);
  });
};

exports.readOne = (id, callback) => {
  fs.readFile('./test/testData/' + id + '.txt', 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id, text});
    }
  });
};

exports.update = (id, text, callback) => {
  var name = './test/testData/' + id.toString() + '.txt';
  if (fs.existsSync(name)) {
    fs.writeFile(name, text, (err) => {
      if (err) {
        console.log('cannot update file');
      } else {
        callback(null, { id, text });
      }
    });

  } else {
    callback(new Error(`No item with id: ${id}`));
  }

};

exports.delete = (id, callback) => {
  var name = './test/testData/' + id.toString() + '.txt';
  if (fs.existsSync(name)) {
    fs.unlink(name, (err) => {
      if (err) {
        callback(new Error(`Unable to delete item with id: ${id}`));
      } else {
        callback(`Successfully deleted item with id: ${id}`);
      }
    });
  } else {
    callback(new Error(`No item with id: ${id}`));
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
