import { useState, useEffect, useRef } from 'react';
import { CATEGORIES, PRODUCT, PROIMG } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function Product() {
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisable] = useState(true);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock:0
  });
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const nav = useNavigate();
  const { id } = useParams();
  const focus = useRef(null);
  const openImg = useRef(null);
  const progress = useRef([]);
  const imgId = useRef([]);

  // Get product data
  useEffect(() => {
    setLoading(true);
    Axios.get(`${PRODUCT}/${id}`)
      .then((data) => {
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav('/dashboard/products/page/404', { replace: true }));
  }, [id, nav]);

  // Get all categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}?limit=100000`)
      .then((response) => setCategories(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle form submission
  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
    
    // Delete images marked for deletion
      for (let delId of imagesToDelete) {
        await Axios.delete(`${PROIMG}/${delId}`);
      }
      // Update product details
      await Axios.post(`${PRODUCT}/edit/${id}`, form);

      // Redirect to products page
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Refocus on first input
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle image input open
  function handleOpenImg() {
    openImg.current.click();
  }

  // Handle image change
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();

    for (let i = 0; i < imagesAsFiles.length; i++) {
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);

      try {
        const res = await Axios.post(`/${PROIMG}/add`, data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);

            if (percent % 10 === 0) {
              progress.current[i].style.width = `${percent}%`;
              progress.current[i].setAttribute('percent', `${percent}%`);
            }
          },
        });
        imgId.current[i] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Handle image delete
  function handleImgDel(id, img) {
    const delId = imgId.current[id];
    setImages((prev) => prev.filter((image) => image !== img));
    imgId.current = imgId.current.filter((i) => i !== delId);
  }

  // Handle image delete from server
  function handleImgFromServerDel(imgId) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== imgId));
    setImagesToDelete((prev) => [...prev, imgId]);
  }

  // Map categories
  const categoryShow = categories.map((cat, index) => (
    <option key={index} value={cat.id}>{cat.title}</option>
  ));

  // Map images
  const imageShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between rounded">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img className="rounded" height={80} width={80} src={URL.createObjectURL(img)} alt={img.name} />
          <div>
            <p className="mb-1">{img.name}</p>
            <p>{img.size > 1000000 ? (img.size / (1024 * 1024)).toFixed(2) + ' MB' : (img.size / 1024).toFixed(2) + ' KB'}</p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handleImgDel(key, img)}>Delete</Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => progress.current[key] = e}
          className="inner-progress"
          style={{ width: '0%' }}
        ></span>
      </div>
    </div>
  ));

  // Map images from server
  const imagesFromServerShow = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between rounded">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img className="rounded" height={80} width={80} src={img.image} alt={img.name} />
        </div>
        <Button variant="danger" onClick={() => handleImgFromServerDel(img.id)}>Delete</Button>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
        <Form.Group controlId="category" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
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
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            minLength="3"
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
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            minLength="3"
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
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
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
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
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
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            required
            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
            name="stock"
            type="number"
            placeholder="Enter Product Stock..."
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
            onChange={handleImagesChange}
          />
        </Form.Group>
        <div
          onClick={handleOpenImg}
          className="d-flex align-items-center flex-column gap-2 justify-content-center py-3 w-100 mb-2 rounded"
          style={{ border: "2px dashed #0086fe" }}
        >
          <img src={require("../../../Assets/upload.png")}
            alt="Upload image" width={100}
            style={{ cursor: "pointer" }}
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>Upload Images</p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesFromServerShow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imageShow}
        </div>
        <Button disabled={disabled} className="mt-3 w-100" variant="outline-primary" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
}
