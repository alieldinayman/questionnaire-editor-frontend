import '@/App.scss';
import 'bulma/sass/grid/columns.sass';
import AppHeader from '@/components/organisms/AppHeader';
import QuestionnaireView from '@/components/organisms/QuestionnaireView';

function App() {
    return (
        <div className="App">
            <AppHeader />
            <QuestionnaireView />
        </div>
    );
}

export default App;
