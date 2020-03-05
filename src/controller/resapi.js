import axios from 'axios'

export default async(method,url,data,thendata)=>{
  return  await axios({
        method: method,
        url: url,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    }).then(()=>{
        thendata.swal();
    }).catch(()=>{
        thendata.swalErr()
    })
}