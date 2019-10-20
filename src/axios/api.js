import axios from 'axios'

export function _login(data){
    return axios.post('/ubc/siemens/console/registered/login',data)
}

export function _axiosAll(){
    // 添加一个响应拦截器
    window.$axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        message.error('系统异常')
        return Promise.reject(error);
    });
    window.$axios({
        method:"POST",
        url:"/ubc/siemens/console/registered/login",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then((res)=>{
        if(res.data.msg === ""){
            return res
        }else{
          message.error(res.data.msg)
        }
    })
}