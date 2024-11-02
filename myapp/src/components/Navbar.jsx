import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
const Navbarr = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <div>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="/add">Add Blogs</Nav.Link>
              <Nav.Link href="/list">List Blogs</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/checkout">Checkout</Nav.Link>
              <Button className='btn btn-danger' onClick={logout}>Logout</Button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbarr
