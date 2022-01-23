import React, { useState, useEffect } from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
const axios = require('axios');

export default function App() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue, setSortFilterValue] = useState("");
  const [operation, setOperation] = useState("");

  const sortOptions = ["name", "email", "phone", "address", "status"];

  useEffect(() => {
    loadUserData(0, 4, 0);
  }, []);

  const loadUserData = async (start, end, increase, optType = null, filterOrSortValue) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(`http://localhost:5000/users?q=${value}&_start=${start}&_end=${end}`)
          .then((res) => {
            setData(res.data);
            setcurrentPage(currentPage + increase);
          }).catch((error) => console.log(error));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(`http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
          .then((res) => {
            setData(res.data);
            setcurrentPage(currentPage + increase);
          })
          .catch((error) => console.log(error));
      case "filter":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(`http://localhost:5000/users?status=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
          .then((res) => {
            setData(res.data);
            setcurrentPage(currentPage + increase);
          })
          .catch((error) => console.log(error));
      default:
        return await axios
          .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
          .then((res) => {
            setData(res.data);
            setcurrentPage(currentPage + increase);
          })
          .catch((error) => console.log(error));
    }
  };

  const handleReset = () => {
    setValue("");
    setOperation("");
    setSortFilterValue("");
    setSortValue("");
    loadUserData(0, 4, 0);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    loadUserData(0, 4, 0, "search");
  }

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUserData(0, 4, 0, "sort", value);
  }

  const handleActiveFilter = async (value) => {
    setSortFilterValue(value);
    loadUserData(0, 4, 0, "filter", value);
  }

  const renderPagination = () => {
    if (data.length < 4 && currentPage === 0) {
      return null;
    }
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUserData(4, 8, 1, operation, sortFilterValue)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUserData((currentPage - 1) * 4, currentPage * 4, -  1, operation, sortFilterValue)}>Prev</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUserData((currentPage + 1) * 4, (currentPage + 2) * 4, 1, operation, sortFilterValue)}>Next</MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      )
    } else {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn onClick={() => loadUserData(4, 8, -1, operation)}>Prev</MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      )
    }
  }

  return (
    <MDBContainer>
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
          onChange={(event) => setValue(event.target.value)}
          className="form-control" placeholder='input something'></input>

        <MDBBtn type="submit" color='dark'>Search</MDBBtn>
        <MDBBtn className="mx-2" color='info' onClick={() => handleReset()}>Reset</MDBBtn>
      </form>
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
                  <th scope="col">Phone</th>
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
      {data.length > 0 && (
        <MDBRow>
          <MDBCol size="8">Sort By:
            <select
              onChange={handleSort}
              value={sortValue}
              style={{ width: '50%', borderRadius: '2px' }}
            >
              <option>Please select value</option>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>{item}</option>
              ))}
            </select>
          </MDBCol>
          <MDBCol size="4">Filter By Status:</MDBCol>
          <MDBBtnGroup style={{ marginTop: '-3%', width: '20%', marginLeft: '67%' }}>
            <MDBBtn color="success" onClick={() => handleActiveFilter("Active")}>Active</MDBBtn>
            <MDBBtn color="danger" onClick={() => handleActiveFilter("Inactive")}>Inactive</MDBBtn>
          </MDBBtnGroup>
        </MDBRow>
      )}
    </MDBContainer>
  );

}