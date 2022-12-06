import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const CustomerNav = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark" sticky='top'>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/" className='text=white'>Home</Nav.Link>
          <Nav.Link href="/favorites">Favorites</Nav.Link>
          <Nav.Link href="/random">Random Album</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
);
}
