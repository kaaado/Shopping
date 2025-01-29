import {Routes, Route} from 'react-router-dom';
import Website from './Pages/Website/Website';
import HomePage from './Pages/Website/HomePage/HomePage';
import SingleProduct from './Pages/Website/SingleProduct/SingleProduct';
import WebsiteCategories from './Pages/Website/Categories/Categories';
import Login from './Pages/Auth/Auth/Login';
import Register from './Pages/Auth/Auth/Register';
import RequireAuth from './Pages/Auth/Protecting/RequireAuth';
import RequireBack from './Pages/Auth/Protecting/RequireBack';
import Err404 from './Pages/Auth/Error/404';
import GoogleCallBack from './Pages/Auth/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/User/Users';
import User from './Pages/Dashboard/User/User';
import AddUser from './Pages/Dashboard/User/AddUser';
import Categories from './Pages/Dashboard/Category/Categories';
import AddCategory from './Pages/Dashboard/Category/AddCategory';
import Category from './Pages/Dashboard/Category/Category'
import Products from './Pages/Dashboard/Product/Products';
import AddProduct from './Pages/Dashboard/Product/AddProduct';
import Product from './Pages/Dashboard/Product/Product'


export default function App() {
  return (
    <div>
    <Routes>
   				 {/* Public Routes */}
   	<Route element={<Website/>}>
    <Route path='/' element={<HomePage />} />
     <Route path="/categories" element={<WebsiteCategories />} />
     <Route path="/product/:id" element={<SingleProduct />} />
    </Route>
    <Route element={<RequireBack/>}>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    </Route>
    <Route path='/auth/google/callback' element={<GoogleCallBack />} />
     <Route path='/*' element={<Err404 />} />
     
     					{/* Protected Routes */}			
   <Route element={<RequireAuth allowedRole={["1996","1995","1999"]}/>}>
   						{/* Dashboard */}
   <Route path='/dashboard' element={<Dashboard />}>
   <Route element={<RequireAuth allowedRole={["1995"]} />}>
 					  {/* User */}
   		<Route path='users' element={<Users />} />
    	<Route path='users/:id' element={<User />} />
   		<Route path='user/add' element={<AddUser />} />
    </Route>
    <Route element={<RequireAuth allowedRole={["1999","1995"]}/>}>
   						 {/* Category */}
    	<Route path='categories' element={<Categories />} />
    	<Route path='category/add' element={<AddCategory />} />
    	<Route path='categories/:id' element={<Category />} />
    					{/* Product */}
    	<Route path='products' element={<Products />} />
    	<Route path='product/add' element={<AddProduct />} />
    	<Route path='products/:id' element={<Product />} />
    </Route>
 
   </Route>
   </Route>
    </Routes>
    </div>
  );
}
