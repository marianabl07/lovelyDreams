import React, {useState} from "react";
import '../styles/styleHome.css'; //Importar los estilos CSS
import 'bootstrap';
import ref2057 from '../Image/IMG_20230917_175317.jpg';
import ref2155 from '../Image/IMG_20230917_175502.jpg';
import ref2058 from '../Image/IMG_20230917_180125.jpg';
import ref2255 from '../Image/IMG_20230917_175953.jpg';
import ref2256 from '../Image/IMG_20230917_180434.jpg';
import ref2156 from '../Image/IMG_20230917_180619.jpg';
import ref2059 from '../Image/IMG_20230917_180302.jpg';
import ref2257 from '../Image/IMG_20230917_175752.jpg';
import LovelyDreamsLogo from '../Icons/Lovely Dreams Logo.png'

const HomePage = () => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);

    const productList = [
        {
            name: 'Ref. 2057',
            price: 35000,
            image: ref2057,
            description: 'cool nightgown made of cotton'
        },
        {
            name: 'Ref. 2155',
            price: 39000,
            image: ref2155,
            description: 'cool short pajama made of cotton'
        },
        {
            name: 'Ref. 2058',
            price: 28000,
            image: ref2058,
            description: 'cool nightgown made of cotton'
        },
        {
            name: 'Ref. 2255',
            price: 40000,
            image: ref2255,
            description: 'cool short pajama made of cotton'
        },
        {
            name: 'Ref. 2256',
            price: 45000,
            image: ref2256,
            description: 'cool short pajama made of cotton'
        },
        {
            name: 'Ref. 2156',
            price: 40000,
            image: ref2156,
            description: 'cool short pajama made of cotton'
        },
        {
            name: 'Ref. 2059',
            price: 40000,
            image: ref2059,
            description: 'cool nightgown made of cotton'
        },
        {
            name: 'Ref. 2257',
            price: 40000,
            image: ref2257,
            description: 'cool short pajama made of cotton'
        }
    ];

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        setCartCount(updatedCart.length);
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        setCartCount(updatedCart.length);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    // Función para finalizar la compra y mostrar un modal de compra exitosa
    const finalizePurchase = () => {
        // Puedes personalizar el mensaje de compra exitosa según tus necesidades.
        // Este es un ejemplo básico que muestra un modal de Bootstrap.
        setPurchaseSuccess(true);
    
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="menu">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#!">
                        <img src={LovelyDreamsLogo} alt="logo" width="70" height="70" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#!">All Products</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                    <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                                </ul>
                            </li>
                        </ul>
                </div>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                      <a className="navbar-brand"></a>
                      <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                      </form>
                    </div>
                  </nav>
                 </div> 
                   <form class="d-flex">
                    <button class="btn btn-outline-danger" type="submit">
                        <i class="bi bi-cart-fill me-1"></i>
                        Cart
                        <span id="cart-count" class="badge bg-danger text-white ms-1 rounded-pill">0</span>
                    </button>
                </form>
                {/* Carrito de compra */}
            <section className="max-height-350 cart-container">
                <div className="max-height-350 py-5" id="cartPurchase">
                    <h2>Cart</h2>
                    <ul id="cart-list">
                        {cart.length === 0 ? (
                            <li>Cart is empty</li>
                        ) : (
                            cart.map((product, index) => (
                                <li key={index}>
                                    <img src={product.image} alt={product.name} width="50" height="50" />
                                    <span>{product.name}</span>
                                    <span className="cart-price">${product.price.toFixed(2)}</span>
                                    <button className="remove-from-cart btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
                                </li>
                            ))
                        )}
                    </ul>
                    <div id="total-price">Total: ${calculateTotalPrice().toFixed(2)}</div>
                    <button className="btn-pay" onClick={finalizePurchase}>Buy <i className="fa-solid fa-bag-shopping"></i></button>
                </div>
            </section>
           <div>
           <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-regular fa-user" style="color: #a6075c;"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#!">Account</a></li>
                            <li><a class="dropdown-item" href="#!">Cart</a></li>
                            <li><a class="dropdown-item" href="#!">Shopping history</a></li>
                            <li><a class="dropdown-item" href="#!">Settings</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#!">Logout</a></li>
                        </ul>
                    </li>
                </ul>
           </div>
           
            </nav>
          


            {/* Encabezado */}
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">lovely dreams</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Sweet dreams guaranteed</p>
                    </div>
                </div>
            </header>

            {/* Lista de productos */}
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center card-item" id="row">
                        {productList.map((product, index) => (
                            <div key={index} className="col mb-5 products">
                                <div className="card h-100">
                                    <img src={product.image} alt={product.name} className="card-img-top" />
                                    <div className="card-body p-4">
                                        <h5 className="fw-bolder">Sale item</h5>
                                        <h6 className="card-title">{product.name}</h6>
                                        <h6 className="card-description">Description: {product.description}</h6>
                                        <span className="card-price">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <button className="btn btn-outline-danger mt-auto" onClick={() => addToCart(product)}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            

            {/* Pie de página */}
            <footer id="footer" className="w-100 d-flex align-items justify-content-center flex-wrap">
                <p className="fs-5 px-3 pt-3">lovely dreams &copy; All Rights Reserved 2023</p>
                <div id="icons">
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-twitter-x"></i></a>
                    <a href="#"><i className="bi bi-whatsapp"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                </div>
                <div className="fs-5 px-3 pt-3" id="contactUs">Contact us (+57) 311-404-1549</div>
            </footer>

            {/* Modal de compra exitosa */}
            <div className={`modal fade ${purchaseSuccess ? 'show' : ''}`} id="purchaseSuccessModal" tabIndex="-1" aria-labelledby="purchaseSuccessModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="purchaseSuccessModalLabel">Compra Exitosa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setPurchaseSuccess(false)}></button>
                        </div>
                        <div className="modal-body">
                            ¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => setPurchaseSuccess(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;