import React,{useRef,useState,useEffect} from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default (data)=>{
    return (
        <ExcelFile
        filename={'Berber_manager'}
        element={<button className="btn btn-info">Export Excel</button>}>
                       
                    <ExcelSheet  data={data.dataset} name="Leaves">
                            <ExcelColumn label="Name" value="name"/>
                            <ExcelColumn label="Total Leaves" value="total"/>
                            <ExcelColumn label="Remaining Leaves" value="remainig"/>
                    </ExcelSheet>
         </ExcelFile>
    )
}