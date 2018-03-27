const copyObj = (obj, keys) => {
    var output = {};
    
    /**
     * Loop through the array of keys to log
     */
    keys.forEach(key => {
      if (typeof key === 'string') {
        /** 
         * If the array item is a string, 
         * add it to the output object
         */
        output[key] = obj[key];
      } else if (typeof key === 'object') {
        /** 
         * If the array item is an object, 
         * Re-run this function for every 
         * key within the object
         */
        for (var childKey in key) {
          output[childKey] = copyObj(obj[childKey], key[childKey]);
        }
      }
    });
    
    return output
  };

  module.exports = copyObj;