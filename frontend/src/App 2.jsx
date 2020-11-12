import React from 'react';
import Routes from './Routes';


class App extends React.Component{
  state = {
    isAuthenticated: false,
    userHasAuthenticated: x => this.setState({ isAuthenticated: x }),
    search: false,
    searchQuery: "",
    navExpanded: false
  }

  searchResult(e) {
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    else {
      this.setState({search: true});
    }
  }

  keyPressed(event) {
    if (event.key === "Enter" && this.state.searchQuery !== "") {
      this.searchResult(event)
    }
  }

  handleLogout(e) {
    window.sessionStorage.removeItem("auth");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("account");
    window.sessionStorage.removeItem("admin");
    this.setState({ isAuthenticated: false });
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  render() {

    if(this.state.search)
    {
      let redirectURL = `/product/${this.state.searchQuery}`;
      this.setState({ searchQuery: "" });
      this.setState({ search: false });
      return(<></>);
    }

    return <></>;
  }

}

export default App;

