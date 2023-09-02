
# Algolia Scout

Push your data directly on Algolia with AlgoliaScout Package. You can directly connect your model with it and it automatically push your data on algolia.


## Installations

Install algolia-scout with npm

```bash
  npm install algolia-scout
```
    
## Documentation

```javascript

//Create initialization inside Mongoose Model

const AlgoliaScout = require('algolia-scout');

const algolia = new AlgoliaScout();

algolia.index('your_index_name');
algolia.app_id('YOUR_APP_ID');
algolia.app_secret('YOUR_APP_SECRET');


// This Middleware called when we use.save() 
// It will create and Update when already Created

Schema.post('save', async function (doc) {
    // in algolia.create(UPDATED_OBJECT, Idetifier_Key, Identifier_Value);
    algolia.create(doc, '_id', doc._id.toString());
})


Schema.post('findOneAndUpdate', async function (doc) {
    // in algolia.create(Mongoose_doc_ID, Updated Object);
    // use findOneAndUpdate method to auto update in algolia use ,{ new: true } as second argument to get updated value
    algolia.update(doc._id.toString(),doc);
})


Schema.pre('findOneAndDelete', async function (next) {
     // in algolia.delete(Identification_Key, Identification_value);
    const docToDelete = await this.model.findOne(this.getQuery());
    algolia.delete('_id', docToDelete._id.toString())
    next();
});
```


## Badges


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Authors

- [@dishantkapoor](https://www.github.com/dishantkapoor)

