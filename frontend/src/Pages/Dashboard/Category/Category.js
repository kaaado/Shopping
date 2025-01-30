import { useState,useEffect } from 'react';
import { CATEGORIE } from '../../../Api/Api';
import { Axios } from '../../../Api/axios';
import { useNavigate,useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import LoadingSubmit from '../../../Components/Loading/loading';

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const {id} = useParams();
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORIE}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
setImagePreview(data.data.image);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => nav('/dashboard/categorie/page/404', { replace: true }));
  }, [id, nav]);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`${CATEGORIE}/edit/${id}`, form);
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
            
          />
        </Form.Group>

        <div className="d-flex flex-row gap-2">
           {imagePreview && ( 
            <img src={'https://shopping-production.up.railway.app'+imagePreview} width={80} height={80} alt="Category Preview"  className="rounded-pill fade-in" />
          )}
          <Form.Group className="mb-3 w-100" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              placeholder="Enter Category Image..."
              onChange={handleImageChange}
              
            />
          </Form.Group>
        </div>
        <Button disabled={disable} className="mt-3 w-100" variant="outline-primary" type="submit">Update</Button>
      </Form>
    </>
  );
}
