  let myPromise = new Promise(function(myResolve, myReject) {
    setTimeout(function() { myResolve(); }, 3000);
  });
  
  myPromise.then(function() {
    return Math.random()*10;
  });
   function setUpper(array){
    const upper = arr.map(element => {
        return element.toUpperCase();
      })
      return upper;
   }
  
  function myFunction(array) {
      
    return Promise.resolve(setUpper(array));
  }
  myFunction.then(
    function(value){return value.sort();}
  );