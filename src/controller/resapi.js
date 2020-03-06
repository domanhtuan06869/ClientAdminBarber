import axios from 'axios'
import { swal, swalErr } from '../controller/swal'
export default async(method,url,data)=>{
  return  await axios({
        method: method,
        url: url,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    }).then(()=>{
        swal();
    }).catch(()=>{
        swalErr()
    })
}