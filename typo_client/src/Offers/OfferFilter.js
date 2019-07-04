import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { MdSearch } from "react-icons/md";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

function OffersFilter(props){
  return (
    <React.Fragment>
      <InputGroup className="offers__search">
        <InputGroup.Prepend>
        <InputGroup.Text bsPrefix="input-group-text search-input" id="basic-addon1"><MdSearch/></InputGroup.Text>      
        </InputGroup.Prepend>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          bsPrefix="form-control search-input"
          value={props.searchInput}
          onChange={props.handleSearchChange}
        />
      </InputGroup>
      <InputGroup className="offers__range">
        <InputGroup.Prepend>
          <InputGroup.Text bsPrefix="input-group-text search-input" id="basic-addon2">Filter by price</InputGroup.Text>
          <InputGroup.Checkbox 
          checked={props.filterCheck} 
          onChange={props.handleCheckChange} 
          aria-label="Checkbox for enable price filter" />
        </InputGroup.Prepend>
        <div 
          className="search__range search-input">
          <InputRange
          maxValue={props.MAX_RANGE}
          minValue={props.MIN_RANGE}
          disabled={!props.filterCheck}
          value={props.priceRange}
          onChange={props.handleRangeChange}
          step={10}
          />
        </div>        
      </InputGroup>
    </React.Fragment>);
}

export default OffersFilter;