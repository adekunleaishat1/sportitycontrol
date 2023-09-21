import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebook,
  FaInstagram,
  FaPlay,
  FaTwitter,
} from "react-icons/fa";
import { BsArrowDownCircle } from "react-icons/bs";
import { SlUser } from "react-icons/sl";
import Myimg from "./Myimg";
import Myicon from "./Myicon";
import logo from "../Component/9a4198abfd84448781ae162c4d8bd1a6.jpg";

const Topnav = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch(" http://localhost:4567/Post")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data);
      });
  }, []);

  const generateMusic = (category) => {
    let counter = 0;
    return apiData.map((el, i) => {
      if (el.category === category) {
        if (counter < 5) {
          counter++;
          return (
            <div key={i} className="mix">
              <img className="cuimg" src={el.image} alt="" />
              <div className="mx-auto as">
                <h2 className="text-white fs-6 mt-2 fw-bold">{el.name}</h2>
                <p className="fs-6 ">{el.content}</p>
                <Myicon myclass="displ" icon={<FaPlay/>}/>
              </div>
            </div>
          );
        }
      }
      return null; 
    });
  };
  

  return (
    <>
      <div className="td">
        <div className=" d-flex justify-content-between align-items-center tr">
          <div className="d-flex justify-content-around align-items-center di">
            <button className="bt">
              <FaAngleLeft />
            </button>
            <button className="bt">
              <FaAngleRight />
            </button>
          </div>
          <div className="d-flex justify-content-around align-items-center ind">
            <button className="btn btn-light btn-sm fw-bold up">upgrade</button>
            <button className="btn btn-dark btn-sm text-light in">
              <BsArrowDownCircle /> Install App
            </button>
            <button className="btn btn-dark  us">
              <SlUser />
            </button>
          </div>
        </div>
        <div className="inerdiv">
          <h1 className="text-white ms-3 fs-3">Good Afternoon</h1>
          <div className="d-flex justify-content-between align-items-center imdcon">
            <div className="imd">
              <Myimg className="cusimg" im={require("./download.jpeg")} />
              <span className="text-white fw-bold ms-3">2:30</span>
            </div>
            <div className="imd">
              <Myimg className="cusimg" im={require("./download (1).jpeg")} />
              <span className="text-white fw-bold ms-3">Amapiano</span>
            </div>
            <div className="imd">
              <Myimg
                className="cusimg"
                im={require("./ab67706f000000021c256b4ef4a7d8fc0d635321.jpeg")}
              />
              <span className="text-white fw-bold ms-3">African Heat</span>
            </div>
            <div className="imd">
              <Myimg
                className="cusimg"
                im={require("./ab6761610000e5eb0f743bef043340ca5aac2205.jpeg")}
              />
              <span className="text-white fw-bold ms-3">Ayra starr</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-white ms-3 fs-4 fw-bold">
            Made For Adekunle Aishat
          </h1>
         <div className="d-flex justify-content-between align-items-center mixd">
           {generateMusic("daily-mix")}
         </div>
        </div>
        <div>
          <h1 className="text-white ms-3 fs-4 fw-bold">
            Your top mixes
          </h1>
          <div className="d-flex justify-content-between align-items-center mixd">
           {generateMusic("latest-music")}
         </div>
        </div>
        <div>
          <h1 className="text-white ms-3 fs-4 fw-bold">Recently Played</h1>
          <div className="d-flex justify-content-between align-items-center mixd">
           {generateMusic("popular-music")}
         </div>
        </div>
        <div>
          <h1 className="text-white ms-3 fs-4 fw-bold">Popular artists</h1>
          <div className="d-flex justify-content-between align-items-center mixd">
           {generateMusic("popular-artist")}
         </div>
        </div>
        <div className="w-100 mt-4 ">
          <div className="row mx-auto foot">
            <div className="col-2">
              <h2 className="text-white fs-6 fw-bold">Company</h2>
              <p className="text-secondary fs-6">About</p>
              <p className="text-secondary fs-6">Jobs</p>
              <p className="text-secondary fs-6">For the Records</p>
            </div>
            <div className="col-2">
              <h2 className="text-white fs-6 fw-bold">Communities</h2>
              <p className="text-secondary fs-6">For Artist</p>
              <p className="text-secondary fs-6">Developer</p>
              <p className="text-secondary fs-6">Advertising</p>
              <p className="text-secondary fs-6">Investors</p>
              <p className="text-secondary fs-6">Vendors</p>
              <p className="text-secondary fs-6">Sportify for Work</p>
            </div>
            <div className="col-2">
              <h2 className="text-white fs-6 fw-bold">Useful links</h2>
              <p className="text-secondary fs-6">Support</p>
              <p className="text-secondary fs-6">Free Mobile App</p>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-start ">
              <div className=" icodiv">
                <Myicon myclass="ico" icon={<FaInstagram />} />
                <Myicon myclass="ico" icon={<FaTwitter />} />
                <Myicon myclass="ico" icon={<FaFacebook />} />
              </div>
            </div>
          </div>
        </div>
        <hr className="mx-auto hr" />
        <div className="w-100 ">
          <div className="container mx-auto d-flex justify-content-between align-items-start inerf">
            <div className="col-6 d-flex justify-content-between align-items-center">
              <p className="fs-6">Legal</p>
              <p className="fs-6">Private center</p>
              <p>Privacy Policy</p>
              <p>Cookies</p>
              <p>About Ads</p>
              <p>Accessibility</p>
            </div>
            <div className="col-2">
              <p> © 2023 Spotify AB</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topnav;
