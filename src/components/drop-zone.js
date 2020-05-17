// drop-zone docs: https://www.npmjs.com/package/react-dropzone
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import '../styles.css'

// have accepted file types

function ImageDropZone() {
  const [imgSrc, setImgSrc] = useState(null);

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
    <div className="drop-zone" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag Files Here!</p>
      {imgSrc !== null ? <img src={imgSrc} alt='file upload preview' /> : ''}
    </div>
  )
}

export default ImageDropZone;
