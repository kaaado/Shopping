import {faUsers,faUserPlus,faList,faPlus,faCartShopping,faCartPlus} from '@fortawesome/free-solid-svg-icons';
export const links =[
{
	name:"Users",
	to:"/dashboard/users",
	icon:faUsers,
	role:"1995",
},
{
	name:"Add User",
	to:"/dashboard/user/add",
	icon:faUserPlus,
	role:"1995",
},
{
	name:"Categories",
	to:"/dashboard/categories",
	icon:faList,
	role:["1995","1999"],
},
{
	name:"Add Category",
	to:"/dashboard/category/add",
	icon:faPlus,
	role:["1995","1999"],
},
{
	name:"Products",
	to:"/dashboard/products",
	icon:faCartShopping,
	role:["1995","1999"],
},
{
	name:"Add Product",
	to:"/dashboard/product/add",
	icon:faCartPlus,
	role:["1995","1999"],
},

]
