import React from "react";
import { Card } from "react-bootstrap";

const Album: React.FC = () => {
  const productos = [
    {
      img: "/img/room_001.jpeg",
      placeholder: "Producto1",
      thumbnail: "Pr1",
      description: "Estas es la descricion del producto 1",
    },
    {
      img: "/img/room_001.jpeg",
      placeholder: "Producto2",
      thumbnail: "Pr2",
      description: "Estas es la descricion del producto 2",
    },
    {
      img: "/img/room_001.jpeg",
      placeholder: "Producto3",
      thumbnail: "Pr3",
      description: "Estas es la descricion del producto 3",
    },
    {
      img: "/img/room_001.jpeg",
      placeholder: "Producto4",
      thumbnail: "Pr4",
      description: "Estas es la descricion del producto 4",
    },
    {
      img: "/img/room_001.jpeg",
      placeholder: "Producto5",
      thumbnail: "Pr5",
      description: "Estas es la descricion del producto 5",
    },
  ];

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productos.map((p) => (
            <AlbumEntry
              img={p.img}
              placeholder={p.placeholder}
              thumbnail={p.thumbnail}
              description={p.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface AlbumEntryProps {
  img: string;
  placeholder: string;
  thumbnail: string;
  description: string;
}

const AlbumEntry: React.FC<AlbumEntryProps> = (props: AlbumEntryProps) => {
  const { img, placeholder, thumbnail, description } = props;

  return (
    <div className="col">
      <Card className="card shadow-sm">
        <Card.Img variant="top" src={img} />
        <Card.Body className="card-body">
          <p className="card-text">{description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </button>
            </div>
            <small className="text-body-secondary">9 mins</small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Album;
