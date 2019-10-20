import axios from 'axios'
import qs from 'qs'
import { message } from "antd"
import { resolve } from 'dns';

let http = {
    post:"",
    git:""
}

http.post = function(api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject) => {
        axios.post(api,params).then((res) => {
            resolve(res)
        })
    })
}

http.get = function(api,data){
    let params = qs.stringify(data)
    return new Promise((resolve,reject) => {
        axios.get(api,params).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default http