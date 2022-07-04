  let myPromise = new Promise(function(myResolve, myReject) {
    setTimeout(function() { myResolve(); }, 3000);
  });
  
  myPromise.then(function() {
    return Math.random()*10;
  });
  
  