import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { moveToTwo } from '../Navbar/NavbarSlice';
import { visibleDetails } from '../ProductsDetails/ProductDetailsSlice';
import { hiddenSingleProduct } from './SingleProductSlice.js';
import { addToCart } from '../Cart/CartSlice';

const SingleProduct = ({
  width = 400,
  height = 400,
  miniSize = 100,
  zoom = 2,
  pageMaxWidth = 1200,
  pageMargin = 100
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedProduct = useSelector((state) => state.singleProduct.selectedProduct);
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: width / 2, y: height / 2 });
  const [isHovering, setIsHovering] = useState(false);

  // Aggiorna la posizione del mouse
  const handleMouseMove = e => {
    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(0, Math.min(x, width));
    y = Math.max(0, Math.min(y, height));
    setCoords({ x, y });
  };

  const handleBackToProducts = () => {
    dispatch(hiddenSingleProduct());
    dispatch(visibleDetails());
    dispatch(moveToTwo());
    navigate('/Prodotti');
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
  };

  // Calcola la dimensione e la posizione del rettangolo sulla miniatura
  const rectW = width / zoom * (miniSize / width);
  const rectH = height / zoom * (miniSize / height);
  const rectLeft = (coords.x / width) * miniSize - rectW / 2;
  const rectTop = (coords.y / height) * miniSize - rectH / 2;

  if (!selectedProduct) return <div>Caricamento...</div>;

  // Sidebar width e padding
  const sidebarWidth = Math.round(window.innerWidth / 3);
  const sidebarPadding = sidebarWidth / 4;

  return (
    <>
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs p-4 max-w-[1200px] mx-auto">
        <ul>
          <li><a onClick={handleBackToProducts}>Prodotti</a></li>
          <li>{selectedProduct.category}</li>
          <li>{selectedProduct.name}</li>
        </ul>
      </div>

      <div
        style={{
          maxWidth: pageMaxWidth,
          margin: `0 auto`,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '2rem 0',
        }}
      >
        {/* Immagine grande - manteniamo il codice esistente */}
        <div
          style={{
            flex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: pageMargin,
            boxSizing: 'border-box',
          }}
        >
          <div
            ref={containerRef}
            style={{
              width,
              height,
              backgroundImage: `url(${selectedProduct.image})`,
              backgroundSize: isHovering
                ? `${width * zoom}px ${height * zoom}px`
                : `${width}px ${height}px`,
              backgroundPosition: isHovering
                ? `${((coords.x / width) * 100)}% ${((coords.y / height) * 100)}%`
                : 'center',
              border: '1px solid #ccc',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background-size 0.2s, background-position 0.2s',
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Miniatura in basso a destra */}
            {isHovering && (
              <div
                style={{
                  width: miniSize,
                  height: miniSize,
                  backgroundImage: `url(${selectedProduct.image})`,
                  backgroundSize: `${miniSize}px ${miniSize}px`,
                  backgroundPosition: 'center',
                  border: '1px solid #2196f3',
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  backgroundColor: '#fff',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: rectLeft,
                    top: rectTop,
                    width: rectW,
                    height: rectH,
                    border: '2px solid #f50057',
                    background: 'rgba(245,0,87,0.15)',
                    pointerEvents: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar con dettagli prodotto migliorati */}
        <div
          style={{
            flex: 1,
            background: '#fff',
            padding: '2rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginRight: pageMargin,
          }}
        >
          {/* Header prodotto */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="badge badge-outline">{selectedProduct.brand}</div>
              {selectedProduct.promo && (
                <div className="badge badge-secondary">Promo</div>
              )}
            </div>
            <p className="text-2xl font-semibold text-primary">
              €{selectedProduct.price.toFixed(2)}
            </p>
          </div>

          {/* Descrizione */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Descrizione</h3>
            <p className="text-gray-600">{selectedProduct.description}</p>
          </div>

          {/* Specifiche */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Specifiche</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Categoria:</span>
                <span className="ml-2 capitalize">{selectedProduct.category}</span>
              </div>
              <div>
                <span className="font-medium">Marca:</span>
                <span className="ml-2">{selectedProduct.brand}</span>
              </div>
              {selectedProduct.category === 'racchetta' && (
                <>
                  <div>
                    <span className="font-medium">Peso:</span>
                    <span className="ml-2">{selectedProduct.peso}g</span>
                  </div>
                  <div>
                    <span className="font-medium">Bilanciamento:</span>
                    <span className="ml-2 capitalize">{selectedProduct.bilancio}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Azioni */}
          <div className="mt-auto">
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1"
              >
                Aggiungi al Carrello
              </button>
              <button
                onClick={handleBackToProducts}
                className="btn btn-outline"
              >
                Torna ai Prodotti
              </button>
            </div>

            {/* Info spedizione */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
                <span>Spedizione gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Reso gratuito entro 30 giorni</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;