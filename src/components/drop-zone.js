// drop-zone docs: https://www.npmjs.com/package/react-dropzone
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import '../styles.css'
import {image64toCanvasRef} from '../ReusableUtils'

// have accepted file types

function ImageDropZone() {
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop ] = useState({aspect: 1/2});
  const imagePreviewCanvasRef = React.createRef();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => alert('There was an error loading your image. Please refresh the browser and try again.')
      reader.onload = () => {
        // update state of image so it displays
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(file)
    })

  }, [])

  const handleImageLoaded = (image) => {
    console.log(image)
  }

  const handleOnCropChange = (newCrop) => {
     setCrop(newCrop);
  }

  const handleOnCropComplete = (crop, pixelCrop) => {
    console.log(crop, pixelCrop);
    // this might need to go outside of this function. Tutorial had it in the constructor
    const canvasRef = imagePreviewCanvasRef.current
    const imgSrc = this.state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  }

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
            <ReactCrop
              src={imgSrc}
              crop={crop}
              onChange={handleOnCropChange}
            />
            <br></br>
            <p>Preview Crop</p>
            <canvas ref={imagePreviewCanvasRef}></canvas>
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
