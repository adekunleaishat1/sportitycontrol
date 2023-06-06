import { useState, useRef } from 'react'
import React  from 'react'
import { FaArrowRight, FaPlus, FaSearch } from 'react-icons/fa'
import {ImHome3} from 'react-icons/im'
import {VscFolderLibrary} from 'react-icons/vsc'
import Controls from './Controls'


const Sidenav = () => {
   const [audioFile, setAudioFile] = useState(null);
   const audioRef = useRef(null);

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      setAudioFile(file);
      console.log(file);
    };

    const Save = () => {
      console.log(audioFile);
      if (audioFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const audioData = event.target.result;
         //  audioRef.current.src = audioData;
         //   audioRef.current.play();
           const name = audioFile.name;
           const url = URL.createObjectURL(audioFile);
             audioRef.current.src = url;
             audioRef.current.pause();

           fetch('http://localhost:2345/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,  url }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Audio data successfully posted to the server.');
          } else {
            console.error('Error posting audio data to the server.');
          }
        })
        .catch((error) => {
          console.error('Error posting audio data:', error);
        });
        };
        reader.readAsDataURL(audioFile);
      }
    };
  return (
    <>
       <div className=' tt'>

        <div className='ff'>
          <div className='hm'>
             <span className='im'><ImHome3/> </span>
             <span className='li'>Home</span> 
          </div>
          <div className='hm'>
             <span className='imi'><FaSearch/> </span>
             <span className='lii'>Search</span>
          </div>
        </div>
        <div className='w-100 ft'>
            <div className='d-flex justify-content-between align-items-center'>
               <div className='hm'>
                  <span className='imi'><VscFolderLibrary/> </span>
                  <span className='lii'>Library</span>
               </div>
               <div className='d-flex justify-content-around align-items-center plu'>
                <div><FaPlus/></div>
                <div><FaArrowRight/></div>
               </div>
            </div>
            <input type="file" accept="audio/*" onChange={handleFileChange}  multiple/>
            <button onClick={Save} >Save</button>
            {/* <audio ref={audioRef} controls  ></audio> */}
            {/* <Controls audiodata={audioData} />  */}
        </div>
      </div>
    </>
  )
}

export default Sidenav