import {core as loginJS} from "./login.js"
import {core as forgetJS} from "./forget.js"
import {core as contactoJS} from "./contacto.js"


const $ = jQuery;
const curUrl = window.location.href;
var cookiesReady = false;


(function setCurrentCookies($, cUrl) {
    
    // En cada login o redirección se limpian
    localStorage.clear();
    sessionStorage.clear();

    var cookies = {
        ubicacionWebActual: "",
        IP: "",
        country: ""
    };

    function geoLoc(data) {
        cookies.IP = data.IP;
        cookies.country = data.country;

        updateCookies();
    }
    
    function getIPFromAmazon(callback) {
        return $.get("https://www.cloudflare.com/cdn-cgi/trace", res => {
            var arr = res.split('\n');
            
             arr[2] = arr[2].substring(arr[2].indexOf('=') + 1); 
             arr[9] = arr[9].substring(arr[9].indexOf('=') + 1);
    
            callback({country: arr[9], IP: arr[2]});
        });
      }
    
      
    (function getUbicacionWeb() {
      var mapping_Urls = {
            "login": "/index.html",
            "forget": "forget.html",
            "contacto": "contacto.html"
      }   
     
      for(var sectionName in mapping_Urls) {
        if(curUrl.includes(mapping_Urls[sectionName])) {
            cookies.ubicacionWebActual = sectionName;
        }
      }

      getIPFromAmazon(geoLoc);

    })();
    
    function updateCookies() {
        for(var cookieName in cookies) {
            //console.log(cookies);
            if(localStorage.getItem(cookieName) == undefined || localStorage.getItem(cookieName) == "") {
               localStorage.setItem(cookieName, cookies[cookieName]);
            } 
        }

        cookiesReady = true;
    }
    
})($);


$(document).ready(() => {

  var waitingCookies = setInterval(() => {
    
    if(cookiesReady) {
       clearInterval(waitingCookies);

       switch(localStorage.getItem('ubicacionWebActual')) {
        case "login": 
           loginJS();
          break;
        case "forget": 
           forgetJS();
          break;
        case "contacto": 
           contactoJS();
          break;  
         
       }
        
    }
  }, 100);

});

