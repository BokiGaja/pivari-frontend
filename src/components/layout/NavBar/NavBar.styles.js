
const navBarStyles = {
    containerInitial: {
        backgroundColor: '#27241D',
        textAlign: 'center',
        transition: 'background-color 0.3s, transform 0.3s'
    },
    containerScrolled: {
        transition: 'background-color 0.3s, transform 0.3s',
        transform: 'scale(0)',
        backgroundColor: '#27241D',
    },
    logoContainer: {
        width: '70px',
        height: '70px',
        borderRadius: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '7px',
        backgroundColor: '#27241D',
        margin: '1px',
        transition: 'background-color 0.3s, transform 0.3s',
    },
    logoImage: {
        width: '60px',
        height: '60px',
        borderRadius: '40px',
        transition: 'background-color 0.3s, transform 0.3s',
        backgroundColor: '#27241D',
    },
    leftButtons: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    rightButtons: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    navbarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    logo: {
        width: '250px',
    },
    hovered: {
        borderBottom: '2px solid transparent',
        transition: 'border-bottom 0.3s ease',
    },
    toolBarContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
    }
}

export default navBarStyles;