import { useState,useEffect,useRef } from 'react';
import { CATEGORIES,PRODUCT,PROIMG } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function AddProduct() {
  const [form, setForm] = useState({
  	category:"",
  	title:"",
  	description:"",
  	price:"",
  	discount:"",
  	About:"",
    stock:0
  });
  //dummy data for get id to send imgs
  const dummyForm={
   category:null,
  	title:"dummy",
  	description:"dummy",
  	price:222,
  	discount:0,
  	About:"dummy",
  	stock: 0,
  };
  
  const [images,setImages]=useState([])
  
  const [categories, setCategories] = useState([]);
  
  const [loading, setLoading] = useState(false);
  
  const [sent,setSent]=useState(false)
  
  const [id,setId]=useState()
  
  const nav = useNavigate();
  
  //useRef for image delete
const imgId=useRef([])
  
//get all catgrs
useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
    .then((response) =>{
    setCategories(response.data)})
    .catch((err) => console.log(err))
  }, []);


 //add dummy data for get id 
  async function handleSubmitForm(){
  try {
     const res =await Axios.post(`${PRODUCT}/add`,dummyForm);
     setId(res.data.id)
    } catch (err) {
      console.log(err);
    }
  }

//edit the dummy data (send new data from form )
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
     await Axios.post(`${PRODUCT}/edit/${id}`,form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
 
 //ref focus on first input  
const focus=useRef(null);
useEffect(()=>{
focus.current.focus();
},[])

//open image handle ref from icon upload to input 
const openImg=useRef(null);
function handleOpenImg(){
	openImg.current.click()
}

//ref for progress(no rerender=no requests)
const progress=useRef([])


//handle change inputs 
function handleChange(e){
	  e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1)
    if (sent!==1){
    handleSubmitForm()}
    
}

// handle and store imgs 

const j=useRef(-1)

async function handleImagesChange(e) {
  setImages((prev) => [...prev, ...e.target.files]);
  const imagesAsFiles = e.target.files;
  const data = new FormData();

  for (let i = 0; i < imagesAsFiles.length; i++) {
   j.current++;
    data.append("image", imagesAsFiles[i]);
    data.append("product_id", id);

    try {
     const res= await Axios.post(`/${PROIMG}/add`, data, {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          const percent = Math.floor((loaded*100)/ total);

          if (percent %10===0){
            progress.current[j.current].style.width = `${percent}%`;
            progress.current[j.current].setAttribute('percent', `${percent}%`);
          }
        },
      });
      imgId.current[j.current]=res.data.id;
    } catch (err) {
      console.log(err);
    }
 }
}

  //map category 
const categoryShow=categories.map((cat,index)=> <option key={index} value={cat.id}>{cat.title}</option>)


//map imgs
const imageShow = images.map((img, key) => (
  <div key={key} className="border p-2 w-100">
  <div className="d-flex align-items-center justify-content-between  rounded">
    <div className="d-flex align-items-center justify-content-start gap-2 ">
      <img className="rounded" height={80} width={80} src={URL.createObjectURL(`https://shopping-production.up.railway.app${img}`)} alt={img.name} />
      <div>
        <p className="mb-1">{img.name}</p>
        <p>{img.size > 1000000 ? (img.size / (1024 * 1024)).toFixed(2) + ' MB' : (img.size / 1024).toFixed(2) + ' KB'}</p>
      </div>
      </div>
      <Button variant="danger"  onClick={()=>handleImgDel(key,img)}>Delete</Button>
    </div>
    <div className="custom-progress mt-3">
      <span
        ref={(e) => (
            progress.current[key] = e)
        }
        className="inner-progress"
        style={{ width: '0%' }} 
      ></span>
    </div>
  </div>
));



//handle img delete
async function handleImgDel(id,img){
const delId=imgId.current[id];
 try {
      const res = await Axios.delete(`${PROIMG}/${delId}`);
     setImages(prev=>prev.filter(image=>image!==img))
     imgId.current=imgId.current.filter(i=>i!==delId)
     j.current--;
    } catch (err) {
      console.log(err);
    }
}
  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
      
      <Form.Group controlId="category" className="mb-3">
               <Form.Label>Category</Form.Label> 
               <Form.Select
               name="category"
               value={form.category} 
               onChange={handleChange} 
               required
               ref={focus}
               >
     		 <option disabled value="">Select Category</option>
    	  	{categoryShow}
    	  	 
    </Form.Select>
    </Form.Group>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type="text"
            placeholder="Enter Product Title..."
            value={form.title}
            onChange={handleChange}
            minLength="3"
            disabled={!sent}
            required
            
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            type="text"
            placeholder="Enter Product Description..."
            value={form.description}
            onChange={handleChange}
            minLength="3"
            disabled={!sent}
            required
       	 />
        </Form.Group>
         <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name='price'
            type="text"
            placeholder="Enter Product Price..."
            value={form.price}
            onChange={handleChange}
            disabled={!sent}
            required
       	 />
        </Form.Group>
         <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            name='discount'
            type="text"
            placeholder="Enter Product Discount..."
            value={form.discount}
            onChange={handleChange}
            disabled={!sent}
            required
       	 />
        </Form.Group>
         <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            name='About'
            type="text"
            placeholder="Enter Product About..."
            value={form.About}
            onChange={handleChange}
            disabled={!sent}
            required
       	 />
        </Form.Group>
         <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            required
            onChange={handleChange}
            name="stock"
            type="number"
            placeholder="Enter Product Stock..."
            disabled={!sent}
          />
        </Form.Group>
    	<Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
          ref={openImg}
          hidden
           multiple
            name='images'
            type="file"
            accept="image/*"
            disabled={!sent}
            onChange={handleImagesChange}
            
       	 />
        </Form.Group>
        <div 
        onClick={handleOpenImg}
        className="d-flex align-items-center flex-column gap-2 justify-content-center py-3 w-100 mb-2 rounded"
        style={{border:!sent ? "2px dashed gray":"2px dashed #0086fe" }}>
        <img  src={require("../../../Assets/upload.png")} 
        alt="Upload image" width={100}
        style={{filter:!sent && "grayscale(1)" , cursor:sent && "pointer"}}
        />
        <p className="fw-bold mb-0" style={{color:!sent ? "gray" : "#0086fe"}}>Upload Images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
        	{imageShow}
        </div>
        
        <Button disabled={form.title.length < 3} className="mt-3 w-100" variant="outline-primary" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
}
