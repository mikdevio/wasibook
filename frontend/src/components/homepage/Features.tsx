import React from "react";

const Features: React.FC = () => {
  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Servicios del Hotel</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            {/* <svg className="bi" width="1em" height="1em"><use xlink:href="#collection"/></svg> */}
          </div>
          <h3 className="fs-2 text-body-emphasis">Hospedaje</h3>
          <p>
            Hospedaje En Hotel Los Anturios, cada habitación está diseñada para
            ofrecerte el máximo confort y tranquilidad. Disfruta de nuestras
            elegantes suites equipadas con amenities de alta calidad, camas
            lujosas y vistas panorámicas que aseguran una estancia placentera.
            Nuestro personal está dedicado a brindarte un servicio personalizado
            para que te sientas como en casa. ¡Reserva tu estancia hoy y vive
            una experiencia de lujo sin igual!
          </p>
          <a href="#" className="icon-link">
            Call to action
            {/* <svg className="bi"><use xlink:href="#chevron-right"/></svg> */}
          </a>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            {/* <svg className="bi" width="1em" height="1em"><use xlink:href="#people-circle"/></svg> */}
          </div>
          <h3 className="fs-2 text-body-emphasis">Garaje</h3>
          <p>
            Nuestro garaje privado ofrece un espacio seguro y conveniente para
            tu vehículo durante tu estancia. Con fácil acceso a todas las
            instalaciones del hotel, puedes relajarte sabiendo que tu coche está
            bien cuidado. Además, nuestro servicio de valet parking está
            disponible para mayor comodidad. ¡Asegura tu plaza de
            estacionamiento al hacer tu reserva!
          </p>
          <a href="#" className="icon-link">
            Call to action
            {/* <svg className="bi"><use xlink:href="#chevron-right"/></svg> */}
          </a>
        </div>
        <div className="feature col">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            {/* <svg className="bi" width="1em" height="1em"><use xlink:href="#toggles2"/></svg> */}
          </div>
          <h3 className="fs-2 text-body-emphasis">
            Servicio interno del hotel
          </h3>
          <p>
            Explora nuestros servicios internos diseñados para hacer tu estancia
            aún más cómoda. Desde nuestro restaurante gourmet hasta el gimnasio
            totalmente equipado, tenemos todo lo que necesitas sin tener que
            salir del hotel. Ofrecemos una gama completa de servicios
            adicionales, incluyendo servicio a la habitación y spa, para
            satisfacer todas tus necesidades. ¡Descubre todos nuestros servicios
            y disfruta de una estancia perfecta con nosotros!
          </p>
          <a href="#" className="icon-link">
            Call to action
            {/* <svg className="bi"><use xlink:href="#chevron-right"/></svg> */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
