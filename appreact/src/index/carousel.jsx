//carousel.js
import React from 'react';
import pajama1 from '../Image/pijama1.jpg';
import pajama2 from '../Image/pijama2.jpg';
import pajama3 from '../Image/pijama 3.jpg';

function Carousel() {
    return (
        <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" data-bs-interval="3000">
          <div class="carousel-item active">
            <img src={pajama1} class="d-block w-50 mx-auto text-center" alt="slide1"/>
            <div class="carousel-caption d-none d-md-block" id="slide-text">
              <h5>Ref. 2056</h5>
              <p>Nightgowns available: fuchsia, pink, mint</p>
            </div>
          </div>

          <div class="carousel-item" data-bs-interval="3000">
            <img src={pajama2} class="d-block w-50 mx-auto text-center" alt="slide2"/>
            <div class="carousel-caption d-none d-md-block" id="slide-text">
              <h5>Ref. 2033</h5>
              <p>Short pajama set available: fuchsia, black, mint.</p>
            </div>
          </div>

          <div class="carousel-item" data-bs-interval="3000">
            <img src={pajama3} class="d-block w-50 mx-auto text-center" alt="slide3"/>
            <div class="carousel-caption d-none d-md-block" id="slide-text">
              <h5>Ref. 2031</h5>
              <p>Short pajama set available: coral, fuchsia, jade green.</p>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    );

}

export default Carousel;