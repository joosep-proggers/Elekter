class dataStuff{
     fetchData(){
         fetch('./data.json')
             .then(function(resp) {
                 return resp.json()
             }) // convert data to JSON
             .then(function(data){
                 console.log(data)})
    }
}