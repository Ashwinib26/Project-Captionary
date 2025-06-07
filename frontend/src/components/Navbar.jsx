import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>🤖 CaptioNary</Link>
      </div>
      <div style={styles.menu}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/summarize" style={styles.link}>Summary</Link>
        <Link to="/caption" style={styles.link}>Caption</Link>
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
    color: '#8EC5FC',
  },
  logo: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#8EC5FC',
  },
  menu: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: '#E0C3FC',
    textDecoration: 'none',
    fontSize: '1.0rem',
    fontWeight: '500',
    fontFamily: '"Poppins", "Roboto", "Segoe UI", sans-serif',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
