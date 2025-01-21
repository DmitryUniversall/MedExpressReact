// Lib js
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Lib css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// Global css
import './assets/styles/utils.css'
import './assets/styles/global.css'

// Init
import "./errors.ts"

import { layout } from "./project_routing.ts";
import { initializeLocalization } from "./localization.ts";
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

initializeLocalization()

const root = createRoot(document.getElementById('root')!);

root.render(
    <>
        <I18nextProvider i18n={ i18n }>
            <BrowserRouter>
                <Routes>
                    <Route path={ `${ layout.path }*` } key={ layout.name } element={ <layout.component/> }/>
                    {/*<Route path='*' element={<NotFound404View/>}/>*/ }
                </Routes>
            </BrowserRouter>
        </I18nextProvider>
    </>
);
