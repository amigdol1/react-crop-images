// drop-zone docs: https://www.npmjs.com/package/react-dropzone
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import '../styles.css'

// have accepted file types

function ImageDropZone() {
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop ] = useState({aspect: 1/2});

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // update state of image so it displays
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(file)
    })

  }, [])

  const handleSubmit = (file) => {
    // check if the user cropped
    // Email image on submit
    // potentially send to server
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop});

  return (
    <div className="container-dropzone">
        {imgSrc !== null ?
          <div className='preview-image'>
            <ReactCrop src={imgSrc} crop={crop} onChange={newCrop => setCrop(newCrop)}/>
          </div> :
          <div className="drop-zone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag Files Here!</p>
          </div>
        }
    </div>
  )
}

export default ImageDropZone;
