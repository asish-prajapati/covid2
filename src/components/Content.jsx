import React from "react";
import { Container, Spinner } from "react-bootstrap";

function Content(props) {
  return (
    <div
      style={{
        backgroundColor: "#dfd8d6",
        height: "100vh",
        overflow: "auto",
      }}
      className="py-3"
    >
      <Container>
        {props.loading && (
          <div className="my-4">
            <Spinner animation="grow" />
          </div>
        )}
        {props.error && <h3> {props.error}</h3>}
        {props.tableData.length > 0 ? (
          <table className="table" style={{ backgroundColor: "white" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">State</th>
                <th scope="col">Confirmed Cases</th>
                <th scope="col">Active Cases</th>
                <th scope="col">Recovered</th>
                <th scope="col">Recovery Rate</th>
                <th scope="col">Death</th>
              </tr>
            </thead>
            <tbody>
              {props.tableData.map((item, index) => (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.province}</td>
                  <td>{item.confirmed}</td>
                  <td>{item.active}</td>
                  <td>{item.recovered}</td>
                  <td>{item.Recovery_Proporation}</td>
                  <td>{item.deaths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3> {props.initialMsg}</h3>
        )}
      </Container>
    </div>
  );
}

export default Content;
