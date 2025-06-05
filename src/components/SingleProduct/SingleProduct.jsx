import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { moveToTwo } from '../Navbar/NavbarSlice';
import { visibleDetails } from '../ProductsDetails/ProductDetailsSlice';
import { hiddenSingleProduct, setSelectedProduct } from './SingleProductSlice.js';
import { addToCart } from '../Cart/CartSlice';
import './SingleProduct.css';
import { products } from '../../data/products';
import Categories from '../Categorie/Categories';
import Footer from '../Footer/Footer';

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
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);

  // Gestione responsive del numero di elementi visibili
  useEffect(() => {
    const handleResize = () => {
      // Se la larghezza è maggiore di 768px (orizzontale), mostra 2 elementi
      // altrimenti (verticale) mostra 1 elemento
      setVisibleCount(window.innerWidth > 768 ? 2 : 1);
    };

    // Imposta il valore iniziale
    handleResize();

    // Aggiungi l'event listener per il resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const productToAdd = {
      ...selectedProduct,
      quantity: quantity
    };
    dispatch(addToCart(productToAdd));
  };

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, Math.min(9, quantity + change)));
  };

  // Calcola la dimensione e la posizione del rettangolo sulla miniatura
  const rectW = width / zoom * (miniSize / width);
  const rectH = height / zoom * (miniSize / height);
  const rectLeft = (coords.x / width) * miniSize - rectW / 2;
  const rectTop = (coords.y / height) * miniSize - rectH / 2;

  // Funzione per ottenere le prime 10 parole
  const getFirst10Words = (text) => {
    return text.split(' ').slice(0, 10).join(' ') + '...';
  };

  const handleBuyNow = (product) => {
    dispatch(setSelectedProduct(product));
    // Forza il re-render scrollando in cima alla pagina
    window.scrollTo(0, 0);
  };

  if (!selectedProduct) return <div>Caricamento...</div>;

  // Sidebar width e padding
  const sidebarWidth = Math.round(window.innerWidth / 3);
  const sidebarPadding = sidebarWidth / 4;

  return (
    <>
      <div className="breadcrumbs-container max-w-[1200px] mx-auto p-4 mt-5">
        <ul className="text-sm breadcrumbs inline-flex space-x-2">
          <li><a onClick={handleBackToProducts} className="text-white hover:text-gray-800">Prodotti</a></li>
          <li className="text-white">{selectedProduct.category}</li>
          <li className="text-white">{selectedProduct.name}</li>
        </ul>
      </div>

      <div className="product-container">
        {/* Main content area - scrollable */}
        <div className="main-content">
          {/* Product Title Header */}
          <div className="product-title-header">
            <span className="product-brand">{selectedProduct.brand}</span>
            <h1>{selectedProduct.name}</h1>
          </div>

          {/* Immagine e caratteristiche */}
          <div className="product-image-section" style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%'
          }}>
            {/* Contenitore immagine con stile consistente */}
            <div className="product-section-container" style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
              width: '100%',
              maxWidth: '100%',
              borderRadius: '12px'
            }}>
              <div
                ref={containerRef}
                style={{
                  width: Math.min(width, window.innerWidth - 40),
                  height: Math.min(height, window.innerWidth - 40),
                  backgroundImage: `url(${selectedProduct.image})`,
                  backgroundSize: isHovering
                    ? `${width * zoom}px ${height * zoom}px`
                    : 'contain',
                  backgroundPosition: isHovering
                    ? `${((coords.x / width) * 100)}% ${((coords.y / height) * 100)}%`
                    : 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background-size 0.2s, background-position 0.2s',
                  borderRadius: '12px'
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsHovering(false)}
              >
                {isHovering && (
                  <div
                    style={{
                      width: miniSize,
                      height: miniSize,
                      backgroundImage: `url(${selectedProduct.image})`,
                      backgroundSize: `${miniSize}px ${miniSize}px`,
                      backgroundPosition: 'center',
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

            {/* Sezione caratteristiche per racchette */}
            {selectedProduct.category === 'racchetta' && (
              <div className="product-section-container" style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '1rem',
                marginTop: '0',
                maxWidth: '100%'
              }}>
                <div style={{
                  width: '100%',
                  borderRadius: '12px',
                  padding: '1rem',
                  maxWidth: '100%',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}>
                  <h2 style={{
                    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    color: '#ffffff',
                    textAlign: 'center',
                    letterSpacing: '-0.025em',
                    borderBottom: '2px solid #ff6347',
                    paddingBottom: '0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    Caratteristiche Tecniche
                  </h2>
                  
                  <div className="technical-specs-grid">
                    {/* Peso */}
                    <div className="tech-spec-item">
                      <div className="tech-spec-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <div className="tech-spec-content">
                        <div className="tech-spec-label">Peso</div>
                        <div className="tech-spec-value">{selectedProduct.peso}g</div>
                      </div>
                    </div>

                    {/* Bilanciamento */}
                    <div className="tech-spec-item">
                      <div className="tech-spec-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 2v20M2 12h20"/>
                        </svg>
                      </div>
                      <div className="tech-spec-content">
                        <div className="tech-spec-label">Bilanciamento</div>
                        <div className="tech-spec-value">
                          {selectedProduct.bilancio === 'piattocorde' ? 'Piatto Corde' :
                           selectedProduct.bilancio === 'manico' ? 'Manico' : 'Bilanciato'}
                        </div>
                      </div>
                    </div>

                    {/* Piatto Corde */}
                    <div className="tech-spec-item">
                      <div className="tech-spec-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <path d="M3 9h18M3 15h18"/>
                        </svg>
                      </div>
                      <div className="tech-spec-content">
                        <div className="tech-spec-label">Dimensione Piatto</div>
                        <div className="tech-spec-value">645 cm²</div>
                      </div>
                    </div>

                    {/* Materiale */}
                    <div className="tech-spec-item">
                      <div className="tech-spec-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        </svg>
                      </div>
                      <div className="tech-spec-content">
                        <div className="tech-spec-label">Materiale</div>
                        <div className="tech-spec-value">Grafite</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sezione descrizione - per tutte le categorie */}
            <div className="product-section-container" style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '0',
              width: '100%',
              marginBottom: '0',
              maxWidth: '100%'
            }}>
              <div style={{
                width: '100%',
                borderRadius: '12px',
                padding: '1rem',
                maxWidth: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#ffffff',
                  textAlign: 'center',
                  letterSpacing: '-0.025em',
                  borderBottom: '2px solid #ff6347',
                  paddingBottom: '0.75rem',
                  textTransform: 'uppercase'
                }}>
                  Descrizione
                </h2>
                
                <div style={{
                  width: '100%',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  lineHeight: '1.75',
                  color: '#ffffff',
                  maxWidth: '100%'
                }}>
                  {isDescriptionExpanded ? (
                    <>
                      <p style={{
                        marginBottom: '1.5rem',
                        textAlign: 'justify',
                        wordBreak: 'break-word'
                      }}>
                        {selectedProduct.description}
                      </p>
                      <button 
                        onClick={() => setIsDescriptionExpanded(false)}
                        style={{
                          color: '#ff6347',
                          fontWeight: '500',
                          background: 'none',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          display: 'block',
                          margin: '0 auto',
                          transition: 'color 0.2s',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >
                        Mostra meno
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{
                        marginBottom: '1.5rem',
                        textAlign: 'justify',
                        wordBreak: 'break-word'
                      }}>
                        {getFirst10Words(selectedProduct.description)}
                      </p>
                      <button 
                        onClick={() => setIsDescriptionExpanded(true)}
                        style={{
                          color: '#ff6347',
                          fontWeight: '500',
                          background: 'none',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          display: 'block',
                          margin: '0 auto',
                          transition: 'color 0.2s',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >
                        Mostra tutto
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sezione Prodotti Simili - per tutte le categorie */}
          <div className="product-section-container similar-products-section" style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '1rem',
            marginBottom: '0',
            maxWidth: '100%'
          }}>
            <div style={{
              width: '100%',
              borderRadius: '12px',
              padding: '1rem',
              maxWidth: '100%',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#ffffff',
                textAlign: 'center',
                letterSpacing: '-0.025em',
                borderBottom: '2px solid #ff6347',
                paddingBottom: '0.75rem',
                textTransform: 'uppercase'
              }}>
                Prodotti Simili
              </h2>

              <div className="similar-products-container" style={{
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden',
                border: 'none',
              }}>
                <Categories
                  prodotti={products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
                  category={selectedProduct.category}
                  useCarousel={true}
                  visibleCount={1}
                  responsive={false}
                  onBuyNow={handleBuyNow}
                  limit={4}
                  className="glass bg-none"
                />
              </div>
            </div>
          </div>
        </div>


          {/* Cart heading for mobile */}
          <div className="cart-heading-mobile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h3>Aggiungi al Carrello</h3>
          </div>

        {/* Sidebar - fixed */}
        <div className="product-sidebar">
          {/* Header prodotto */}
          <div className="product-title-container">
            <span className="product-brand d-block">{selectedProduct.brand}</span>
            <span className="product-title text-left">{selectedProduct.name}</span>
            <p className="article-no text-left">Art: <span className="js-article-no">{selectedProduct.id}</span></p>
          </div>

          {/* Prezzo e sconto */}
          <div className="price price-container">
            <div className="sales-and-prices-container">
              {selectedProduct.promo && (
                <span className="sales-container">
                  <span className="strike-through old-price list">
                    <span className="value">€{(selectedProduct.price + 20).toFixed(2)}</span>
                  </span>
                  <span> -24%</span>
                </span>
              )}
              <span className="value real-price">€{selectedProduct.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Selettore manico */}
          {selectedProduct.category === 'racchetta' && (
            <div className="variations-selectors-container">
              <h2 className='text-2xl text-white'>Bilanciamento:</h2>
              <label className="headline-small size-headline text-white">{selectedProduct.bilancio === 'piattocorde' ? 'Piatto Corde' :
              selectedProduct.bilancio === 'manico' ? 'Manico' : 'Bilanciato'}</label>
              <div className="size-container">
              </div>
              <div className="msg-freshdesk">
                <span>Incertezza sulla forza della presa? <a href="#">Consulente per la presa</a></span>
              </div>
            </div>
          )}

          {/* Azioni racchetta */}
          {selectedProduct.category === 'racchetta' && (
            <div className="racket-actions">
              <div className="row my-2">
                <div className="col-12">
                  <a href="#">
                    <div className="test-now p-3 d-flex align-items-center justify-content-center">
                      <span className="pl-2">Desideri prima provare questa racchetta? Fai clic qui</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-12">
                  <button className="string-now p-3 d-flex align-items-center justify-content-center">
                    <span className="pl-2">Incordare adesso</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quantità e aggiungi al carrello */}
          <div className="fixed-height-xs-atc">
            <div className="cart-actions-container">
              <div className="quantity-wrapper">
                <div className="quantity-container">
                  <button 
                    className="btn-quantity circle-minus" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    className="quantity-select"
                    type="number"
                    min="1"
                    max="9"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= 9) {
                        setQuantity(val);
                      }
                    }}
                  />
                  <button 
                    className="btn-quantity circle-plus" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 9}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                className="add-to-cart btn btn-tertiary btn-lg"
                onClick={() => handleAddToCart()}
              >
                <i className="icon icon-basket"></i>
                <span className="add-to-cart-text">Aggiungi al carrello</span>
              </button>
            </div>
          </div>

          {/* Lista dei desideri */}
          <div className="product-detail-wishlist row ml-0 mb-3">
            <button className="col-auto add-to-wishlist product-icon">❤</button>
            <span className="col-auto my-auto text-white">Aggiungi alla lista dei desideri</span>
          </div>

          {/* Info spedizione */}
          <div className="shipping-info-container">
            <div className="shipping-info">
              <span className="sh-text-info"><span className="shipping-checkmark">✓</span> 1-3 Giorni lavorativi</span>
            </div>
            <div className="shipping-info">
              <span className="sh-text-info"><span className="shipping-checkmark">✓</span> Spedizione gratuita a partire da 59,00 € di valore dell'ordine</span>
            </div>
            <div className="shipping-info">
              <span className="sh-text-info"><span className="shipping-checkmark">✓</span> Acquisto su conto corrente</span>
            </div>
            <div className="shipping-info">
              <span className="sh-text-info"><span className="shipping-checkmark">✓</span> 30 giorni di diritto di recesso</span>
            </div>
          </div>

          {/* Callout promo */}
          <div className="callout center mt-4">
            <div className="promo-box">
              <span>10% di sconto se compri in combinazione racchetta e corda<br/>Incordatura gratuita</span>
            </div>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </>
  );
};

export default SingleProduct;