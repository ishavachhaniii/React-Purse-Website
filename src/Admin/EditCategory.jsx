import { Container, FormGroup } from "@mui/material";
import { Row, Col, Form, Input, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import "firebase/firestore";
import "firebase/database";
import { toast } from "react-toastify";
import fire from "../User/helpers/db";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [product, setProduct] = useState({});

  const [enterCategoryName, setEnterCategoryName] = useState("");

  const [Loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fire
      .firestore()
      .collection("category")
      .doc(id)
      .get()
      .then((doc) => {
        setProduct(doc.data());
        setEnterCategoryName(doc.data().cname);
      })
      .catch((error) => {
        toast.error("Category not updated!", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const db = fire.firestore();
    db.collection("category")
      .doc(id)
      .update({
        cname: enterCategoryName,
      })
      .then(() => {
        console.log("Category update successfully");
        setLoading(false);
        // toast.success("Category successfully updated.");
        navigate("/dashboard/allcategory");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating Category:", error);
        // toast.error("Category not updated!");
      });
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
                  Edit Category
                </h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <span>Category name</span>
                    <Input
                      type="text"
                      value={enterCategoryName}
                      onChange={(e) => setEnterCategoryName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button style={{ marginTop: "20px" }}>Update Category</Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditCategory;
