import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from "mdb-react-ui-kit";

export default function Table( {data, renderPagination} ) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h3 className="text-center mb-0">List Users</h3>
            <MDBRow>
                <MDBCol size="12">
                    <MDBTable>
                        <MDBTableHead dark>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone.</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                            </tr>
                        </MDBTableHead>
                        {data.length === 0 ? (
                            <MDBTableBody className="align-center mb-0">
                                <tr>
                                    <td colSpan={8} className="text-center mb-0">No Data Found</td>
                                </tr>
                            </MDBTableBody>
                        ) : (data.map((item, index) => (<MDBTableBody key={index}>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.status}</td>
                            </tr>
                        </MDBTableBody>)))}
                    </MDBTable>
                </MDBCol>
            </MDBRow>
            <div style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "250px",
                alignContent: "center",
            }}>
                {renderPagination()}
            </div>
        </div>
    )

}