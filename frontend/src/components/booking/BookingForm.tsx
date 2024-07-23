import React from 'react';

interface BookingFormProps {}

const BookingForm: React.FC<BookingFormProps> = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">King bed stylish Apartment with Loft style family room</h5>
        <p className="card-text">Good to know: Free cancellation until 11:59 PM on May 21, 2022</p>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone" />
          </div>
          <button type="submit" className="btn btn-primary">Request To Book</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
