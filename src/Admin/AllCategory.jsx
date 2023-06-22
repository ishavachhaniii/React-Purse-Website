import React from "react";
import "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import fire, { db } from "../User/helpers/db";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UseGetData from "../User/helpers/UseGetData";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

function AllCategory() {
  const { data: category, Loading } = UseGetData("category");

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "category", id));
    toast.error("Product Deleted!!");
  };

  return (
    <Container>
      <h2 style={{ margin: "30px", textAlign: "center" }}>Manage Categories</h2>
      {Loading ? (
        <h4 className="py-5 text-center fw-bold">Loading...</h4>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.cid}</TableCell>
                <TableCell>{item.cname}</TableCell>
                <TableCell>
                  <Link to={`/dashboard/editcategory/${item.id}`}>
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Link>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      deleteProduct(item.id);
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
    // <Container>
    //    <h2 style={{margin: "30px", textAlign: "center"}}>Manage Categories</h2>
    //   <Table>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Category ID</TableCell>
    //         <TableCell>Category Name</TableCell>
    //         <TableCell>Edit</TableCell>
    //         <TableCell>Delete</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {Loading ? (
    //         <h4 className="py-5 text-center fw-bold">Loading...</h4>
    //       ) : (
    //         category.map((item) => (
    //           <TableRow key={item.id}>
    //             <TableCell>{item.cid}</TableCell>
    //             <TableCell>{item.cname}</TableCell>

    //             <TableCell>
    //             {/* <IconButton style={{ color: "blue" }}> */}
    //               <Link to={`/dashboard/editcategory/${item.id}`}><EditIcon /></Link>
    //               {/* </IconButton> */}
    //             </TableCell>
    //             <TableCell>
    //               <IconButton style={{ color: "red" }} onClick={() => {
    //                     deleteProduct(item.id);
    //                   }}>
    //                 <DeleteIcon/>
    //               </IconButton>
    //             </TableCell>
    //           </TableRow>
    //         ))
    //       )}
    //     </TableBody>
    //   </Table>
    // </Container>
  );
}
export default AllCategory;
