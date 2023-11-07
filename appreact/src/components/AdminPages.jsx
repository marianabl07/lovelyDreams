import React, { useState, useEffect } from "react";
import '../styles/styleAdmin.css'
import 'bootstrap';
// import ref2057 from '../Image/IMG_20230917_175317.jpg';
// import ref2155 from '../Image/IMG_20230917_175502.jpg';
// import ref2058 from '../Image/IMG_20230917_180125.jpg';
// import ref2255 from '../Image/IMG_20230917_175953.jpg';
// import ref2256 from '../Image/IMG_20230917_180434.jpg';
// import ref2156 from '../Image/IMG_20230917_180619.jpg';
// import ref2059 from '../Image/IMG_20230917_180302.jpg';
// import ref2257 from '../Image/IMG_20230917_175752.jpg';
import inventoryStatus from '../Image/inventory chart.png';

function AdminPage() {
  const [cartProducts, setCartProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [products, setProducts] = useState({});
  //   "Ref. 2057": { price: 35000, available: 10, image: ref2057 },
  //   "Ref. 2155": { price: 39000, available: 15, image: ref2155 },
  //   "Ref. 2058": { price: 28000, available: 5, image: ref2058 },
  //   "Ref. 2255": { price: 40000, available: 25, image: ref2255 },
  //   "Ref. 2256": { price: 45000, available: 15, image: ref2256 },
  //   "Ref. 2156": { price: 40000, available: 8, image: ref2156 },
  //   "Ref. 2059": { price: 28000, available: 7, image: ref2059 },
  //   "Ref. 2257": { price: 40000, available: 12, image: ref2257 },
  // });

  const updateProductQuantity = (productName, change) => {
    const productQuantitySpan = document.getElementById(`product-quantity-${productName}`);
    if (productQuantitySpan) {
      const updatedQuantity = products[productName].available;
      productQuantitySpan.textContent = `${updatedQuantity} available`;
    }
  };

  const updateCart = (productName, change) => {
    setCartProducts((prevCartProducts) => {
      const updatedCart = { ...prevCartProducts };

      if (updatedCart[productName] === undefined) {
        updatedCart[productName] = 0;
      }

      const availableQuantity = products[productName].available;

      if (change < 0 && updatedCart[productName] + change < 0) {
        change = -updatedCart[productName];
      }

      if (availableQuantity > 0) {
        updatedCart[productName] += change;
        updateTotalPrice(updatedCart);
        updateInventory(productName, change);
        updateProductQuantity(productName, change);
      } else {
        alert("There is not enough quantity available.");
      }

      return updatedCart;
    });
  };

  const removeProductFromCart = (productName) => {
    setCartProducts((prevCartProducts) => {
      const updatedCart = { ...prevCartProducts };

      if (updatedCart[productName] !== undefined && updatedCart[productName] > 0) {
        updatedCart[productName] -= 1;
        updateTotalPrice(updatedCart);
        updateInventory(productName, -1);
        updateProductQuantity(productName, -1);
      }

      return updatedCart;
    });
  };

  const updateInventory = (productName, change) => {
    const newAvailable = products[productName].available - change;

    if (newAvailable >= 0) {
      products[productName].available = newAvailable;
    }
  };

  const updateTotalPrice = (updatedCart) => {
    let total = 0;

    for (const productName in updatedCart) {
      total += products[productName].price * updatedCart[productName];
    }

    setTotalPrice(total);
  };

  useEffect(() => {
    fetch("http://localhost:4000/libraryProducts", {
      headers: {
          "Content-Type": "application/json",
          "autorization": localStorage.getItem("token")
      }
  })
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((e) => console.log(e));

  }, []);

  return (
  <div>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        {/* ... (código del encabezado) */}
      </nav>

      <section>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
            </a>
          </div>

          <div className="row">
            {/* ... Tarjetas de ingresos mensuales y anuales aquí */}
          </div>

          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Inventory management</h6>
                  <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink">
                      <div className="dropdown-header">Dropdown Header:</div>
                      <a className="dropdown-item" href="#">Weekly</a>
                      <a className="dropdown-item" href="#">Monthly</a>
                      <a className="dropdown-item" href="#">Yearly</a>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">
                      <h2>Inventory</h2>
                      <ul className="inventory-list">
                        {Object.keys(products).map((productName) => (
                          products[productName].available > 0 && (
                            <li key={productName} className="inventory-item">
                              <span className="product-name">{productName}</span><br />
                              <span
                                id={`product-quantity-${productName}`}
                                className="product-quantity"
                              >
                                {products[productName].available} available
                              </span><br />
                              <span className="product-price">
                                ${products[productName].price.toFixed(2)} each
                              </span>
                              <button className="add-to-cart" onClick={() => updateCart(productName, 1)}>
                                Add to cart
                              </button>
                              <img src={`data:image/jpg;base64,${products[productName].image}`} alt={productName} />
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <h2>Cart</h2>
                      <ul className="cart-list">
                        {Object.keys(cartProducts).map((productName) => (
                          cartProducts[productName] > 0 && (
                            <li key={productName}>
                              <span className="cart-product-name">{productName}</span><br />
                              <span className="cart-quantity">Quantity: {cartProducts[productName]}</span><br />
                              <span className="cart-unit-price">
                                Unit Price: ${products[productName].price.toFixed(2)}
                              </span><br />
                              <span className="cart-total-price">
                                Total Price: ${(
                                  products[productName].price * cartProducts[productName]
                                ).toFixed(2)}
                              </span><br />
                              <button
                                className="remove-from-cart"
                                onClick={() => removeProductFromCart(productName)}
                              >
                                Remove from cart
                              </button>
                              <img src={`data:image/jpg;base64,${products[productName].image}`} alt={productName} />
                            </li>
                          )
                        ))}
                      </ul>
                      <div id="total-price">Total: ${totalPrice.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Inventory status</h6>
                  <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink">
                      <div className="dropdown-header">Dropdown Header:</div>
                      <a className="dropdown-item" href="#">View report</a>
                      <a className="dropdown-item" href="#">Edit report</a>
                      <a className="dropdown-item" href="#">Mark as done</a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart-pie pt-4 pb-2">
                    <img className="img-fluid rounded d-block mx-auto" src={inventoryStatus} alt="inventory" />
                  </div>
                  <div className="mt-4 text-center small">
                    <span className="mr-2">
                      <i className="fas fa-circle text-primary"></i> Sold
                    </span>
                    <span className="mr-2">
                      <i className="fas fa-circle text-success"></i> Stock
                    </span>
                    <span className="mr-2">
                      <i className="fas fa-circle text-info"></i> Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* ... Contenido adicional */}
          </div>
        </div>
      </section>

      <footer className="w-100 d-flex align-items justify-content-center flex-wrap">
        <p className="fs-5 px-3 pt-3">lovely dreams &copy; All Rights Reserved 2023</p>
        <div id="icons">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter-x"></i></a>
          <a href="#"><i className="bi bi-whatsapp"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
        </div>
        <div className="fs-5 px-3 pt-3" id="contactUs">Contact us (+57) 311-404-1549</div>
      </footer>
    </div>
  );
}
export default AdminPage;

