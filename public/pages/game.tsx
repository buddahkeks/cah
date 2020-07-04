import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';

export default class Index extends React.Component {
    render() {
        return (
            <>
                <div className="article">
                    <div className="question-card">Test Text</div>
                    <div className="scoreboard">
                        <table>
                            <td>
                                <tr><i><FontAwesomeIcon icon={faGavel} /></i> Test</tr>
                                <tr>Baum</tr>
                            </td>
                            <td>
                                <tr>1</tr>
                                <tr>2</tr>
                            </td>
                        </table>
                    </div>
                    <div className="card-wrapper">
                        <div className="answer-cards">
                            <div className="card">card 1</div>
                            <div className="card">card 2</div>
                            <div className="card">card 3</div>
                            <div className="card">card 4</div>
                            <div className="card">card 5</div>
                            <div className="card">card 6</div>
                            <div className="card">card 7</div>
                            <div className="card">card 8</div>
                            <div className="card">card 9</div>
                            <div className="card">card 10</div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .question-card {
                        background-color: #000;
                        font-size: 20px;
                        color: #fff;
                        width: 173px;
                        height: 300px;
                        border-radius: 10px;
                        padding: 20px;
                        margin: 50px;
                        display: inline-block;
                    }
                    
                    .scoreboard {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    
                    td { 
                        padding: 0px 20px
                    }

                    .article {
                        height: 100%;
                        position: relative;
                        overflow: hidden;
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

                    .card:hover{
                        transform: translateY(-80px);
                        cursor: pointer;
                    }
                `}</style>
            </>
        );
    }
};