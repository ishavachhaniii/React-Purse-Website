import React, { useState, useEffect } from "react";
import "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  Container,
  TableHead,
  TableRow,
  IconButton,
  Button,
  TablePagination,
} from "@material-ui/core";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import UseGetData from "../User/helpers/UseGetData";
import fire, { db } from "../User/helpers/db";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AllProducts = () => {
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pagedProducts, setPagedProducts] = useState([]);
  const { data: products, Loading } = UseGetData("products");

  useEffect(() => {
    if (products && products.length > 0) {
      const sortedProducts = products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setTotalProducts(sortedProducts.length);
      paginateProducts();
    }
  }, [products]);

  // useEffect(() => {
  //   setCurrentPage(0);
  //   paginateProducts();
  // }, [filterValue]);

  const paginateProducts = () => {
    if (!products || products.length === 0) {
      setTotalProducts(0);
      setPagedProducts([]);
      return;
    }

    let filteredProducts = products;

    // Apply any filters
    if (filterValue) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Calculate the start and end index of the current page
    const startIndex = currentPage * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    // Update the state variables with the paginated products
    setTotalProducts(filteredProducts.length);
    setPagedProducts(filteredProducts.slice(startIndex, endIndex));
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    paginateProducts();
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRecordsPerPage(newRowsPerPage);
    setCurrentPage(0); // Reset the current page to 0
    // Update the state variables with the new rows per page and calculate paginated products
    setRecordsPerPage(newRowsPerPage);
    paginateProducts();
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.error("Product Deleted!!");
  };

  const toggleProductStatus = async (id, currentStatus) => {
    try {
      const productRef = doc(db, "products", id);
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateDoc(productRef, { status: newStatus });
      toast.success(
        `Product ${
          newStatus === "active" ? "Activated" : "Deactivated"
        } Successfully!`
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
      toast.error("Failed to toggle product status");
    }
  };

  return (
    <Container>
      <h2 style={{ margin: "30px", textAlign: "center" }}>Product Details</h2>
      {Loading ? (
        <h4 className="py-5 text-center fw-bold">Loading...</h4>
      ) : (
        <>
          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Filter by name..."
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Short Description</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pagedProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image}
                      style={{ height: "100px", width: "100px" }}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.enterPrice}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.desc}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => toggleProductStatus(item.id, item.status)}
                      style={{
                        backgroundColor:
                          item.status === "active" ? "green" : "#C21807",
                        color: "white",
                      }}
                    >
                      {item.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/edit/${item.id}`}>
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
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={totalProducts}
            rowsPerPage={recordsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ marginTop: "20px" }}
          />
        </>
      )}
    </Container>
  );
};

export default AllProducts;

// import React, { useState, useEffect } from 'react';
// import 'firebase/firestore';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   Container,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   TablePagination,
// } from '@material-ui/core';
// import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import UseGetData from '../User/helpers/UseGetData';
// import { db } from '../User/helpers/db';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const AllProducts = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [recordsPerPage, setRecordsPerPage] = useState(10);

//   const { data: pagedProducts, loading: Loading, totalCount } = UseGetData(
//     'products',
//     currentPage,
//     recordsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(0);
//   }, [totalCount]);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRecordsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const deleteProduct = async (id) => {
//     await deleteDoc(doc(db, 'products', id));
//     toast.error('Product Deleted!!');
//   };

//   const toggleProductStatus = async (id, currentStatus) => {
//     try {
//       const productRef = doc(db, 'products', id);
//       const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
//       await updateDoc(productRef, { status: newStatus });
//       toast.success(
//         `Product ${
//           newStatus === 'active' ? 'Activated' : 'Deactivated'
//         } Successfully!`
//       );
//     } catch (error) {
//       console.error('Error toggling product status:', error);
//       toast.error('Failed to toggle product status');
//     }
//   };

//   return (
//     <Container>
//       <h2 style={{ margin: '30px', textAlign: 'center' }}>Product Details</h2>
//       {Loading ? (
//         <h4 className="py-5 text-center fw-bold">Loading...</h4>
//       ) : (
//         <>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Short Description</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Edit</TableCell>
//                 <TableCell>Delete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {pagedProducts.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <img
//                       src={item.image}
//                       style={{ height: '100px', width: '100px' }}
//                       alt={item.name}
//                     />
//                   </TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>₹{item.enterPrice}</TableCell>
//                   <TableCell>{item.description}</TableCell>
//                   <TableCell>{item.desc}</TableCell>
//                   <TableCell>{item.quantity}</TableCell>
//                   <TableCell>{item.category}</TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() => toggleProductStatus(item.id, item.status)}
//                       style={{
//                         backgroundColor:
//                           item.status === 'active' ? 'green' : '#C21807',
//                         color: 'white',
//                       }}
//                     >
//                       {item.status}
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <Link to={`/dashboard/edit/${item.id}`}>
//                       <IconButton>
//                         <EditIcon color="primary" />
//                       </IconButton>
//                     </Link>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       onClick={() => {
//                         deleteProduct(item.id);
//                       }}
//                     >
//                       <DeleteIcon color="error" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 20]}
//             component="div"
//             count={totalCount}
//             rowsPerPage={recordsPerPage}
//             page={currentPage}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             style={{ marginTop: '20px' }}
//           />
//         </>
//       )}
//     </Container>
//   );
// };

// export default AllProducts;
