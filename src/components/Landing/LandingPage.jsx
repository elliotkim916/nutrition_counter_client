import React, { useState, useEffect, useRef } from 'react';
import '../../index.scss';
import Description from './Description';

const LandingPage = ({ history }) => {
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const LandingPageElement = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0.0003);

    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  const logIn = () => {
    setLeaving(true);
    LandingPageElement.current.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        history.push('/login-page');
      } else {
        return;
      }
    });
  };

  const signUp = () => {
    setLeaving(true);
    LandingPageElement.current.addEventListener('animationend', (e) => {
      if (e.animationName === 'opacity_out') {
        history.push('/registration-page');
      } else {
        return;
      }
    });
  };

  const listOne = [
    'Search your meal',
    'See the nutrition broken down',
    'Save all your food and keep track',
  ];
  const listTwo = [
    'Enter your workout and duration',
    'Search from a huge database',
    'Track exercises',
  ];
  const listThree = [
    'Compare calories burned to calories consumed',
    'See if you are eating more than you are burning',
    'Save and delete what you want',
  ];

  return (
    <div
      className={`landing-page ${leaving ? 'opacity-out' : ''}`}
      ref={LandingPageElement}
    >
      <div className="shape-two">
        <span className="landing-login" onClick={() => logIn()} tabIndex="1">
          Log in
        </span>
        <span className="landing-signup" onClick={() => signUp()} tabIndex="2">
          Sign up
        </span>
        <br />

        <h1 className={`landing-page-header ${mounted ? 'fadeIn' : ''}`}>
          Nutrition Counter
        </h1>

        <p className="descriptor-header">Stay On Track</p>
        <p className="landing-page-descriptor">
          The ultimate tool for tracking your diet and workouts
        </p>

        <button onClick={() => signUp()} className="landing-page-signup-btn">
          SIGN UP
        </button>
      </div>

      <div className="parent-container">
        <Description
          cssClass="container-one"
          header="Weight Loss"
          imgData={{
            imgSrc: 'https://img.icons8.com/color/96/000000/apple.png',
            imgClass: 'container-img',
            imgAlt: 'apple',
          }}
          list={listOne}
        />
        <Description
          cssClass="container-two"
          header="Calorie Counter"
          imgData={{
            imgSrc: 'https://img.icons8.com/color/96/000000/treadmill.png',
            imgClass: 'container-img',
            imgAlt: 'treadmill',
          }}
          list={listTwo}
        />
        <Description
          cssClass="container-three"
          header="Get Fit"
          imgData={{
            imgSrc:
              'https://img.icons8.com/color/96/000000/bench-press-with-dumbbells.png',
            imgClass: 'benchpress-img',
            imgAlt: 'weightlifter',
          }}
          addlImgData={{
            imgSrc: 'https://img.icons8.com/color/96/000000/weightlift.png',
            imgClass: 'weightlift-img',
            imgAlt: 'weightlifter',
          }}
          list={listThree}
        />
      </div>
    </div>
  );
};

export default LandingPage;
