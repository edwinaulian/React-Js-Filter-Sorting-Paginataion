import React, { useState, useEffect } from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import Search from './Search';
import Table from './Table';
import SortandFilter from './SortandFilter';

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
    const loadUserDataInit = async (start, end, increase) => {
      return await axios
        .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
        .then((res) => {
          setData(res.data);
          setcurrentPage(c => c + increase);
        })
        .catch((error) => console.log(error));
    }
    loadUserDataInit(0, 4, 0);
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

  const handleValueInput = async (event) => {
    setValue(event.target.value)
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
      <Search value={value} handleValueInput={handleValueInput} handleSearch={handleSearch} handleReset={handleReset}></Search>
      <Table data={data} renderPagination={renderPagination}></Table>
      {data.length > 0 && (
        <SortandFilter sortValue={sortValue} sortOptions={sortOptions} handleSort={handleSort} handleActiveFilter={handleActiveFilter}></SortandFilter>
      )}
    </MDBContainer>
  );

}