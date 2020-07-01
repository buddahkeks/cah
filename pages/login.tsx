import React from 'react';

export default class Index extends React.Component {
    render () {
        return (
            <article>
                <div>
                    <h2>Register</h2>
                </div>
                <div>
                    <h2>Login</h2>
                </div>
                <style jsx>{`
                    article {
                        display: flex;
                        justify-content: center;
                        align-items: start;
                        height: 100%;
                        padding: 10px;
                        box-sizing: border-box;
                    }

                    div {
                        margin: 0 20px;
                        padding: 15px;
                        border-radius: 5px;
                    }
                `}</style>
            </article>
        );
    }
};