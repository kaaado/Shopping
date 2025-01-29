import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import './index.css';
import './Css/components/loading.css';
import './Css/components/google.css';
import './Css/components/alert.css';
import './Css/components/button.css';
import './Pages/Auth/Auth/Auth.css';
import "react-loading-skeleton/dist/skeleton.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';
import CartChangerContext from "./Context/CartChangerContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<WindowContext>
	<MenuContext>
	<CartChangerContext>
	
		<BrowserRouter>
			<App />
		</BrowserRouter>
		
		</CartChangerContext>
	</MenuContext>
</WindowContext>
);
