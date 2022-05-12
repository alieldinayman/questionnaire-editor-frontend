import './App.scss';
import 'bulma/sass/grid/columns.sass';
import { AppHeader, QuestionnaireView } from '@/components/organisms';

function App() {
    return (
        <div className="App">
            <AppHeader />
            <QuestionnaireView />
        </div>
    );
}

export default App;
