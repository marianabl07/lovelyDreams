import React, { useState, useEffect } from "react";
import '../styles/styleHome.css'; // Importar los estilos CSS
import 'bootstrap';
import ref2057 from '../Image/IMG_20230917_175317.jpg';
import ref2155 from '../Image/IMG_20230917_175502.jpg';
import ref2058 from '../Image/IMG_20230917_180125.jpg';
import ref2255 from '../Image/IMG_20230917_175953.jpg';
import ref2256 from '../Image/IMG_20230917_180434.jpg';
import ref2156 from '../Image/IMG_20230917_180619.jpg';
import ref2059 from '../Image/IMG_20230917_180302.jpg';
import ref2257 from '../Image/IMG_20230917_175752.jpg';
import LovelyDreamsLogo from '../Icons/Lovely Dreams Logo.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [purchaseSuccess, setPurchaseSuccess] = useState(false);
    const [pokemonProducts, setPokemonProducts] = useState([]); // State para los productos Pokémon

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

    function ApiPokemon() {
        function Card(props) {
            return (
                <div className="card">
                    <img src={props.img} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">
                            Soon we will have our new pajamas with Pokémon designs. Look at the six new designs that we will have on our pajamas.
                        </p>
                        <a href="#" className="btn btn-primary">
                            Coming soon
                        </a>
                    </div>
                </div>
            );
        }

        function NewProducts() {
            const [Data, setData] = useState([]);
            const [Loaded, setLoaded] = useState(false);
            const pokemons = ["piplup", "pikachu", "lucario", "eevee", "charizard", "gengar"];

            useEffect(() => {
                if (Loaded === false) {
                    pokemons.forEach((pokemon) => {
                        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                            .then((response) => response.json())
                            .then((pokemonData) => {
                                setData((arrayPokemon) => [
                                    ...arrayPokemon,
                                    <Card key={pokemonData.name} title={pokemonData.name} img={pokemonData.sprites.front_default} />,
                                ]);
                            });
                    });

                    setLoaded(true);
                }
            }, [Loaded]);
            return (
                <div className="newProducts">
                    <div className="container d-flex justify-content-around">
                        <div className="col-3">
                            {Data.length === 0 ? "Loading" : Data}
                        </div>
                    </div>
                </div>
            );
        }

        return <NewProducts />;
    }

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

    const finalizePurchase = () => {
        setPurchaseSuccess(true);
        
        let items = [];
        cart.reduce((total, product) => { items.push({ ref: product.name, price: product.price }) }, 0);

        let purchase = {
            products: items,
            priceTotal: calculateTotalPrice() 
        };
        fetch("localhost/HomePages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(purchase)

        })
    };

    useEffect(() => {
        // Load Pokémon products here (if needed)

    }, []);

    return (
        <div>
            {/* ... (Navbar y encabezado) */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light" id="menu">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#!">
                        <img src={LovelyDreamsLogo} alt="logo" width="70" height="70" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#!">All Products</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                    <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand"></a>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-danger" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                </div>
                <form className="d-flex">
                    <button className="btn btn-outline-danger" type="submit">
                        <i className="bi bi-cart-fill me-1"></i>
                        Cart
                        <span id="cart-count" className="badge bg-danger text-white ms-1 rounded-pill">{cartCount}</span>
                    </button>
                </form>
            </nav>

            <header class="bg-dark py-5">
                <div class="container px-4 px-lg-5 my-5">
                <div class="text-center text-white">
                    <h1 class="display-4 fw-bolder">lovely dreams</h1>
                    <p class="lead fw-normal text-white-50 mb-0">Sweet dreams guaranteed</p>
                </div>
                </div>
            </header>

            {/* Carrito de compra */}
            <section className="max-height-350 cart-container" style={{display: cart.length === 0 ? 'none' : 'block' }}>
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

            <div>
                <p className="pokemon-description">pokemon collaboration new designs</p>
            <ApiPokemon />
            </div>

            {/* Carrito de compra */}
            <section className="max-height-350 cart-container">
                <div className={`max-height-350 py-5 ${cart.length > 0 ? 'show' : 'hide'}`} id="cartPurchase">
                    <h2>Cart</h2>
                    <ul id="cart-list">
                        {cart.map((product, index) => (
                            <li key={index}>
                                <img src={product.image} alt={product.name} width="50" height="50" />
                                <span>{product.name}</span>
                                <span className="cart-price">${product.price.toFixed(2)}</span>
                                <button className="remove-from-cart btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div id="total-price">Total: ${calculateTotalPrice().toFixed(2)}</div>
                    <button className="btn-pay" onClick={finalizePurchase}>Buy <i className="fa-solid fa-bag-shopping"></i></button>
                </div>
            </section>

            {/* ... (Pie de página) */}
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
            <div className={`modal  ${purchaseSuccess ? 'fade show' : ''}`} id="purchaseSuccessModal" tabIndex="-1" aria-labelledby="purchaseSuccessModalLabel" aria-hidden="true" style={{ display: purchaseSuccess ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="purchaseSuccessModalLabel">Successful purchase</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setPurchaseSuccess(false)}></button>
                        </div>
                        <div className="modal-body">
                            Thanks for your purchase! Your order has been processed successfully.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setPurchaseSuccess(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
