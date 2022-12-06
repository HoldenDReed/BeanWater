import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const EmployeeNav = () => {
    return (
        <>
        <Navbar bg="dark" variant="dark" sticky='top'>
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="albums/create">Create Album</Nav.Link>
              <Nav.Link href="/random">Random Album</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
    }
    