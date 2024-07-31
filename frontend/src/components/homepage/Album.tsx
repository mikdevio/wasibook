import React from "react";

const Album: React.FC = () => {
  const productos = [
    {
      placeholder: "Producto1",
      thumbnail: "Pr1",
      description: "Estas es la descricion del producto 1",
    },
    {
      placeholder: "Producto2",
      thumbnail: "Pr2",
      description: "Estas es la descricion del producto 2",
    },
    {
      placeholder: "Producto3",
      thumbnail: "Pr3",
      description: "Estas es la descricion del producto 3",
    },
    {
      placeholder: "Producto4",
      thumbnail: "Pr4",
      description: "Estas es la descricion del producto 4",
    },
    {
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
  placeholder: string;
  thumbnail: string;
  description: string;
}

const AlbumEntry: React.FC<AlbumEntryProps> = (props: AlbumEntryProps) => {
  const { placeholder, thumbnail, description } = props;

  return (
    <div className="col">
      <div className="card shadow-sm">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height="225"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: Thumbnail"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>{placeholder}</title>
          <rect width="100%" height="100%" fill="#55595c" />
          <text x="50%" y="50%" fill="#eceeef" dy=".3em">
            {thumbnail}
          </text>
        </svg>
        <div className="card-body">
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
        </div>
      </div>
    </div>
  );
};

export default Album;
