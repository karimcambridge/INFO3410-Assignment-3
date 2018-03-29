if (typeof global !== "undefined" && typeof require !== "undefined"){ // to accomodate difference between node and the browser
   // const fs = require('fs');
    const AnimeManager = require('animeManger').AnimeManager;

    function insertTblData(){
        AnimeManager.readFile();
        AnimeManager.writeHTML();
    }
}