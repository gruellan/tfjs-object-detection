import React, { useEffect, useState } from 'react'
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
        <div>
          {predictions.class} = {(predictions.score * 100).toFixed(2) + '%'}
        </div>
      )
    }
    if (!image) {
      return (
        <div>
          <p>Please upload an image</p>
        </div>
      )
    } else {
      return <p>Loading...</p>
    }
  }

  const onChange = imageList => {
    setImage(imageList[0])
    console.log('list ' + imageList[0].dataURL)
    run()
    console.log(imageList[0])
  }

  function renderImage () {
    if (image && image.dataURL != null)
      return (
        <div>
          <img src={image.dataURL} alt='' id='img' />
        </div>
      )
    else return <div></div>
  }

  return (
    <div className='app'>
      <p>yo yo</p>
      <ImageUploading onChange={onChange} acceptType={['jpg', 'gif', 'png']}>
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div>
            <button onClick={onImageUpload}>Upload image</button>&nbsp;
            {renderImage()}
          </div>
        )}
      </ImageUploading>
      {renderResults()}
    </div>
  )
}

export default App
