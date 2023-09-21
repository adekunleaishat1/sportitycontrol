import React, { useEffect, useState, useRef } from "react";
import {
  FaPause,
  FaPhoneVolume,
  FaPlay,
  FaShuttleVan,
  FaVolumeDown,
} from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import Myicon from "./Myicon";
import { BsRepeat } from "react-icons/bs";

const Controls = () => {
  const [setdata, setsetdata] = useState([]);
  const [name, setname] = useState();
  const [image, setimage] = useState();
  const [Playing, setPlaying] = useState(false);
  const [CurrentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(99);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:2345/music")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setsetdata(data);
        console.log(setdata);
      })
      .catch((error) => {
        console.error("Error fetching audio data:", error);
      });
  }, []);
  useEffect(() => {
    if (setdata.length > 0) {
      setimage(setdata[CurrentTrackIndex].image);
      setname(setdata[CurrentTrackIndex].name);
      const audioUrl = setdata[CurrentTrackIndex].audio;
      audioRef.current.src = audioUrl;
    }
  }, [setdata]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const playmusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setPlaying(false);
  };

  const handleNext = () => {
    if (setdata.length > 0) {
      setname(setdata[CurrentTrackIndex + 1].name);
      setimage(setdata[CurrentTrackIndex + 1].image);
      const audioUrl = setdata[CurrentTrackIndex + 1].audio;
      audioRef.current.src = audioUrl;
      setPlaying(false);
      setCurrentTrackIndex((prevIndex) =>
        prevIndex + 1 < setdata.length ? prevIndex + 1 : 0
      );
    } else {
      alert("null");
    }
  };
  const handlePrev = () => {
    if (setdata.length > 0) {
      const prevIndex =
        CurrentTrackIndex - 1 < 0 ? setdata.length - 1 : CurrentTrackIndex - 1;
      setname(setdata[prevIndex].name);
      setimage(setdata[prevIndex].image);
      const audioUrl = setdata[prevIndex].audio;
      audioRef.current.src = audioUrl;
      setPlaying(false);
      setCurrentTrackIndex(prevIndex);
    } else {
      alert("null");
    }
  };
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
  };

  return (
    <>
      <div className="w-100 con">
        <audio ref={audioRef} onEnded={handleAudioEnded}></audio>
        <div className="audname">
          <div className=" audnam">
            <img className="audimg" src={image} alt="" />
          </div>
          <div className="shownam">
            <p className="shorten-text">{name}</p>
          </div>
        </div>
        <div className="incon ">
          <div className="w-50 mx-auto dd">
            <div className="d-flex justify-content-between align-items-center mx-auto dc">
              <Myicon myclass="shu" icon={<BiShuffle />} />
              <button onClick={handlePrev} className="btn-lg fs-1 pr">
                <MdSkipPrevious />
              </button>
              <button onClick={playmusic} className="btn btn-dark pau">
                {!Playing ? <FaPlay /> : <FaPause />}
              </button>
              <button onClick={handleNext} className="btn-lg fs-1 pr">
                <MdSkipNext />
              </button>
              <Myicon myclass="shu" icon={<BsRepeat />} />
            </div>
          </div>
          <div className=" mx-auto ra">
            <div className=" w-100 d-flex justify-content-center align-items-center mx-auto ran">
              <span className=" sp ">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="1"
                max="100"
                value={(currentTime / duration) * 100}
                onChange={handleSeek}
              />
              <span className="sp">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        <div className="volum">
          <Myicon myclass="volume" icon={<FaVolumeDown />} />
          <input
            type="range"
            min="1"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </>
  );
};

export default Controls;
