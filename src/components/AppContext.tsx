import React from "react";
import cookie from 'js-cookie';
import io from 'socket.io-client';

export interface AppContextProps {
  authenticated: boolean;
  tkn?: string;
  uname: () => string;
  login: (uname: string, pwd: string) => Promise<void>;
  register: (uname: string, pwd: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext: React.Context<AppContextProps> = React.createContext<AppContextProps>({
  authenticated: false,
  uname: () => null,
  login: () => new Promise((resolve, reject) => resolve()),
  register: () => new Promise((resolve, reject) => resolve()),
  logout: () => null,
});

export default AppContext;

interface AppProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

interface AppProviderState extends AppContextProps {};

export class AppProvider extends React.Component<AppProviderProps, AppProviderState> {
  private static baseURL: string = "http://localhost/api";

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      login: this.login.bind(this),
      register: this.register.bind(this),
      logout: this.logout.bind(this),
      uname: this.uname.bind(this),
    };
  }

  public componentDidMount() {
    this.checkAuthState();
  }

  private login(uname: string, pwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${AppProvider.baseURL}/users/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uname, pwd }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) return reject(res.msg);
          // cookie will be set automatically ...
          this.setState(
            {
              authenticated: true,
              tkn: res.body.tkn as string,
            },
            () => resolve()
          );
        })
        .catch(reject);
    });
  }

  private register(uname: string, pwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${AppProvider.baseURL}/users/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uname, pwd }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) return reject(res.msg);
          this.setState(
            {
              authenticated: true,
              tkn: res.body.tkn as string,
            },
            () => resolve()
          );
        })
        .catch(reject);
    });
  }

  private logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("tkn");
      this.setState(
        {
          authenticated: false,
          tkn: undefined,
        },
        () => resolve()
      );
    });
  }

  private checkAuthState(): void {
    fetch(`${AppProvider.baseURL}/users/status`)
      .then(res => res.json())
      .then(res => {
        if (!res.success) return;
        this.setState({
          authenticated: true,
          tkn: cookie.get('tkn')
        });
      });
  }

  private uname(): string {
    return JSON.parse(atob(this.state.tkn.split(".")[1])).uname;
  }

  public render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer: React.Consumer<AppContextProps> = AppContext.Consumer;
