import React from "react";
import { Container, Row, Col } from "reactstrap";
import UseGetData from "../User/helpers/UseGetData"
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@material-ui/core";

const TotalSales = () => {
  const { data: userData, loading } = UseGetData("totalprice");

  return (
      <Container>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <h5 className="pt-5 fw-bold">Loading.....</h5>
                ) : (
                  userData?.map((totalprice) => (
                    <TableRow key={totalprice.id} >
                      <TableCell>{totalprice.totalPrice}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            </Container>
  );
};

export default TotalSales;
