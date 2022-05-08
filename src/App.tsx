import '@/App.scss';
import 'bulma/sass/grid/columns.sass';
import AppHeader from '@/components/organisms/AppHeader';
import QuestionContainer from '@/components/organisms/QuestionContainer';

function App() {
    return (
        <div className="App">
            <AppHeader />
            <QuestionContainer />
        </div>
    );
}

export default App;
