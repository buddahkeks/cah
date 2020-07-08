import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faTrash,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";

export default class Index extends React.Component {
  render() {
    return (
      <>
        <div className="article">
          <div className="question-card">Test Text</div>
          <div className="scoreboard">
            <table>
              <td>
                <tr>
                  <i>
                    <FontAwesomeIcon icon={faGavel} />
                  </i>
                  <span style={{ color: "red" }}> Matthias</span>
                </tr>
                <tr>
                  <span style={{ color: "#FCAC00" }}>Nico</span>
                </tr>
                <tr>
                  <span style={{ color: "#FFF000" }}>Denis</span>
                </tr>
                <tr>
                  <span style={{ color: "#007700" }}>Moritz</span>
                </tr>
                <tr>
                  <span style={{ color: "#30E500" }}>David</span>
                </tr>
                <tr>
                  <span style={{ color: "#00E4DA" }}>Philipp</span>
                </tr>
                <tr>
                  <span style={{ color: "#00B2FF" }}>Elias</span>
                </tr>
                <tr>
                  <span style={{ color: "#0032FF" }}>Martin</span>
                </tr>
                <tr>
                  <span style={{ color: "#B200FF" }}>Peter</span>
                </tr>
                <tr>
                  <span style={{ color: "#FF00CD" }}>Wolfgang</span>
                </tr>
              </td>
              <td>
                <tr style={{ color: "green" }}>5</tr>
                <tr>3</tr>
                <tr>2</tr>
                <tr>4</tr>
                <tr>2</tr>
                <tr>1</tr>
                <tr>1</tr>
                <tr>3</tr>
                <tr>1</tr>
                <tr>2</tr>
              </td>
            </table>
          </div>
          <div className="card-wrapper">
            <div className="answer-cards">
              <div className="card">
                card 1
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 2
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 3
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 4
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 5
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 6
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 7
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 8
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 9
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
              <div className="card">
                card 10
                <i>
                  <FontAwesomeIcon icon={faTrash} />
                </i>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .article {
            height: 100%;
            position: relative;
            overflow: hidden;
          }

          .question-card {
            background-color: #000;
            font-size: 20px;
            color: #fff;
            width: 173px;
            height: 300px;
            border-radius: 15px;
            padding: 20px;
            margin: 50px;
            display: inline-block;
          }

          .scoreboard {
            display: inline-block;
            position: absolute;
            margin: 60px 0px;
          }

          td {
            padding: 0px 20px;
            font-size: 20px;
          }

          td:last-child {
            font-weight: bold;
          }

          .answer-cards {
            display: flex;
            position: absolute;
            bottom: -50px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
          }

          .card {
            background: white;
            width: 115px;
            height: 200px;
            border-radius: 10px;
            padding: 20px;
            border: 1px solid black;
            transition: 0.2s;
          }

          .card:not(:first-child) {
            margin-left: -30px;
          }

          .card:hover {
            transform: translateY(-80px);
            cursor: pointer;
          }

          .card i {
            position: absolute;
            color: #dadada;
            font-size: 20px;
            bottom: 0;
            left: 0;
            padding: 15px;
            transition-duration: 0.2s;
          }

          .card i:hover {
            color: #273036;
          }
        `}</style>
      </>
    );
  }
}
