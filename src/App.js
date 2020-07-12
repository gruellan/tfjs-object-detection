import React, { useEffect, useState } from 'react'
import '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

function App () {
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    run()
  })

  async function run () {
    const img = document.getElementById('img')
    const model = await cocoSsd.load()

    // Classify the image
    const res = await model.detect(img)
    setPredictions({ class: res[0].class, score: res[0].score })
  }

  function renderResults () {
    if (!isNaN(predictions.score)) {
      return (
        <div>
          {(predictions.score * 100).toFixed(2) + '%'}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div className='app'>
      <p>yo yo</p>
      <img id='img' alt='img' src='frank.jpg' />
      {renderResults()}
    </div>
  )
}

export default App
