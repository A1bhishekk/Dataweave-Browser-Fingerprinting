import React from 'react'
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import './App.css'

const App = () => {
  const [visitorId, setVisitorId] = useState(null);
  const [ram, setRam] = useState(null);
  const [browser, setbrowser] = useState(null);
  const [timezone, settimezone] = useState(null);
  const [screenh, setscreenh] = useState(null);
  const [screenw, setscreenw] = useState(null);
  const [os, setos] = useState(null);
  const [confidence, setconfidence] = useState(null);
  const [fingerprint, setfingerprint] = useState(null);

  useEffect(() => {
    (async () => {
      const agent = await FingerprintJS.load();
      const fingerprint = await agent.get();
      setVisitorId(fingerprint.visitorId);
      setRam(fingerprint.components.deviceMemory.value);
      setbrowser(fingerprint.components.vendorFlavors.value[0]);
      settimezone(fingerprint.components.timezone.value);
      setscreenh(fingerprint.components.screenResolution.value[0]);
      setscreenw(fingerprint.components.screenResolution.value[1]);
      setos(fingerprint.components.platform.value);
      setconfidence(fingerprint.confidence.score);
      setfingerprint(fingerprint);

      console.log(fingerprint);
      console.log(`confidence score: ${fingerprint.confidence.score}`)
    })();
  }, []);
  return (
    <div className='App'>
      <div className='container'>
        <div className='item'>
          <h1 style={{ textAlign: "center",color:"blueviolet" }}>Browser Fingerprinting</h1>
          <h2>Visitor ID:<span> {visitorId}</span></h2>
          <h2>Device Memory:<span> {ram}</span></h2>
          <h2>Browser:<span> {browser}</span></h2>
          <h2>Timezone:<span> {timezone}</span></h2>
          <h2>Screen Height:<span> {screenh}</span></h2>
          <h2>Screen Width:<span> {screenw}</span></h2>
          <h2>OS:<span> {os}</span></h2>
          <h2>Confidence:<span> {confidence}</span></h2>
        </div>

        <pre>
          {JSON.stringify(fingerprint, null, 4)}
        </pre>
      </div>


    </div>
  )
}

export default App