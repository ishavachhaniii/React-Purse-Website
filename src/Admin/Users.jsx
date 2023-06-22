import React from "react";
import { Container, Row, Col } from "reactstrap";
import UseGetData from "../User/helpers/UseGetData";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../User/helpers/db";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";

const Users = () => {
  const { data: userData, loading } = UseGetData("users");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("User deleted!");
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h2 style={{ marginTop: "30px", textAlign: "center" }}>
            Manage Users
          </h2>
        </Col>
        <Col lg="12" className="pt-5">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <h5 className="pt-5 fw-bold">Loading.....</h5>
              ) : (
                userData?.map((user) => (
                  <TableRow key={user.uid}>
                    <TableCell>{user.uid}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
