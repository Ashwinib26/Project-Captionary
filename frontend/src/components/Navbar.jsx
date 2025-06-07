import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>🤖 CaptioNary</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '1rem 2rem',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '2.2rem',
  fontWeight: '600',
  letterSpacing: '0.5px',
  fontFamily: '"Poppins", "Roboto", "Segoe UI", sans-serif',
  transition: 'color 0.3s ease',
},
};

export default Navbar;
