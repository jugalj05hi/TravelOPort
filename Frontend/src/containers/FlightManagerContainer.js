import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import FlightContainer from './FlightContainer';
import HomeComponent from '../components/Home/HomeComponent';
import UserDashboardComponent
  from '../components/Dashboard/UserDashboardComponent';
import {FooterComponent} from '../components/Footer/FooterComponent';
import ProfileComponent from '../components/Profile/ProfileComponent';
import FlightDetailComponent
  from '../components/Flights/FlightDetails/FlightDetailComponent';
import HotelComponent from '../components/Hotels/HotelComponent';
import './main-style.css';
import AdminComponent from '../components/Admin/AdminComponent';
import PrivacyComponent from '../components/Privacy/PrivacyComponent';
import CurrencyComponent from '../components/Currency/CurrencyComponent';
import ConfirmationDetails
  from "../components/Flights/FlightDetails/ConfirmationDetails";

export default class FlightManagerContainer extends React.Component {
  render() {
    return (
        <div className="background">
          <Router>
            <Route
                path="/"
                exact={true}
                render={(props) => <HomeComponent
                    {...props}
                    history={props.history}/>}
            />
            <Route
                path="/dashboard"
                exact={true}
                render={(props) => (
                    <FlightContainer
                        {...props}
                        origin={props.match.params.origin}
                        destination={props.match.params.destination}
                        adults={props.match.params.adults}
                        date={props.match.params.date}
                        history={props.history}
                    />
                )}
            />
            <Route
                path="/search/dashboard/:origin/:destination/:adults/:date"
                exact={true}
                render={(props) => (
                    <FlightContainer
                        {...props}
                        origin={props.match.params.origin}
                        destination={props.match.params.destination}
                        adults={props.match.params.adults}
                        date={props.match.params.date}
                        dashboard={true}
                    />
                )}
            />
            <Route
                path="/user-dashboard"
                exact={true}
                render={(props) => <UserDashboardComponent
                    {...props}
                    login={true}/>}
            />
            <Route
                path="/profile"
                exact={true}
                render={(props) => <ProfileComponent
                    {...props}
                    login={true}
                    history={props.history}/>}
            />
            <Route
                path="/search"
                exact={true}
                render={(props) => <FlightContainer
                    {...props}
                    dashboard={false}
                    history={props.history}/>}
            />
            <Route
                path="/search/:origin/:destination/:adults/:date"
                exact={true}
                render={(props) => (
                    <FlightContainer
                        {...props}
                        origin={props.match.params.origin}
                        destination={props.match.params.destination}
                        adults={props.match.params.adults}
                        date={props.match.params.date}
                    />
                )}
            />
            <Route
                path="/search/hotels"
                exact={true}
                render={(props) =>
                    <HotelComponent
                        {...props}
                        dashboard={false}
                        history={props.history}/>}
            />
            <Route
                path="/search/hotels/:destination"
                exact={true}
                render={(props) => (
                    <HotelComponent
                        {...props}
                        destination={props.match.params.destination}
                        dashboard={false}
                        history={props.history}
                    />
                )}
            />
            <Route
                path="/flight-details/:origin/:destination/:adults/:date"
                exact={true}
                render={(props) => (
                    <FlightDetailComponent
                        {...props}
                        origin={props.match.params.origin}
                        destination={props.match.params.destination}
                        adults={props.match.params.adults}
                        date={props.match.params.date}
                        history={props.history}
                        dashboard={false}/>
                )}
            />
            <Route
                path="/confirmation"
                exact={true}
                render={(props) =>
                    <ConfirmationDetails
                        {...props}
                        history={props.history}/>}
            />
            <Route
                path="/admin"
                exact={true}
                render={(props) =>
                    <AdminComponent
                        {...props}
                        dashboard={false}
                        history={props.history}/>}
            />
            <Route
                path="/privacy"
                exact={true}
                render={(props) =>
                    <PrivacyComponent
                        {...props}
                        dashboard={false}
                        history={props.history}/>}
            />
            <Route
                path="/currency"
                exact={true}
                render={(props) =>
                    <CurrencyComponent
                        {...props}
                        history={props.history}
                        dashboard={false}/>}
            />
          </Router>
          <FooterComponent/>
        </div>
    );
  }
}
