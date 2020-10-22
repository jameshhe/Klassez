import React from 'react';
import Routes from './Routes';
import { Nav, Navbar, Form, Button, Dropdown } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import logo from './logoGreenTransparent.png';


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
      return(<Redirect to={redirectURL} />);
    }

    return (
      <div className="">
        <Navbar id="nav" bg="light" variant="light" expand="lg" onSelect={this.setNavExpanded} expanded={this.state.navExpanded}>
					<Navbar.Brand >
            <Link id="navLink" className="" to="/" onClick={() => this.setNavExpanded(false)}>Foogle</Link>
            <Link to="/"><img id = "navImg" src = {logo} ></img></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => this.setNavExpanded(this.state.navExpanded ? false : "expanded")}/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">
                {sessionStorage.getItem("auth")
                  ? <>
                      <Navbar.Brand>
                        <Link id = "navLink" to="/" onClick={ e => { this.setNavExpanded(false); this.handleLogout(e) } } >Logout</Link>
                      </Navbar.Brand>
                      <Navbar.Brand>
                        <Link id = "navLink" to={`/${window.sessionStorage.getItem("username")}`} onClick={() => this.setNavExpanded(false)}>Profile</Link>
                      </Navbar.Brand>
                      <Navbar.Brand>
                        <Link id = "navLink" to={`/foodsNew`} onClick={() => this.setNavExpanded(false)}>Foods</Link>
                      </Navbar.Brand>
                    </>
                  : <>
                      <Navbar.Brand>
                        <Link id = "navLink" to="/login" onClick={() => this.setNavExpanded(false)}>Login</Link>
                      </Navbar.Brand>
                    </>
                }
                <Navbar.Brand>
                  <Link id = "navLink" to = "/about" onClick={() => this.setNavExpanded(false)}>About</Link>
                </Navbar.Brand>
              </Nav>
            
              <Form inline>
                <Form.Control type="text"
                              placeholder="Search for a Food"
                              className=" mr-sm-2"
                              value={this.state.searchQuery}
                              onChange={ e => this.setState({ searchQuery: e.target.value }) }
                              onKeyPress={ e => this.keyPressed(e) } />
                <Dropdown as={Button.Group}>
                  <Button id="buttonRules"
                          type="button"
                          onClick={ e => { this.setNavExpanded(false); this.searchResult(e) }}
                          disabled={ !(this.state.searchQuery.length > 0)}>
                          <SearchOutlined className="align-middle" />
                  </Button>
                  <Dropdown.Toggle split type="button" id="buttonRules" />
                  <Dropdown.Menu id="dropdown-menu">
                    <Dropdown.Item href="/search">Advanced Search</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form> 
            </Navbar.Collapse>
				</Navbar>
        
        <div className="container-fluid py-3 content">
          <Routes className="m-1" appProps={ this.state } />
        </div>
      </div>
    );
  }

}

export default App;

