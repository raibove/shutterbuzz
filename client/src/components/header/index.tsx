import Logo from '/logo.svg';
import './style.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='logo-con'>
                <img src={Logo} alt='logo' className='logo' /> <span className='brand-name'>ShutterBuzz</span>
            </div>
            <div className='nav-con'>
                <span className='nav-item'>Profile</span>
            </div>
        </div>
    )
}

export default Header;