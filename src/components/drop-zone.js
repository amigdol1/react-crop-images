// drop-zone docs: https://www.npmjs.com/package/react-dropzone

import React from 'react'
import {useDropzone} from 'react-dropzone'

function ImageDropZone() {
  const {getRootProps, getInputProps} = useDropzone()

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Select your image</p>
    </div>
  )
}

export default ImageDropZone;
