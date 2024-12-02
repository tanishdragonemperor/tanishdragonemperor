// import React, { useState, useEffect } from "react";
// import "../styles/PhotoGallery.css";

// const PhotoGallery = ({ totalPhotos = 10 }) => {
//   const [photos, setPhotos] = useState([]);
//   const [photosPerPage, setPhotosPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

//   useEffect(() => {
//     console.log(totalPhotos)
//     const photoPaths = [];
//     for (let i = 1; i <= totalPhotos; i++) {
//       //WILL NEED TO BE UPDATED TO WORK WITH DATABASE. ONLY USING LOCAL FILES FOR NOW.
//       const photoPath = `/photos/photo${i}.png`
//       photoPaths.push(photoPath);
//       console.log("got here!" + photoPath);
//     }
//     console.log("End" + photoPaths);
//     setPhotos(photoPaths);
//   }, [totalPhotos]);

//   const handlePhotoClick = (index) => {
//     setSelectedPhotoIndex(index);
//   };

//   const handleNext = () => {
//     if (selectedPhotoIndex !== null && photos.length > 0) {
//       setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
//     }
//   };

//   const handlePrevious = () => {
//     if (selectedPhotoIndex !== null && photos.length > 0) {
//       setSelectedPhotoIndex(
//         (selectedPhotoIndex - 1 + photos.length) % photos.length
//       );
//     }
//   };

//   const handleClose = () => {
//     setSelectedPhotoIndex(null);
//   };

//   const handlePhotosPerPageChange = (e) => {
//     setPhotosPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const displayedPhotos = photos.slice(
//     (currentPage - 1) * photosPerPage,
//     currentPage * photosPerPage
//   );

//   const totalPages = Math.ceil(photos.length / photosPerPage);

//   return (
//     <div className="photo-gallery">
//       <div className="grid">
//         {displayedPhotos.map((photo, index) => (
//           <div
//             className="grid-card"
//             key={photo}
//             onClick={() =>
//               handlePhotoClick((currentPage - 1) * photosPerPage + index)
//             }
//           >
//             <img src={photo} alt={`Photo ${index + 1}`} className="grid-photo" />
//           </div>
//         ))}
//       </div>

//       <div className="pagination-controls">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Next
//         </button>
//         <div className="photos-per-page">
//           <label htmlFor="photos-per-page">Photos per page:</label>
//           <select
//             id="photos-per-page"
//             value={photosPerPage}
//             onChange={handlePhotosPerPageChange}
//           >
//             <option value={5}>5</option>
//           </select>
//         </div>
//       </div>

//       {selectedPhotoIndex !== null && (
//         <div className="overlay">
//           <div className="overlay-content">
//             <div className="nav-panel nav-left" onClick={handlePrevious}></div>
//             <img
//               src={photos[selectedPhotoIndex]}
//               alt={`Photo ${selectedPhotoIndex + 1}`}
//               className="large-photo"
//             />
//             <div className="nav-panel nav-right" onClick={handleNext}></div>
//           </div>
//           <div className="close-button-container">
//             <button className="close-button" onClick={handleClose}>
//               X
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PhotoGallery;







// import React from "react";
// import { Carousel } from "@material-tailwind/react";

// const PhotoGallery = () => {
//   // Example veterans data
//   const veterans = [
//     {
//       name: "John Doe",
//       image:
//         "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
//     },
//     {
//       name: "Jane Smith",
//       image:
//         "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//     },
//     {
//       name: "Mike Johnson",
//       image:
//         "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
//     },
//   ];

//   return (
//     <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
//       <Carousel
//         className="rounded-none h-screen w-full"
//         navigation={({ setActiveIndex, activeIndex, length }) => (
//           <div className="absolute bottom-6 left-2/4 z-50 flex -translate-x-2/4 gap-2">
//             {new Array(length).fill("").map((_, i) => (
//               <span
//                 key={i}
//                 className={`block h-2 cursor-pointer rounded-2xl transition-all ${
//                   activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
//                 }`}
//                 onClick={() => setActiveIndex(i)}
//               />
//             ))}
//           </div>
//         )}
//       >
//         {veterans.map((veteran, index) => (
//           <div
//             key={index}
//             className="relative h-screen w-full flex items-center justify-center"
//           >
//             <img
//               src={veteran.image}
//               alt={veteran.name}
//               className="absolute h-full w-full object-cover"
//             />
//             <div className="absolute bottom-10 text-center bg-black/60 py-4 px-8 rounded-lg">
//               <h2 className="text-3xl font-bold">{veteran.name}</h2>
//               <p className="text-lg mt-2">Dedicated Veteran of the Chapter</p>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default PhotoGallery;



import React, { useState } from "react";

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const veterans = [
    {
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      name: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      name: "Mike Johnson",
      image:
        "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? veterans.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === veterans.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (

    <div className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      
      {veterans.map((veteran, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ${
            index === currentIndex
              ? "translate-x-0 opacity-100 z-10"
              : index < currentIndex
              ? "-translate-x-full opacity-0 z-0"
              : "translate-x-full opacity-0 z-0"
          }`}
        >
          <img
            src={veteran.image}
            alt={veteran.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/60 px-8 py-4 rounded-lg">
            <h2 className="text-3xl font-bold">{veteran.name}</h2>
            <p className="text-lg mt-2">Dedicated Veteran of the Chapter</p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute left-5 z-20 bg-black/60 hover:bg-black px-4 py-2 rounded-full text-white text-lg transition-transform hover:scale-110"
        onClick={handlePrev}
      >
        ◀
      </button>
      <button
        className="absolute right-5 z-20 bg-black/60 hover:bg-black px-4 py-2 rounded-full text-white text-lg transition-transform hover:scale-110"
        onClick={handleNext}
      >
        ▶
      </button>
    </div>
  );
};

export default PhotoGallery;
