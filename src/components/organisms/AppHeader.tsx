import AppLogo from '@/assets/images/quantilope-logo.svg';
import '@/components/organisms/AppHeader.scss';

function AppHeader() {
    return (
        <header className="App-header">
            <img className="app-logo" src={AppLogo} />
            <label className="app-subtitle">Full-stack Coding Challenge</label>
        </header>
    );
}

export default AppHeader;
