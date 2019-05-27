import React from 'react';
import Asteroidsjpg from '../images/asteroids-sm.jpg';
import Asteroidswebm from '../images/asteroids-sm.webm';
import Asteroidsmp4 from '../images/asteroids-sm.mp4';
import Asteroidsogv from '../images/asteroids-sm.ogv';

export default function Header() {
  return (
    <header className="fullscreen-bg">
      <video loop muted autoPlay poster={Asteroidsjpg} className="fullscreen-bg__video">
          <source src={Asteroidswebm} type="video/webm" />
          <source src={Asteroidsmp4} type="video/mp4" />
          <source src={Asteroidsogv} type="video/ogg" />
      </video>
    </header>
  );
}