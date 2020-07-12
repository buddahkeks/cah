import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AppConsumer, AppContextProps } from "./AppContext";

export default class Header extends React.Component {
  public context: AppContextProps;

  render() {
    return (
      <AppConsumer>
        {ctx => {
          this.context = ctx;
          return (
            <header>
              <Link href="/">
                <h1>Cards Against Humanity</h1>
              </Link>
              {this.context.authenticated ? (
                <Link href="/dashboard">
                  <div>
                    {ctx.uname()}
                    <i>
                      <FontAwesomeIcon icon={faUser} />
                    </i>
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div>Login</div>
                </Link>
              )}
              <style jsx>{`
                header {
                  flex-grow: 0;
                  background-color: #151515;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  color: #fff;
                  padding: 12.5px;
                  box-shadow: 0 1px 3px #f2f2f2;
                }

                h1 {
                  margin: 0;
                  font-family: "Alegreya Sans", sans-serif;
                  font-weight: normal;
                  transition: 0.15s ease;
                }

                h1:hover {
                  cursor: pointer;
                  text-shadow: 0 0 3px #aaa;
                }

                div {
                  background-color: #ff43a1;
                  padding: 4px 7.5px;
                  border-radius: 5px;
                  transition: 0.2s ease;
                }

                div:hover {
                  cursor: pointer;
                  transform: scale(1.05);
                }

                div i {
                  font-size: 1.8em;
                  margin-left: 5px;
                  vertical-align: middle;
                }
              `}</style>
            </header>
          );
        }}
      </AppConsumer>
    );
  }
}
