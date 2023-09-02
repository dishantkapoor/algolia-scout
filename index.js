const algoliasearch = require('algoliasearch');

function AlgoliaScout() {
  this.index_name = '';
  this.is_index_added = 0;

  this.id = '';
  this.is_app_id_added = 0;

  this.secret = '';
  this.is_app_secret_added = 0;

}

AlgoliaScout.prototype.index = function (item) {
  this.index_name = item;
  this.is_index_added = 1;
  return this;
};

AlgoliaScout.prototype.app_id = function (item) {
  this.id = item;
  this.is_app_id_added = 1;
  return this;
};

AlgoliaScout.prototype.app_secret = function (item) {
  this.secret = item;
  this.is_app_secret_added = 1;
  return this;
};

AlgoliaScout.prototype.create = function (data, key = null, value = null) {

  let check_index = this.is_index_added;
  let check_app_id = this.is_app_id_added;
  let check_app_secret = this.is_app_secret_added

  let index_id = this.index_name;
  let index_secret = this.secret
  let index_app_id = this.id
  const client1 = algoliasearch(index_app_id, index_secret);
  const index1 = client1.initIndex(index_id);
  if (value) {
    const query1 = `${key}:${value}`;
    console.log(query1)

    index1
      .search(value)
      .then(({ hits }) => {
        console.log("Hit at Created Time: ", hits, value)
        if (hits.length == 0) {
          return new Promise(function (resolve, reject) {
            // console.log((this.is_index_added == 0), (this.is_app_id_added == 0), (this.is_app_secret_added == 0))
            if (check_index == 0) {
              console.log("Index is required write .index('Your Index name')");
              reject("Index is required write .index('Your Index name')");
            } else if (check_app_id == 0) {
              console.log("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
              reject("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
            } else if (check_app_secret == 0) {
              console.log("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
              reject("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
            } else {
              const client = algoliasearch(index_app_id, index_secret);
              const index = client.initIndex(index_id);
              var response = [];
              if (typeof data === 'object' && Array.isArray(data)) {
                response = data;
              } else if (typeof data === 'object') {
                response.push(data);
              } else {
                console.log('The Object is neither an array nor an object.');
              }
              index.saveObjects(response, {
                autoGenerateObjectIDIfNotExist: true
              }).then(({ objectIDs }) => {
                console.log('\x1b[32m%s\x1b[0m', "Object Created:")
                return resolve(objectIDs)

              }).catch(err => {
                console.log('Error')
                reject("Invalid Arguments")
              });
            }
          })
        } else {
          return new Promise(function (resolve, reject) {
            if (check_index == 0) {
              console.log("Index is required write .index('Your Index name')");
              reject("Index is required write .index('Your Index name')");
            } else if (check_app_id == 0) {
              console.log("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
              reject("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
            } else if (check_app_secret == 0) {
              console.log("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
              reject("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
            } else {
              const client = algoliasearch(index_app_id, index_secret);
              const index = client.initIndex(index_id);
              var response = [];
              let D_OBJ = {};
              if (typeof data === 'object' && Array.isArray(data)) {
                data[0].objectID = hits[0].objectID;
                response = data;
              } else if (typeof data === 'object') {
                for (const [key, value] of Object.entries(data._doc)) {
                  D_OBJ[key] = value;
                }
                D_OBJ.objectID = hits[0].objectID;
                response.push(D_OBJ);
              } else {
                console.log('The Object is neither an array nor an object.');
              }
              console.log(response, hits[0].objectID)
              index.partialUpdateObjects(response).then(({ objectIDs }) => {
                console.log('\x1b[32m%s\x1b[0m', "Object Updated:")
                console.log(objectIDs);
                return resolve(objectIDs)
              }).catch(err => {
                console.log(err)
                reject("Invalid Arguments")
              });
            }
          })
        }
      })
  } else {
    return new Promise(function (resolve, reject) {
      // console.log((this.is_index_added == 0), (this.is_app_id_added == 0), (this.is_app_secret_added == 0))
      if (check_index == 0) {
        console.log("Index is required write .index('Your Index name')");
        reject("Index is required write .index('Your Index name')");
      } else if (check_app_id == 0) {
        console.log("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
        reject("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
      } else if (check_app_secret == 0) {
        console.log("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
        reject("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
      } else {
        const client = algoliasearch(index_app_id, index_secret);
        const index = client.initIndex(index_id);
        var response = [];
        if (typeof data === 'object' && Array.isArray(data)) {
          response = data;
        } else if (typeof data === 'object') {
          response.push(data);
        } else {
          console.log('The Object is neither an array nor an object.');
        }
        index.saveObjects(response, {
          autoGenerateObjectIDIfNotExist: true
        }).then(({ objectIDs }) => {
          console.log('\x1b[32m%s\x1b[0m', "Object Created:")
          return resolve(objectIDs)

        }).catch(err => {
          console.log('Error')
          reject("Invalid Arguments")
        });
      }
    })
  }
};

AlgoliaScout.prototype.find = function (key) {
  return new Promise((resolve, reject) => {
    index.search({
      filters: `key:${key}`,
      hitsPerPage: 1
    }, (error, { hits }) => {
      if (error) {
        reject(error);
      } else {
        if (hits.length > 0) {
          resolve(hits[0]);
        } else {
          reject(new Error('Object not found'));
        }
      }
    });
  });
}

AlgoliaScout.prototype.update = function (s_key, data) {
  let check_index = this.is_index_added;
  let check_app_id = this.is_app_id_added;
  let check_app_secret = this.is_app_secret_added

  let index_id = this.index_name;
  let index_secret = this.secret
  let index_app_id = this.id

  const client = algoliasearch(index_app_id, index_secret);
  const index = client.initIndex(index_id);
  index
    .search(s_key)
    .then(({ hits }) => {
      console.log("Hits", hits)
      if (hits.length > 0) {
        return new Promise(function (resolve, reject) {
          if (check_index == 0) {
            console.log("Index is required write .index('Your Index name')");
            reject("Index is required write .index('Your Index name')");
          } else if (check_app_id == 0) {
            console.log("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
            reject("App ID is required. check algolia panel for APP ID. algolia.app_id('Your App Id')");
          } else if (check_app_secret == 0) {
            console.log("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
            reject("App Secret is required. check algolia panel for APP secret. algolia.app_secret('Your App Secret')");
          } else {
            const client = algoliasearch(index_app_id, index_secret);
            const index = client.initIndex(index_id);
            var response = [];
            let D_OBJ = {};
            if (typeof data === 'object' && Array.isArray(data)) {
              data[0].objectID = hits[0].objectID;
              response = data;
            } else if (typeof data === 'object') {
              for (const [key, value] of Object.entries(data._doc)) {
                D_OBJ[key] = value;
              }
              D_OBJ.objectID = hits[0].objectID;
              response.push(D_OBJ);
            } else {
              console.log('The Object is neither an array nor an object.');
            }

            index.partialUpdateObjects(response).then(({ objectIDs }) => {
              console.log('\x1b[32m%s\x1b[0m', "Object Updated:")
              console.log(objectIDs);
              return resolve(objectIDs)
            }).catch(err => {
              console.log(err)
              reject("Invalid Arguments")
            });
          }
        })
      } else {
        console.log("No Object Found")
      }
    })

};

AlgoliaScout.prototype.delete = function (key, value) {
  let index_id = this.index_name;
  let index_secret = this.secret
  let index_app_id = this.id
  const client = algoliasearch(index_app_id, index_secret);
  const index = client.initIndex(index_id);
  return new Promise((resolve, reject) => {
    const query = `${key}:${value}`;
    console.log(query)


    index
      .search(value)
      .then(({ hits }) => {
        console.log(hits)
        if (hits.length > 0) {
          const objectIDToDelete = hits[0].objectID;
          index.deleteObject(objectIDToDelete).then(() => {
            console.log(`Record with objectID ${objectIDToDelete} deleted.`);
            return resolve(objectIDToDelete)
          });
        } else {
          console.log('No records matched the criteria.');
          return resolve('No records matched the criteria.')
        }
      })
      .catch((err) => {
        console.error(err);
        console.log('Error')
        reject("Invalid Arguments")
      });
  });
}


module.exports = AlgoliaScout;