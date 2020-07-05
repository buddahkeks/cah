import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Index extends React.Component {
    render() {
        return (
            <>
                <div className="article">
                    <div className="question-card">Test Text</div>
                    <div className="scoreboard">
                        <table>
                            <td>
                                <tr><i><FontAwesomeIcon icon={faGavel} /></i><span style={{ color: '#FF0800' }}> Matthias</span></tr>
                                <tr><span style={{ color: '#FCAC00' }}>Nico</span></tr>
                                <tr><span style={{ color: '#FFF000' }}>Denis</span></tr>
                                <tr><span style={{ color: '#007700' }}>Moritz</span></tr>
                                <tr><span style={{ color: '#30E500' }}>David</span></tr>
                                <tr><span style={{ color: '#00E4DA' }}>Philipp</span></tr>
                                <tr><span style={{ color: '#00B2FF' }}>Elias</span></tr>
                                <tr><span style={{ color: '#0032FF' }}>Martin</span></tr>
                                <tr><span style={{ color: '#B200FF' }}>Peter</span></tr>
                                <tr><span style={{ color: '#FF00CD' }}>Wolfgang</span></tr>
                            </td>
                            <td>
                                <tr style={{ color: 'green' }}>5</tr>
                                <tr>3</tr>
                                <tr>2</tr>
                                <tr>4</tr>
                                <tr>2</tr>
                                <tr>0</tr>
                                <tr>1</tr>
                                <tr>3</tr>
                                <tr>1</tr>
                                <tr>2</tr>
                            </td>
                        </table>
                    </div>
                    <div className="answer-cards">
                        <div className="card">Text1</div>
                        <div className="card">Text2</div>
                        <div className="card">Text3</div>
                        <div className="card">Text4</div>
                        <div className="card">Text5</div>
                        <div className="card">Text6</div>
                        <div className="card">Text7</div>
                        <div className="card">Text8</div>
                        <div className="card">Text9</div>
                        <div className="card">Text10</div>
                        
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
                        flex-wrap: wrap;
                        position: absolute;
                        width: 1000px;
                        left: 70%;
                        top: 50%;
                        -webkit-transform: translate(-70%, -50%);
                        transform: translate(-70%, -50%);
                    }

                    .card {
                        background: white;
                        margin: 10px;
                        width: 138px;
                        height: 240px;
                        border-radius: 10px;
                        padding: 20px;
                        border: 1px solid black;
                        transition: 0.2s;
                    }
                `}</style>
            </>
        );
    }
};