import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default class Header extends React.Component {
    render () {
        return (
            <header>
                <Link href="/">
                    <h1>Cards Against Humanity</h1>
                </Link>
                <Link href="/login">
                    <div>
                        <p>Login</p>
                        <i><FontAwesomeIcon icon={faUser} /></i>
                    </div>
                </Link>
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
                        font-family: 'Alegreya Sans', sans-serif;
                        font-weight: normal;
                        transition: .15s ease;
                    }

                    h1:hover {
                        cursor: pointer;
                        text-shadow: 0 0 3px #aaa;
                    }

                    div {
                        background-color: #FF43A1;
                        padding: 4px 7.5px;
                        border-radius: 5px;
                        transition: .2s ease;
                    }

                    div:hover {
                        cursor: pointer;
                        transform: scale(1.05);
                    }

                    div p {
                        display: inline-block;
                        margin: 0;
                        vertical-align: middle;
                        font-size: 1.1em;
                        padding-right: 6px;
                    }
                    
                    div i {
                        font-size: 1.8em;
                        vertical-align: middle;
                    }
                `}</style>
            </header>
        );
    }
}