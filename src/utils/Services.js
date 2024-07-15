import axios from "axios";
import { API_URI } from "./Constants";



const buildDataRequest = (inpobj) =>{
    var reqData = '';
    for (var prop in inpobj) {
        reqData = reqData + '&' + prop + "=" + inpobj[prop];
    }
    return reqData.slice(1);
}

export const callservice = (method,inpobj,svcname) => {
    if(method == 'post'){
        return new Promise((resolve,reject)=>{
            let fullURL = API_URI + svcname;
            /*
            let reqData = buildDataRequest(inpobj);
            var xhttp =  new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState==4){
                    if(this.status == 200){
                        resolve(JSON.parse(xhttp.responseText))
                    }else{
                        reject(xhttp.statusText);
                    }
                }
            }
            xhttp.open('POST',fullURL,true)
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(reqData)
            */

            /*
                1. XMLHTTPRequest - AJAX(Jquery - JS library) - inbuilt
                2. fetch API - inbuilt - es6(2015)
                3. axios - library(package)
            */
           
            axios.post(fullURL,inpobj,{
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((response)=>{
                //console.log('axiosRes',response)
                resolve(response.data)
            }).catch((err)=>{
                reject(err)
            })
        })
    }else{
        new Promise((resolve,reject)=>{

        })
    }
}