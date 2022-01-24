import React from "react";
import { MDBRow, MDBCol, MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";

export default function SortandFilter({ sortValue, sortOptions, handleSort, handleActiveFilter }) {
    return (
        <MDBRow>
            {/* Sort data By Field in table */}
            <MDBCol size="8">Sort By:
                <select onChange={handleSort} value={sortValue} style={{ width: '50%', borderRadius: '2px' }}>
                    <option>Please select value</option>
                    {sortOptions.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))}
                </select>
            </MDBCol>
            {/* End Sort data By Field in table */}

            {/* Filter data By Status */}
            <MDBCol size="4">Filter By Status:</MDBCol>
            <MDBBtnGroup style={{ marginTop: '-3%', width: '20%', marginLeft: '67%' }}>
                <MDBBtn color="success" onClick={() => handleActiveFilter("Active")}>Active</MDBBtn>
                <MDBBtn color="danger" onClick={() => handleActiveFilter("Inactive")}>Inactive</MDBBtn>
            </MDBBtnGroup>
            {/* End Filter data By Status */}
        </MDBRow>
    )
}