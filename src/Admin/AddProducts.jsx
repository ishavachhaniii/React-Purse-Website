import { Container, FormGroup } from "@mui/material";
import { Row, Col, Form, Input, Button, Label } from "reactstrap";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import fire from "../User/helpers/db";
import { db, storage } from "../User/helpers/db";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { InputLabel, Select, MenuItem } from "@material-ui/core";

const AddProducts = () => {
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
  const [enterPrice, setenterPrice] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [status, setStatus] = useState("inactive");

  const navigate = useNavigate();

  const AddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(storage, `image/${Date.now() + enterImage.name}`);

      const uploadTask = uploadBytesResumable(storageRef, enterImage);

      uploadTask.on(
        () => {
          toast.error("Image Not Uploaded!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              await addDoc(docRef, {
                name: enterTitle,
                // price: enterPrice,
                description: enterDesc,
                desc: enterDescription,
                quantity: enterQty,
                category: selectCategory,
                image: downloadURL,
                enterPrice: selectedPrice,
                status: status,
              });
            })
            .then(() => {
              // Reset form fields
              setStatus("active");
            });
        }
      );
      setLoading(false);
      toast.success("Product Succesfully Added.");
      navigate("/dashboard/allproduct");
    } catch (err) {
      setLoading(false);
      toast.error("Product Not Added!");
    }
  };

  useEffect(() => {
    // Fetch category data from Firebase
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

  const handleAddPrice = () => {
    const newPrice = {
      price,
    };
    setenterPrice([...enterPrice, newPrice]);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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
                  Add Product
                </h2>
                <Form onSubmit={AddProduct}>
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
                        min={0}
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
                        style={{ marginBottom: "15px" }}
                      />
                      {/* <span>
                        <AddCircleSharpIcon onClick={handleAddProduct} />
                      </span> */}
                      <div className="d-flex gap-3">
                        <Button onClick={handleAddPrice}>Add</Button>
                        {enterPrice.map((product, index) => (
                          <Label key={index}>
                            <Input
                              type="checkbox"
                              name="selectedPrice"
                              value={product.price}
                              checked={selectedPrice === product.price}
                              onChange={handleCheckboxChange}
                            />
                            <span> {product.price}</span>
                          </Label>
                        ))}
                      </div>
                    </FormGroup>
                    <FormGroup className="w-50">
                      <span>Product Category</span>
                      <Select
                        value={selectCategory}
                        label="Category"
                        onChange={handleCategoryChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {enterCategory.map((ctg) => (
                          <MenuItem key={ctg.cid} value={ctg.cname}>
                            {ctg.cname}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">None</option>
                        <option value="Backpack">BackPack</option>
                        <option value="MakeUpBag">MakeUpBag</option>
                        <option value="Clutch">Clutch</option>
                        <option value="Bucket">Bucket</option>
                        <option value="Crossbody">Crossbody</option>
                      </select> */}
                    </FormGroup>
                  </div>
                  <br />

                  <div className="d-flex align-items-center justify-content-between gap-5"> 
                    <FormGroup  className="w-50">
                      <span>Product Image</span>
                      <Input
                        label="Product Image"
                        type="file"
                        onChange={(e) => setEnterimage(e.target.files[0])}
                        required
                      />
                    </FormGroup>

                    <FormGroup  className="w-50">
                    <span>Product Status</span>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      // style={{ width: "50%" }}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                    </Select>
                  </FormGroup>

                  </div>
                  
                  <br />
                  <Button>Add Product</Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;

// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../helpers/db";
// import { Container, FormGroup, Input, InputLabel } from "@mui/material";
// import { Label } from "reactstrap";

// const AddProducts = () => {
//   const [enterCategory, setEnterCategory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   // Fetch category data from Firebase
//   const fetchCategories = async () => {
//     try {
//       const categoryRef = collection(db, "category");
//       const snapshot = await getDocs(categoryRef);
//       const categoriesData = snapshot.docs.map((doc) => doc.data());
//       setEnterCategory(categoriesData);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   fetchCategories();
// }, []);

//   const initialValues = {
//     enterTitle: "",
//     enterDesc: "",
//     enterDescription: "",
//     enterQty: "",
//     enterCategory: "",
//     enterImage: null,
//     enterPrice: "",
//     status: "inactive",
//   };

//   const validationSchema = Yup.object().shape({
//     enterTitle: Yup.string().required("Product Title is required"),
//     enterDesc: Yup.string().required("Short Description is required"),
//     enterDescription: Yup.string().required("Description is required"),
//     enterQty: Yup.number()
//       .typeError("Quantity must be a number")
//       .required("Quantity is required")
//       .min(1, "Quantity must be at least 1"),
//     enterCategory: Yup.string().required("Category is required"),
//     enterImage: Yup.mixed().required("Product Image is required"),
//     enterPrice: Yup.number().required("Price is required")
//     .typeError("Price must be a number"),
//     status: Yup.string().required("Status is required"),
//   });

//   const handleAddProduct = async (values) => {
//     try {
//       setLoading(true);

//       // Upload image to Firebase storage
//       const imageRef = ref(storage, `image/${Date.now() + values.enterImage.name}`);
//       const uploadTask = uploadBytesResumable(imageRef, values.enterImage);
//       const snapshot = await uploadTask;

//       // Get download URL of the uploaded image
//       const downloadURL = await getDownloadURL(snapshot.ref);

//       // Add product data to Firebase firestore
//       const productData = {
//         name: values.enterTitle,
//         description: values.enterDesc,
//         desc: values.enterDescription,
//         quantity: values.enterQty,
//         category: values.enterCategory,
//         image: downloadURL,
//         price: values.enterPrice,
//         status: values.status,
//       };
//       await addDoc(collection(db, "products"), productData);

//       setLoading(false);
//       console.log("Product Successfully Added.");
//     } catch (error) {
//       setLoading(false);
//       console.error("Error adding product:", error);
//     }
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: handleAddProduct,
//   });

//   return (
//     <section>
//       <Container>
//       <h2 style={{textAlign: "center", margin: "30px"}}>Add Product</h2>
//       <form onSubmit={formik.handleSubmit}>
//           <FormGroup  className="w-50">
//             <InputLabel >Product Title</InputLabel>
//             <Input
//             variant="outlined"
//             type="text"
//             id="enterTitle"
//             name="enterTitle"
//             value={formik.values.enterTitle}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.enterTitle && formik.touched.enterTitle && (
//             <div>{formik.errors.enterTitle}</div>
//           )}
//           </FormGroup>

//         <FormGroup  className="w-50">
//           <InputLabel>Short Description</InputLabel>
//           <Input
//             type="text"
//             id="enterDesc"
//             name="enterDesc"
//             value={formik.values.enterDesc}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.enterDesc && formik.touched.enterDesc && (
//             <div>{formik.errors.enterDesc}</div>
//           )}
//           </FormGroup>

//           <FormGroup  className="w-50">
//           <InputLabel htmlFor="enterDescription">Description</InputLabel>
//           <Input
//             type="text"
//             id="enterDescription"
//             name="enterDescription"
//             value={formik.values.enterDescription}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.enterDescription && formik.touched.enterDescription && (
//             <div>{formik.errors.enterDescription}</div>
//           )}

//        </FormGroup>
//          <FormGroup  className="w-50">
//           <InputLabel htmlFor="enterQty">Quantity</InputLabel>
//           <Input
//             type="number"
//             id="enterQty"
//             name="enterQty"
//             value={formik.values.enterQty}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.enterQty && formik.touched.enterQty && (
//             <div>{formik.errors.enterQty}</div>
//           )}
//         </FormGroup>

//          <FormGroup  className="w-50">
//           <InputLabel htmlFor="enterCategory">Category</InputLabel>
//           <Select
//             id="enterCategory"
//             name="enterCategory"
//             value={formik.values.enterCategory}
//             onChange={formik.handleChange}
//           >
//             <option value="">None</option>
//             {enterCategory.map((ctg) => (
//               <option key={ctg.cid} value={ctg.cname}>
//                 {ctg.cname}
//               </option>
//             ))}
//           </Select>
//           {formik.errors.enterCategory && formik.touched.enterCategory && (
//             <div>{formik.errors.enterCategory}</div>
//           )}
//         </FormGroup>

//         <FormGroup  className="w-50">
//           <InputLabel htmlFor="enterImage">Product Image</InputLabel>
//           <Input
//             type="file"
//             id="enterImage"
//             name="enterImage"
//             onChange={(event) =>
//               formik.setFieldValue("enterImage", event.target.files[0])
//             }
//           />
//           {formik.errors.enterImage && formik.touched.enterImage && (
//             <div>{formik.errors.enterImage}</div>
//           )}
//         </FormGroup>

//         <FormGroup  className="w-50">
//           <InputLabel htmlFor="enterPrice">Price</InputLabel>
//           <Input
//             type="text"
//             id="enterPrice"
//             name="enterPrice"
//             value={formik.values.enterPrice}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.enterPrice && formik.touched.enterPrice && (
//             <div>{formik.errors.enterPrice}</div>
//           )}
//         </FormGroup>

//         <FormGroup  className="w-50">
//           <InputLabel htmlFor="status">Status</InputLabel>
//           <Select
//             id="status"
//             name="status"
//             value={formik.values.status}
//             onChange={formik.handleChange}
//           >
//             <option value="inactive">Inactive</option>
//             <option value="active">Active</option>
//           </Select>
//           {formik.errors.status && formik.touched.status && (
//             <div>{formik.errors.status}</div>
//           )}
//         </FormGroup>

//         <Button type="submit" disabled={loading}>
//           Add Product
//         </Button>

//       </form>
//       </Container>

//     </section>
//   );
// };

// export default AddProducts;
