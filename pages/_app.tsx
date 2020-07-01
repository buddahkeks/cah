import React from 'react';
import App from 'next/app';
import Header from '../components/Header';

export default class CAHApp extends App {
    public render () {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Header />
                <article>
                    <Component {...pageProps} />
                </article>
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        font-family: 'Roboto', sans-serif;
                    }

                    #__next {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: stretch;
                        align-items: stretch;
                    }

                    #__next > article {
                        flex-grow: 1;
                    }
                `}</style>
            </>
        )
    }
}