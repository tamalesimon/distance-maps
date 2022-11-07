const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. feature will not be available.");
  }

  let db;
  const request = indexedDB.open('mapRoutesDB', 1);

  request.onerror = function(event) {
    console.error('error: '+ event.target.result);
    console.error(event);
  };

  request.onsuccess = function(event) {
    db = request.result;
    console.log('success: '+ db);
  };



  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('mapRoutes', { keyPath: 'id' });
    objectStore.createIndex('id', 'id', { unique: true });
    // objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex("origin_and_destination", ['origin', 'destination'], { unique: false });
  };

  // request.onsuccess = function() {
  //   const db = request.result;
  //   const transaction = db.transaction(['mapRoutes'], 'readwrite');

  //   const objectStore = transaction.objectStore('mapRoutes');
  //   // const idIdx = objectStore.index('id');
  //   // const nameIdx = objectStore.index('name');
  //   const originIdx = objectStore.index('origin');
  //   const destinationIdx = objectStore.index('destination');

  //   objectStore.add({
  //     id: 1,
  //     origin:{name:"Church House, 8H7H+9Q9, Kampala", lat:0.3134947742884475, lng:32.57942771740142},
  //     destination:{name:"Bethany Women's and Family Hospital, 16 Kabalega Close, Kampala", lat:0.303281070519427, lng:32.65126800094927}
  //   });

  //   const allMyRoutesQuery =

  // };
