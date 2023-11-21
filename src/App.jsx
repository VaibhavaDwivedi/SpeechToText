import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'
import { useState } from 'react';

function App() {
  const [isCopied, setCopied] = useState(false);

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()
  
  const handleCopy = ()=>{
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    },2000)
    navigator.clipboard.writeText(transcript).then(
    () => {
      console.log("clipboard successfully set:")
      /* clipboard successfully set */
    },
    () => {
      console.log("clipboard write failed")
      /* clipboard write failed */
    },
  )}
  
  if(!browserSupportsSpeechRecognition){
    return <div>Your browser doesn't support this feature</div>
  }
  
  const startStopListening = () => {
    SpeechRecognition.startListening({ continuous: true , language:'en-IN'})
    setCopied(false)
    console.log(isCopied)
  };


  return (
    <>
    <div className='container'>
      <h2>Speech to Text Convertor</h2>
      <br/>
      <p>A React hook that converts speech from the microphone to text and makes it available to your React components</p>
      
      <div className="main-content" >
        message: {transcript}
      </div>
      <div className="btn-style">
      <button onClick={handleCopy}>{isCopied ? "Copied!" : "Copy to Clipboard !"}</button>
      {!listening?<button onClick={startStopListening}>Start Listening</button>:
      <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>}
      <button onClick={resetTranscript}>Reset</button>
      </div>
        <p style={{color:"red", fontSize:"15px"}}>Microphone: {listening ? 'on' : 'off'}</p>
    </div>
    </>
  )
}

export default App
