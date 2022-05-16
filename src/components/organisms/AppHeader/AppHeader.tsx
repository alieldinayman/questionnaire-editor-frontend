import './AppHeader.scss';
import AppLogo from '@/assets/images/app-logo.png';

function AppHeader() {
    return (
        <header className="App-header">
            <img className="app-logo" src={AppLogo} />
            <label className="app-subtitle">Full-stack Coding Challenge</label>
        </header>
    );
}

export default AppHeader;
