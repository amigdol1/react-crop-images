// drop-zone docs: https://www.npmjs.com/package/react-dropzone
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import '../styles.css'

function ImageDropZone() {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="drop-zone" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag Files Here!</p>
    </div>
  )
}

export default ImageDropZone;
