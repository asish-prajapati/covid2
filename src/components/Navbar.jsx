import React from "react";

import { Container } from "react-bootstrap";
import Content from "./Content";

import {
  Navbar as NavB,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Navbar(props) {
  function changeHandler(event) {
    props.setInputVal(event.target.value);
  }

  return (
    <>
      <div>
        <NavB bg="light" variant="light">
          <NavB.Brand>
            <h3 className="ml-5">Covid Data Search</h3>
          </NavB.Brand>

          <Form inline className="ml-auto" onSubmit={props.submitHandler}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={props.inputVal}
              onChange={changeHandler}
              style={{ textTransform: "capitalize" }}
            />
            <Button type="submit" variant="outline-primary">
              Search
            </Button>
          </Form>
        </NavB>
      </div>
    </>
  );
}

export default Navbar;
