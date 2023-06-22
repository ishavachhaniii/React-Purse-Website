import { Container, FormGroup } from "@mui/material";
import { Row, Col, Form, Input, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import "firebase/firestore";
import "firebase/database";
import { toast } from "react-toastify";
import fire from "../User/helpers/db";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../User/helpers/db";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { MenuItem, Select } from "@material-ui/core";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const Edit = () => {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterDesc, setEnterDesc] = useState("");
  const [enterDescription, setEnterdescription] = useState("");
  const [enterQty, setEnterqty] = useState("");
  // const [enterPrice, setEnterprice] = useState(0);
  const [enterCategory, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [enterImage, setEnterimage] = useState(null);
  const [Loading, setLoading] = useState(false);

  const [price, setPrice] = useState("");
  const [enterPrice, setEnterPrice] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [status, setStatus] = useState("inactive");

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = docSnap.data();
          setEnterTitle(productData.name);
          setEnterDesc(productData.description);
          setEnterdescription(productData.desc);
          setEnterqty(productData.quantity);
          // setEnterprice(productData.price);
          setPrice(productData.enterPrice);
          setSelectCategory(productData.category);
          setEnterimage(productData.image);
          setStatus(productData.status);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error retrieving product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const docRef = doc(db, "products", id);

      // if (enterImage) {
      //   const storageRef = ref(
      //     storage,
      //     `image/${Date.now() + enterImage.name}`
      //   );

      const storageRef = ref(storage, `image/${Date.now() + enterImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterImage);

      uploadTask.on(
        // "state_changed",
        () => {
          // Progress tracking logic
        },
        // (error) => {
        //   console.error("Error uploading image:", error);
        //   toast.error("Image Not Uploaded!");
        // },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(docRef, {
              name: enterTitle,
              description: enterDesc,
              desc: enterDescription,
              quantity: enterQty,
              // price: enterPrice,
              enterPrice: selectedPrice,
              category: selectCategory,
              image: downloadURL,
              status: status,
            }).then(() => {
              // Reset form fields
              setStatus("active");
            });
          });
          setLoading(false);
          toast.success("Product successfully updated.");
          navigate("/dashboard/allproduct");
        }
      );
      // } else {
      //   await updateDoc(docRef, {
      //     name: enterTitle,
      //     description: enterDesc,
      //     desc: enterDescription,
      //     quantity: enterQty,
      //     // price: enterPrice,
      //     enterPrice: selectedPrice,
      //     category: selectCategory,
      //     image: enterImage,
      //     status: status,
      //   });
      //   setLoading(false);
      //   toast.success("Product successfully updated.");
      //   navigate("/dashboard/allproduct");
      // }
    } catch (error) {
      setLoading(false);
      console.error("Error updating product:", error);
      toast.error("Product not updated!");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const db = fire.firestore();
      const snapshot = await db.collection("category").get();
      const categoriesData = snapshot.docs.map((doc) => doc.data());
      setCategory(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectCategory(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "price") {
      setPrice(value);
    }
  };
  const handleCheckboxChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleUpdatePrice = () => {
    const newPrice = {
      price,
    };
    setEnterPrice([...enterPrice, newPrice]);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setEnterimage(file);
  };
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {Loading ? (
              <h4 className="py-5">Loading...</h4>
            ) : (
              <>
                <h2 style={{ margin: "30px", textAlign: "center" }}>
                  Edit Product
                </h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <span>Product Title</span>
                    <Input
                      type="text"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>Short Description</span>
                    <Input
                      type="text"
                      value={enterDesc}
                      onChange={(e) => setEnterDesc(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>Description</span>
                    <Input
                      label="Description"
                      type="text"
                      value={enterDescription}
                      onChange={(e) => setEnterdescription(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="w-50">
                    <span>Quantity</span>
                    <Input
                      label="Quantity"
                      type="number"
                      min={1}
                      value={enterQty}
                      onChange={(e) => setEnterqty(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="w-50">
                      <span>Price</span>
                      {/* <Input
                        type="number"
                        value={enterPrice}
                        onChange={(e) => setEnterprice(e.target.value)}
                        required
                      /> */}
                      <Input
                        min={0}
                        type="number"
                        name="price"
                        value={price}
                        onChange={handleInputChange}
                        required
                        style={{marginBottom: "15px"}}
                      />
                      <div className="d-flex gap-3">
                      <Button onClick={handleUpdatePrice}>Add</Button>
                        {enterPrice.map((product, index) => (
                          <label key={index}>
                            <Input
                              type="checkbox"
                              name="selectedPrice"
                              value={product.price}
                              checked={selectedPrice === product.price}
                              onChange={handleCheckboxChange}
                            />
                           <span> {product.price}</span>
                          </label>
                        ))}
                      </div>
                      {/* <span>
                        <AddCircleSharpIcon onClick={handleUpdatePrice} />
                      </span>
                      <div>
                        {enterPrice.map((product, index) => (
                          <label key={index}>
                            <input
                              type="checkbox"
                              name="selectedPrice"
                              value={product.price}
                              checked={selectedPrice === product.price}
                              onChange={handleCheckboxChange}
                            />
                            {product.price}
                          </label>
                        ))}
                      </div> */}
                    </FormGroup>
                    <Select
                      value={selectCategory}
                      onChange={handleCategoryChange}
                      style={{ width: "50%" }}
                      placeholder="select category"
                    >
                      {enterCategory.map((category) => (
                        <MenuItem key={category.cid} value={category.cname}>
                          {category.cname}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <br />

                  <div>
                    <FormGroup>
                      <span>Product Image</span>
                      <Input
                        label="Product Image"
                        type="file"
                        // onChange={(e) => setEnterimage(e.target.files[0])}
                        onChange={handleImageChange}
                        required
                      />
                    </FormGroup>
                  </div>
                  <br />
                  <div>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      style={{ width: "50%" }}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                    </Select>
                  </div>
                  <br />
                  <Button onSubmit={() => navigate("/dashboard/allproduct")}>
                    Update Product
                  </Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Edit;
