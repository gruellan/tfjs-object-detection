import React, { useState } from 'react'
import '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import ImageUploading from 'react-images-uploading'

function App () {
  const [predictions, setPredictions] = useState([])
  const [image, setImage] = useState()

  async function run () {
    const img = document.getElementById('img')
    const model = await cocoSsd.load()

    // Classify the image
    if (img != null) {
      const res = await model.detect(img)
      setPredictions({ class: res[0].class, score: res[0].score })
    }
  }

  function renderResults () {
    if (!isNaN(predictions.score)) {
      return (
        <p>
          {predictions.class} = {(predictions.score * 100).toFixed(2) + '%'}
        </p>
      )
    }
    if (!image) {
      return <p>Please upload an image</p>
    } else {
      return <p>Loading...</p>
    }
  }

  const onChange = imageList => {
    setImage(imageList[0])
    run()
  }

  function renderImage () {
    if (image && image.dataURL != null)
      return (
        <div>
          <img src={image.dataURL} alt='' id='img' style={{ maxWidth: 600 }} />
        </div>
      )
    else return <div></div>
  }

  return (
    <div className='app'>
      <h3>Object Detection</h3>
      {renderResults()}
      <ImageUploading onChange={onChange} acceptType={['jpg', 'gif', 'png']}>
        {({ onImageUpload }) => (
          <div>
            <button onClick={onImageUpload}>Upload image</button>&nbsp;
            {renderImage()}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default App
