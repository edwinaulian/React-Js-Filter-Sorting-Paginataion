import React from 'react';
import { MDBBtn } from "mdb-react-ui-kit";

export default function Search({ value, handleValueInput, handleSearch, handleReset }) {
    return (
        <form style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
        }}
            className="d-flex input-group w-auto"
            onSubmit={handleSearch}
        >
            <input type="text"
                value={value}
                onChange={handleValueInput}
                className="form-control" placeholder='input something'></input>

            <MDBBtn type="submit" color='dark'>Search</MDBBtn>
            <MDBBtn className="mx-2" color='info' onClick={handleReset}>Reset</MDBBtn>
        </form>
    )
}