import { useState, useRef } from "react";
import React from "react";
import {
  FaArrowCircleLeft,
  FaArrowDown,
  FaArrowRight,
  FaBackward,
  FaMusic,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import {MdArrowDropDown } from "react-icons/md";
import { VscFolderLibrary } from "react-icons/vsc";
import Controls from "./Controls";
import Myicon from "./Myicon";

const Sidenav = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [imagefile, setimagefile] = useState(null)
  const [imageData, setimageData] = useState(null)
  const [audio, setAudioData] = useState(null);
  const audioRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    console.log(file);
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const audioData = event.target.result;
      setAudioData(audioData);
    };
    reader.readAsDataURL(file);
  };

  const handleimageChange = (event) =>{
    const myfile = event.target.files[0];
    setimagefile(myfile);
    console.log(myfile);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      setimageData(imageData);
      console.log(imageData);
    };
    reader.readAsDataURL(myfile);
  }
  

  const Save = () => {
    console.log(audioFile);
    console.log(imageData);
    if (audioFile) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const audioData = event.target.result;
  
        fetch("http://localhost:2345/music", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: audioFile.name, audio: audioData, image: imageData }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Audio data successfully posted to the server.");
            } else {
              console.error("Error posting audio data to the server.");
            }
          })
          .catch((error) => {
            console.error("Error posting audio data:", error);
          });
      };
  
      reader.readAsDataURL(audioFile);
    }
  };
  
  
  return (
    <>
      <div className=" tt">
        <div className="ff">
          <div className="hm">
            <span className="im">
              <ImHome3 />{" "}
            </span>
            <span className="li">Home</span>
          </div>
          <div className="hm">
            <span className="imi">
              <FaSearch />{" "}
            </span>
            <span className="lii">Search</span>
          </div>
        </div>
        <div className="w-100 ft">
          <div className="d-flex justify-content-between align-items-center">
            <div className="hm">
              <span className="imi">
                <VscFolderLibrary />{" "}
              </span>
              <span className="lii">Library</span>
            </div>
            <div className="d-flex justify-content-around align-items-center plu">
              <div>
                <FaPlus />
              </div>
              <div>
                <FaArrowRight />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center w-50 p-1 mt-2 ms-2">
            <Myicon myclass="ico" icon={<FaPlus />} />
            <button className="btn btn-light btn-sm pl">
              playlist
            </button>
            <button className="btn btn-dark btn-sm pl">By you</button>
          </div>
          <div className="d-flex justify-content-between align-items-center arro">
            <div className="col-5">
              <Myicon myclass="lii" icon={<FaSearch />} /> 
            </div>
            <div className="col-3 arr2">
              <p className="fw-bold ms-2 text-white rc">Recents</p>
              <p className="ardown"><MdArrowDropDown /></p>
            </div>
          </div>
          <div className="row mt-2 ps-2 ">
            <div className="col-2">
            <Myicon myclass="musci" icon={<FaMusic/>}/>
            </div>
            <div className="col-5 myplay">
              <h1 className="fw-bold fs-6 text-white">My Playlists #1</h1>
              <p className=" fs-6 gap-1">Aishat Adekunle</p>
            </div>
          </div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            multiple
          />
          <input type="file" accept="image/*" onChange={handleimageChange} multiple/>
          <button className="btn btn-light btn-sm" onClick={Save}>Save</button>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
