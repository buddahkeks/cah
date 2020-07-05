import React, { FormEvent } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface IndexState {
    errorMsg?: string;
    cuError?: number;
}

export default class Index extends React.Component<void, IndexState> {
    private userInput: HTMLInputElement;
    private passInput: HTMLInputElement;

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    private onLogin (e: FormEvent): void {
        e.preventDefault();
        const [uname, pwd] = [this.userInput.value.trim(), this.passInput.value];
        if (!uname || !pwd) return this.showError('Please enter username and password!');
        fetch('http://localhost:8080/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uname, pwd, }),
        }).then(res => res.json()).then(res => {
            if (!res.success) return this.showError(res.msg);
            localStorage.setItem('tkn', res.body.tkn);
            console.log(JSON.parse(atob(localStorage.getItem('tkn').split('.')[1])).uname);
            // TODO: logged-in stuff: redirect, etc.
        });
    }

    private showError (msg: string): void {
        if (this.state.cuError) window.clearTimeout(this.state.cuError);
        this.setState({
            errorMsg: msg,
            cuError: window.setTimeout(() => this.setState({ errorMsg: undefined, }), 5000),
        });
    }

    public render () {
        return (
            <>
                <article>
                    <div className="waves">
                        <img src="/media/wave.svg" alt="" />
                        <img src="/media/wave2.svg" alt="" className="wave2" />
                    </div>
                    <div className="login">
                        <h1>Login</h1>
                        <form onSubmit={this.onLogin.bind(this)}>
                            <input ref={e => this.userInput = e} type="text" placeholder="Username" autoFocus />
                            <input ref={e => this.passInput = e} type="password" placeholder="●●●●●●●●●●●●●" />
                            <input type="submit" value="Login" />
                        </form>
                        <p>Not a member? <Link href="/register">Register</Link></p>
                    </div>
                    <div className={'error ' + (this.state.errorMsg ? 'error-up' : 'error-down')}><i><FontAwesomeIcon icon={faExclamationCircle} /></i> {this.state.errorMsg}</div>
                </article>

                <style jsx>{`
                    article {
                        position: relative;
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                    }

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
                        border-bottom: 1px solid #DADADA;
                        transition-duration: 0.2s;
                        background: none;
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

                    .login {
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

                    @keyframes wiggle {
                         0% { transform: rotate( 0deg); }
                        25% { transform: rotate( 1.5deg); }
                        50% { transform: rotate( 0deg); }
                        75% { transform: rotate(-1.5deg); }
                    }

                    .error-down {
                        transform: translateY(200%);
                    }

                    .error-up {
                        animation: wiggle .2s linear .3s 1 forwards;
                    }
                    
                    .error {
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        background: rgba(255, 53, 96, .3);
                        color: #E33157;
                        border: 2px solid #FF3560;
                        border-radius: 15px;
                        padding: 10px;
                        transition: .3s cubic-bezier(.25, .1, .3, 1.5);
                    }
                `}</style>
            </>
        );
    }
};