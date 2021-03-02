export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to db 'shop-shop'
    const request = window.indexedDB.open('shop-shop', 1); 

    // variables to hold reference to the db, transaction, and object store
    let db, tx, store; 

    // if version has changed (or first time using the db), run this method and create the three object stores
    request.onupgradeneeded = function(e) {
      const db = request.result; 
      // create object store for each type of data and 'primary' key index to be the '_id' of the data
      db.createObjectStore('products', { keyPath: '_id' }); 
      db.createObjectStore('categories', { keyPath: '_id' }); 
      db.createObjectStore('cart', { keyPath: '_id' }); 
    }; 

    request.onerror = function(e) {
      console.log("There was an error"); 
    }

    // on db open success 
    request.onsuccess = function(e) {
      // save reference of the db to the 'db' variable 
      db = request.result; 

      // open a transaction do whatever we pass into 'storeName' (must match on of the object store names)
      tx = db.transaction(storeName, 'readwrite'); //object store we want to interact with and permissions we want in this transaction

      // save a reference to that object store 
      store = tx.objectStore(storeName); 

      db.onerror = function(e) {
        console.log('error', e); 
      }

      // check which value we passed into the function as a method and perform that method on the object store
      switch (method) {
        case 'put': 
        store.put(object); 
        resolve(object); 
        break;
        
        case 'get': 
        const all = store.getAll(); 
        all.onsuccess = function() {
          resolve(all.result); 
        }
        break; 

        case 'delete': 
        store.delete(object._id); 
        break; 

        default: 
        console.log('No valid method'); 
        break; 
      }
      
      // when the transaction is complete, close connection 
      tx.oncomplete = function() {
        db.close(); 
      }
    }
  })
}
