import React from "react";
import Link from "next/link";

export default class Index extends React.Component {
  render() {
    return (
      <>
        <article>
          <div className="waves">
            <img src="/media/wave.svg" alt="" />
            <img src="/media/wave2.svg" alt="" className="wave2" />
          </div>
          <div className="register">
            <h1>Register</h1>
            <form>
              <input type="text" placeholder="Username" autoFocus />
              <input type="password" placeholder="●●●●●●●●●●●●●" />
              <input type="submit" value="Register" />
            </form>
            <p>
              Already a member? <Link href="/login">Login</Link>
            </p>
          </div>
        </article>

        <style jsx>{`
          form {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100px;
            width: 300px;
            margin: auto auto;
            padding: 0;
          }

          input {
            font-size: 17px;
            color: #273036;
            border: none;
            border-bottom: 1px solid #dadada;
            transition-duration: 0.2s;
          }

          input:focus {
            outline: none;
            border-bottom: 1px solid #273036;
          }

          input[type="submit"] {
            margin: 20px 0px 0px 0px;
            border: none;
            border-radius: 10px;
            background-color: #273036;
            color: #fff;
            padding: 3px 0px;
          }

          input[type="submit"]:hover {
            background-color: #151515;
            cursor: pointer;
          }

          svg {
            width: 100%;
          }

          .register {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }

          .waves {
            position: relative;
            overflow: hidden;
          }

          .wave2 {
            position: absolute;
            top: -12%;
            z-index: 2;
            left: 0;
          }

          p {
            text-align: center;
          }

          h1 {
            text-align: center;
            top: -10%;
            font-size: 30px;
            margin-bottom: 30px;
          }
        `}</style>
      </>
    );
  }
}
