import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { lazy, Suspense } from 'react';

import Spinner from '../spinner/Spinner';

import './App.scss';

const AppHeader = lazy(() => import('../appHeader/AppHeader'));
const CharList = lazy(() => import('../charList/CharList'));
const ComicsList = lazy(() => import('../comicsList/ComicsList'));
const AppEvents = lazy(() => import('../appEvents/AppEvents'));
const BaseLayout = lazy(() => import('../baseLayout/baseLayout'));
const PageNotFound = lazy(() => import('../pageNotFound/PageNotFound'));

export default function App() {
    return (
        <Router>
            <div className="App">
               <Suspense fallback={ <Spinner /> }>
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={ <CharList /> }/>
                        <Route path="/comics" element={ <ComicsList /> } />
                        <Route path="/events" element={ <AppEvents/> } />
                        <Route path="/characters/:id" element={ <BaseLayout name="characters" /> }/>
                        <Route path="/comics/:id" element={ <BaseLayout name="comics" /> }/>
                        <Route path="/creators/:id" element={ <BaseLayout name="creators" /> }/>
                        <Route path="*" element={ <PageNotFound /> } />
                    </Routes>
               </Suspense>
            </div>
        </Router>
    );
}