import { useState,useEffect,useRef } from 'react';
import { CATEGORIE } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${CATEGORIE}/add`, form);
      nav("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));  
  }
const focus=useRef(null);
useEffect(()=>{
focus.current.focus();
},[])
  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name='title'
            type="text"
            placeholder="Enter Category Title.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength="3"
            required
            ref={focus}
          />
        </Form.Group>

        <div className="d-flex flex-row gap-2">
          {imagePreview && ( 
            <img src={imagePreview} width={80} height={80} alt="Category Preview"  className="rounded-pill fade-in" />
          )}
          <Form.Group className="mb-3 w-100" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              placeholder="Enter Category Image..."
              onChange={handleImageChange}
              required
            />
          </Form.Group>
        </div>
        <Button disabled={title.length < 3} className="mt-3 w-100" variant="outline-primary" type="submit">
          Add
        </Button>
      </Form>
    </>
  );
}
