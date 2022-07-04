  let myPromise = new Promise(function(myResolve, myReject) {
    setTimeout(()=> { myResolve(Math.random()*10); }, 3000);
  });
  
  myPromise.then(res=> {
      console.log(res);
    
  });


  function checkString(el) {
    return(typeof el == "string");
    
  }

  let setArray = (input) => {
    return new Promise((resolve, reject) => {
        
        if(input.every(checkString)) {
            const upper = input.map(element => {
                return element.toUpperCase();
              })
          resolve(upper);
        }
        reject("Sorry,not all string");
      }
    );
  }
  
  
  let sortTheArray = (result) => {
    return new Promise((resolve, reject) => {
    
          resolve(result.sort());
        }
    );
  }
  arr=["kjk","kjhk",122];
  setArray(arr)
  .then(result      => sortTheArray(result))
  .then(result      => console.log(result))
  .catch(fromReject => console.log(fromReject));
