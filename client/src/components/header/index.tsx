import Logo from '/logo.svg';
import './style.css'
import * as netlifyIdentity from 'netlify-identity-widget'


interface Props {
    isAuthenticated: null | string;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<string | null>>
}

const Header = ({ isAuthenticated, setIsAuthenticated }: Props) => {
    return (
        <div className='header'>
            <div className='logo-con'>
                <img src={Logo} alt='logo' className='logo' /> <span className='brand-name'>ShutterBuzz</span>
            </div>
            <div className='nav-con'>
                <span className='nav-item'>About</span>
                {isAuthenticated ?
                    <span className='nav-item'
                        onClick={() => {
                            netlifyIdentity.logout();
                            setIsAuthenticated(null)
                        }}>Logout</span>
                    :
                    <span className='nav-item'
                        onClick={() => {
                            netlifyIdentity.init()
                            netlifyIdentity.open('signup')
                            netlifyIdentity.on('login', user => {
                                console.log('login', user.email)
                                netlifyIdentity.off('login');
                                setIsAuthenticated(user.email)
                                netlifyIdentity.close();
                            });
                        }}>Login</span>
                }
            </div>
        </div>
    )
}

export default Header;