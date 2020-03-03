import React,{useRef,useState,useEffect} from 'react'

import axios from 'axios'
import Modal from 'react-modal';
import Swal from "sweetalert2";

import DataTable from 'react-data-table-component';
import DeleteIcon from '@material-ui/icons/Delete';

var data;

function Contact(props){
  const [listContact,setListContact]=useState([])
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      right: true,
    },
    {
      name: 'Number',
      selector: 'number',
      sortable: true,
      right: true,
    },
    {
      name: 'Xóa',
      button: true,
      cell: (list) => <DeleteIcon onClick={()=>deleteItem({id:list._id},'/deleteContact').then(()=>getContact())} className='delete-icon'></DeleteIcon>,
    },
  ];

 useEffect(()=>{
getContact()
props.setColor()
 },[])
async function getContact(){
  setLoading(true)
  const result=await axios('/getContact')
  setListContact(result.data)
  data=result.data
  setLoading(false)
}
async function deleteItem(data,url){
  await axios({
    method: 'delete',
    url: url,
    data: data,

    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => {
    swalErr()
   
  }).catch(() => {
    alert('error')
  })
}
function swalErr(){
  Swal.fire({  
      title: 'Xóa Thành công',  
      type: 'success',  
      icon: 'error'
  }); 
}

function convertArrayOfObjectsToCSV(array) {
let dttr=[{name:'',email:'',number:''}]
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(dttr[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
function downloadCSV(array) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute('href', encodeURI(csv));
  link.setAttribute('download', filename);
  link.click();
}
const Export = ({ onExport }) => (
  <button className='btn btn-info' onClick={e => onExport(e.target.value)}>Export</button>
);
const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);
return(
<div>

    
        <DataTable
        title="Liên hệ"
        columns={columns}
        data={listContact}
        actions={actionsMemo}
        pagination
        progressPending={loading}
      />
</div>
)
}
export default Contact