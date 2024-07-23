import React from 'react';
import { Container } from 'react-bootstrap';

import NavigationBar from '../components/Navbar';
import StepMenu from '../components/booking/StepMenu';
import BookingForm from '../components/booking/BookingForm';
import ReservationSummary from '../components/booking/ReservationSummary';

import { BookingData, PricesDictionary, CheckData, RoomData, ReservationData } from './../types/Types';

const checkIn: CheckData = {
  checkType: "in",
  date: new Date("2022-05-22T16:00:00")
}

const checkOut: CheckData = {
  checkType: "in",
  date: new Date("2022-05-25T11:00:00")
}

const roomOne: RoomData = {
  roomCode: "A01",
  description: 'King bed stylish Apartment with Loft style family room'
}

const roomTwo: RoomData = {
  roomCode: "B01",
  description: 'King bed stylish Apartment with Loft style family room'
}

const Prices: PricesDictionary = {
  "id_1": {
    tag: 'Rooms and offer:',
    value: 625.43
  },
  "id_2": {
    tag: '8% VAT:',
    value: 50.03
  },
  "id_3": {
    tag: 'City tax:',
    value: 16.44
  },
  "id_4": {
    tag: 'Total Price:',
    value: 698.87
  },
}

const reservationOne: ReservationData = {
  checkinData: checkIn,
  checkoutData: checkOut,
  roomData: roomOne
}

const reservationTwo: ReservationData = {
  checkinData: checkIn,
  checkoutData: checkOut,
  roomData: roomTwo
}

const BookingExample: BookingData = {
  reservationList: [ reservationOne, reservationTwo ],
  pricesDictionary: Prices
}

const Home: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <Container className='mt-5'>
        <StepMenu />
        <div className="row">
          <div className="col-md-8">
            <BookingForm bookingData={BookingExample}/>
          </div>
          <div className="col-md-4">
            <ReservationSummary bookingData={BookingExample}/>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
