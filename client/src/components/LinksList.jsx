import React from 'react';
import { Link } from 'react-router-dom';

const LinksList = ({links}) => {
  if (!links.length) {
    return <p className="center">There are no links</p>
  }

  return(
    <table>
      <thead>
        <tr>
            <th>№</th>
            <th>Shortened</th>
            <th>Origin</th>
            <th>Date</th>
            <th>Open</th>
        </tr>
      </thead>

      <tbody>
        { 
          links.map((link, index) => {
            return (
              <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.to}</td>
                <td>{link.from}</td>
                <td>{new Date(link.date).toLocaleDateString()}</td>
                <td><Link to={`/details/${link._id}`} >Open</Link></td>
              </tr>
            )
          }) 
        }
        
      </tbody>
    </table>
  );
};

export default LinksList;