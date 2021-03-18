import React from "react";
import {PassengerDetailsModal} from "./PassengerDetailsModal";

export const TicketComponent = ({id, deleteTicket, ticket}) =>
    <>
      <table className="table table-striped table-responsive-sm"
             style={{width: "100%"}}>
        <thead className="thead-dark">
        <tr>
          <th scope="col">Airlines</th>
          <th scope="col">Departure</th>
          <th scope="col">Departure Time</th>
          <th scope="col">Arrival</th>
          <th scope="col">Arrival Time</th>
          <th scope="col">Details</th>
          <th scope="col"
              className="delete"
              onClick={() => deleteTicket(ticket)}>x
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{ticket.carrier}</td>
          <td>{ticket.departure}, {ticket.depCity}</td>
          <td>{ticket.depTime}</td>
          <td>{ticket.arrival}, {ticket.arrivalCity}</td>
          <td>{ticket.arrivalTime}</td>
          <td>
            <PassengerDetailsModal
                index={id}
                passengers={ticket.passengers}/>
          </td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </>;
