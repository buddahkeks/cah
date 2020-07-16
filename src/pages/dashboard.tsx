import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faCamera } from "@fortawesome/free-solid-svg-icons";

export default class Dashboard extends React.Component {
  public render() {
    return (
      <>
        <div className="profil">
          <div className="half-circle"></div>
          <div className="profil-pic">
            <i className="camera"><FontAwesomeIcon icon={faCamera}/></i>
            
          </div>
          <p className="username">Username: 8twinni8</p>
          <p className="played-games">Played Games: 16</p>
          <p className="won-games">Won Games: 12</p>
          <p className="email">E-Mail: test@email.com</p>
          <input type="submit" value="Change Password" />
        </div>
        <div className="game">
          <div className="half-circle"></div>
          <div className="game-pic">
            <i><FontAwesomeIcon icon={faGamepad}/></i>
          </div>
          <p>Create Game</p>
          <p>Join Game</p>
        </div>
        <style jsx>{`
          .profil {
            width: 400px;
            height: 450px;
            border: 1px solid black;
            position: absolute;
            left: 25%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
          }

          .half-circle {
            position:absolute;
            width: 160px;
            height: 80px;
            background-color: #fff;
            border-bottom-left-radius: 81px;
            border-bottom-right-radius: 81px;
            border: 1px solid #000;
            border-top: 0;
            left:calc(50% - 80px);
            background: white;
            top -1px;
          }

          .profil-pic {
            position:absolute;
            top: -60px;
            left:calc(50% - 60px);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #000;
            background-image: url('https://lh3.googleusercontent.com/proxy/ri9sufaWyGo3662MKLJ0BFw00TRdHpHiPwfxCoOrvHCstTCmPOzKwmrxU1yscM1D_BA8tqjjmJwFa8jffRvzhQToKSvEHc5amyUdNN4Nz3OeWgyZJDvFnas04AOMFes');
            background-position: center center;
            background-repeat: no-repeat;
            background-size: contain;
          }

          .camera {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 30px;
            width: 30px;
            margin: 0 3px;
            border: 2px solid gray;
            border-radius: 100px;
            background: white;
          }

          .profil p {
            text-align: center;
            font-size: 20px;
          }

          .username {
            padding: 80px 0px 0px 0px;
          }

          .played-games {
            padding: 30px 0px 0px 0px;
          }

          .email {
            padding: 30px 0px 0px 0px;
          }

          input {
            position: absolute;
            font-size: 20px;
            bottom: 0;
            width: 100%;
            background: none;
            border: none;
          }

          .game {
            width: 400px;
            height: 450px;
            background: black;
            border: 1px solid black;
            position: absolute;
            left: 75%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 20px;
          }

          .game-pic {
            position:absolute;
            top: -60px;
            left:calc(50% - 60px);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #000;
            background: black;
          }

          .game i {
            position: relative;
            font-size: 70px;
            vertical-align: middle;
            top: 17%;
            color: white;
          }

          .game p {
            text-align: center;
            position: relative;
            top: 25%;
            color: white;
            font-size: 40px;
            padding: auto 0;
          }
        `}</style>
      </>
    );
  }
}