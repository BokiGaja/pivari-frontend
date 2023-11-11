const navBarStyles = {
  containerInitial: {
    backgroundColor: '#27241D',
    textAlign: 'center',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  containerScrolled: {
    transition: 'background-color 0.3s, transform 0.3s',
    transform: 'scale(0)',
    backgroundColor: '#27241D',
  },
  logoContainer: {
    position: 'fixed',
    bottom: 50,
    right: 20,
    width: '70px',
    height: '70px',
    borderRadius: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27241D',
    margin: '1px',
    borderWidth: 2,
    borderColor: '#efcc68',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  logoScrolled: {
    transition: 'background-color 0.3s, transform 0.3s',
    transform: 'scale(0)',
  },
};

export default navBarStyles;
