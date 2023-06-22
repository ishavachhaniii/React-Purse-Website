import { Container, FormGroup } from "@mui/material";
import { Row, Col, Form, Input, Button } from "reactstrap";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import fire from "../User/helpers/db";

const Category = () => {
  const [enterId, setEnterId] = useState("");
  const [enterCategoryName, setEnterCategoryName] = useState("");

  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const AddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const db = fire.firestore();
    db.collection('category').add({
        cid: enterId,
        cname: enterCategoryName,
    })
    .then(() => {
        console.log('Category added successfully');
        navigate('/dashboard/allcategory');
      })
      .catch((error) => {
        console.error('Error adding Category: ', error);
      });
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {Loading ? (
              <h4 className="py-5">Loading...</h4>
            ) : (
              <>
                 <h2 style={{margin: "30px", textAlign: "center"}}>Add Category</h2>
                <Form onSubmit={AddCategory}>
                  <FormGroup>
                    <span>Category Id</span>
                    <Input
                      type="text"
                      value={enterId}
                      onChange={(e) => setEnterId(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <span>Category name</span>
                    <Input
                      type="text"
                      value={enterCategoryName}
                      onChange={(e) => setEnterCategoryName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  
                  <Button style={{marginTop: "30px"}}>Add Category</Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Category;
