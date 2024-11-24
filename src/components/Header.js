import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from 'react';

function Header() {
  const { user, logout } = useAuthContext()

  const router = useRouter();
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (token) {
      if (user.user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        if (router.pathname === '/') {
          router.push('/test')
        }
      }
    } else {
      router.push('/login')
    }
  }, [user])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Globalie</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {
          user?.user?.role !== 'admin'
            ?
            <>
              <Nav.Link className='me-3' href="/test">Test</Nav.Link>
              <Nav.Link className='ms-auto' href="/exam-history">Exam History</Nav.Link>
            </>
            : <></>
        }
        <Navbar.Collapse id="basic-navbar-nav">
          <NavDropdown className="ms-auto" title={`${user?.user?.username || 'Anonymous User'}`} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;