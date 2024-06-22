// src/Components/Home.jsx
import React, { useState } from 'react';
import { useCardContext } from '../CardContext';
import { FaTimes } from 'react-icons/fa';
import FeedbackForm from './FeedbackForm';

const Home = () => {
  const { state, dispatch } = useCardContext();
  const { data, loading, viewMode } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const cardsPerPage = 6;

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_CARD', payload: id });
  };

  const toggleView = () => {
    dispatch({ type: 'TOGGLE_VIEW' });
  };

  const toggleFeedbackForm = () => {
    setIsFeedbackFormOpen(!isFeedbackFormOpen);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: "6px", justifyContent: "center", display: "flex" }}>
      <div
        style={{
          height: "1000px",
          width: "400px",
          backgroundColor: "gray",
          borderRadius: "10px",
        }}
      >
        <div style={{ paddingTop: "30px" }}>
          <div
            style={{
              marginLeft: "30px",
              backgroundColor: "white",
              width: "300px",
              height: "70px",
              margin: "8px",
              borderRadius: "5px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "30px",
                  fontWeight: "600px",
                  marginLeft: "90px",
                }}
              >
                Hii Reader
              </span>
              <br />
              <span style={{ marginLeft: "90px" }}>Here's your News!</span>
            </div>
          </div>
          <div
            style={{
              marginLeft: "30px",
              backgroundColor: "white",
              width: "300px",
              height: "130px",
              margin: "8px",
              borderRadius: "10px",
              marginTop: "60px",
            }}
          >
            <div style={{marginLeft:"75px"}}>
              <span style={{ fontSize: "30px", fontWeight: "600px",marginTop:"10px"}}>
                View Toggle
              </span>
              <br />
              <button onClick={toggleView} style={{ marginTop: "10px",marginLeft:"30px" }}>
                Toggle View
              </button>
            </div>
          </div>
          <div
            style={{
              marginLeft: "30px",
              backgroundColor: "white",
              width: "300px",
              height: "130px",
              margin: "8px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <div style={{marginLeft:"30px",marginTop:"2 0px"}}>
              <span style={{ fontSize: "30px", fontWeight: "800px",marginTop:"20px"}}>
                We are Listening
              </span>
              <br />
              <button onClick={toggleFeedbackForm} style={{ marginTop: "10px",height:"50px",width:"190px",fontWeight:"700px",backgroundColor:"lightgreen",marginLeft:"10px"}}>
                We're Listening!
                
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "20px", display: viewMode === 'grid' ? 'grid' : 'block', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {currentCards.map((value, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              margin: viewMode === 'list' ? "16px" : "0",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                flexGrow: 1,
                margin: viewMode === 'grid' ? "16px" : "0",
              }}
            >
              <div style={{ color: "Black", fontWeight: "bold" }}>
                User ID: {value.userId}
              </div>
              <div style={{ color: "Black", fontWeight: "bold" }}>
                ID: {value.id}
              </div>
              <div
                style={{ color: "Black", fontSize: "20px", marginTop: "8px" }}
              >
                {value.title}
              </div>
              <div style={{ color: "Black", marginTop: "8px" }}>
                {value.body}
              </div>
            </div>
            <FaTimes
              style={{
                marginLeft: "8px",
                cursor: "pointer",
                color: "red",
                fontSize: "24px",
              }}
              onClick={() => handleDelete(value.id)}
            />
          </div>
        ))}

        {/* Pagination controls */}
        <div style={{ marginTop: "20px", textAlign: "center", gridColumn: viewMode === 'grid' ? 'span 3' : 'auto' }}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {isFeedbackFormOpen && <FeedbackForm onClose={toggleFeedbackForm} />}
    </div>
  );
};

export default Home;
