import React, { useState, useEffect } from "react";
import "../styles/PhotoGallery.css";

const PhotoGallery = ({ totalPhotos = 10 }) => {
  const [photos, setPhotos] = useState([]);
  const [photosPerPage, setPhotosPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  useEffect(() => {
    console.log(totalPhotos)
    const photoPaths = [];
    for (let i = 1; i <= totalPhotos; i++) {
      //WILL NEED TO BE UPDATED TO WORK WITH DATABASE. ONLY USING LOCAL FILES FOR NOW.
      const photoPath = `/photos/photo${i}.png`
      photoPaths.push(photoPath);
      console.log("got here!" + photoPath);
    }
    console.log("End" + photoPaths);
    setPhotos(photoPaths);
  }, [totalPhotos]);

  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null && photos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const handlePrevious = () => {
    if (selectedPhotoIndex !== null && photos.length > 0) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + photos.length) % photos.length
      );
    }
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

  const handlePhotosPerPageChange = (e) => {
    setPhotosPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const displayedPhotos = photos.slice(
    (currentPage - 1) * photosPerPage,
    currentPage * photosPerPage
  );

  const totalPages = Math.ceil(photos.length / photosPerPage);

  return (
    <div className="photo-gallery">
      <div className="grid">
        {displayedPhotos.map((photo, index) => (
          <div
            className="grid-card"
            key={photo}
            onClick={() =>
              handlePhotoClick((currentPage - 1) * photosPerPage + index)
            }
          >
            <img src={photo} alt={`Photo ${index + 1}`} className="grid-photo" />
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
        <div className="photos-per-page">
          <label htmlFor="photos-per-page">Photos per page:</label>
          <select
            id="photos-per-page"
            value={photosPerPage}
            onChange={handlePhotosPerPageChange}
          >
            <option value={5}>5</option>
          </select>
        </div>
      </div>

      {selectedPhotoIndex !== null && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="nav-panel nav-left" onClick={handlePrevious}></div>
            <img
              src={photos[selectedPhotoIndex]}
              alt={`Photo ${selectedPhotoIndex + 1}`}
              className="large-photo"
            />
            <div className="nav-panel nav-right" onClick={handleNext}></div>
          </div>
          <div className="close-button-container">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;