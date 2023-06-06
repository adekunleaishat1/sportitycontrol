import React,{useEffect, useState,useRef} from 'react'
import { FaPause, FaPhoneVolume, FaPlay, FaVolumeDown } from 'react-icons/fa'
import { MdSkipNext, MdSkipPrevious} from 'react-icons/md'
import Myicon from './Myicon';

const Controls = () => {
  const [audioData, setAudioData] = useState('');
  const [setdata, setsetdata] = useState(null)
  const [Playing, setPlaying] = useState(false);
  const audioRef = useRef(null);



  useEffect(() => {
    fetch('http://localhost:2345/music', {
      // method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setsetdata(data)
        const audioUrl = setdata[0].url;
        console.log(audioUrl);
        setAudioData(audioUrl);
        audioRef.current.src = audioData
      })
      .catch((error) => {
        console.error('Error fetching audio data:', error);
      });
  }, []);


  const play = () =>{
    if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }
  return (
    <>
      <div className='w-100 con'>
        <audio ref={audioRef}   />
        <div className='incon '>
        <div className='w-50 mx-auto dd'>
            <div className='d-flex justify-content-between align-items-center mx-auto dc'>
                <button className='btn-lg fs-1 pr'><MdSkipPrevious/></button>
                <button onClick={play} className='btn btn-dark pau'>{Playing ? <FaPause /> : <FaPlay />}</button>
                <button className='btn-lg fs-1 pr'><MdSkipNext/></button>
            </div>
        </div>
        <div className=' mx-auto ra'>
          <div className=' w-100 d-flex justify-content-center align-items-center mx-auto ran'>
              <span className=' sp '>0:00</span>
              <input  type="range"  min="1" max="100" value="99" onchange="seekto()" />
              <span className='sp'>0:00</span>
          </div>
        </div>
        </div>
        <div className='volum'>
          <Myicon myclass="volume" icon={<FaVolumeDown/>}/>
         <input  type="range" min="1" max="100" value="99" onchange="setvolume()"/>
        </div>
      </div>
    </>
  )
}

export default Controls