import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewdonations.styles.css';

const ViewDonations = () => {
  const [donations, setDonations] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  const getDonations = (page) => {
    axios.get("/donations/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      params: { page }
    }).then(response => {
      setDonations(response.data.results)
      setTotalPages(response.data.totalPages)
    })
  }

  useEffect(() => {
    getDonations(1)
  }, [])

  // Pagination handling
  const handlePageChange = (pageNumber) => {
    getDonations(pageNumber)
  };

  return (
    <div className="manage-users">
      <div className="manage-users-header">
        <h2>Donaciones</h2>
      </div>

      {donations && donations.length > 0 ? (
        <div className="users-container">
          <ul className="users-grid">
            {donations.map((donation) => (
              <li key={donation.id} className="user-item">
                <div className="user-details">
                  <div className="user-name">
                    {donation.createdAt}
                  </div>
                  <div className="user-info">
                    Monto ${donation.amount}
                  </div>
                  <div className="user-info">
                    Usuario {donation.id_user ?  donation.id_user: "Anonimo"}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination-users">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontraron donaciones.</p>
      )}
    </div>
  );
};

export default ViewDonations;
