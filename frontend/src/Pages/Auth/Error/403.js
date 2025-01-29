import './403.css';
import {Link} from 'react-router-dom';
export default function Err403({role}){
return(
	<div className="text-wrapper">
		<div className="title" data-content={404}>
		 	403 - ACCESS DENIED
		</div>
		<div className="subtitle">
			Oops, You don't have permission to acess to this page.

		<Link className="d-block text-center btn btn-primary" to={role==="1996"? "/dashboard/writer" :"/"}>{role==="1996"? "Redirect to Writer Page":"Redirect to Home Page" }</Link>
	</div>
	</div>
)
}
