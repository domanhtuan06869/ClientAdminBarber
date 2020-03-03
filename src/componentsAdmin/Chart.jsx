import React, { useEffect, useState } from 'react';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'

export default function Chart(props) {



  const uploadOptions = {
    server: '/',
    signingUrlQueryParams: { uploadType: '' },
  }
  const s3Url = 'https://bbs-final.s3.amazonaws.com'
  useEffect(() => {

  }, [])

  const handleFinishedUpload = info => {
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
  }
  const postImage = () => {

  }
  const MyUploader = () => {

    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
      //   console.log(meta)
      return { url: '/Uploadfile' }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = async (files, allFiles) => {
console.log(allFiles[0].file)

      let formData = new FormData();
      formData.append('file',allFiles[0].file );


      axios.post(
          '/Uploadfile',
          formData,
          {
              headers: {
                  "Content-type": "multipart/form-data",
              },                    
          }
      )
      .then(res => {
          console.log(`Success` + res.data);
      })
      //  console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }

    return (
      <Dropzone
     //  getUploadParams={getUploadParams}
        multiple
        onChangeStatus={handleChangeStatus}

        onSubmit={handleSubmit}
        inputContent={"Hãy chọn file"}
        submitButtonContent="Gửi"
        classNames={{ submitButton: 'btn btn-danger' }}
      //   accept="image/*,audio/*,video/*"
      />
    )
  }


  return (

    <div>


      <MyUploader />
    </div>
  );
}