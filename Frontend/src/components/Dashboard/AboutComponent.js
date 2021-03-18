import React from "react";
import './dashboard-styles.css';
import '../../containers/main-style.css';

export const AboutComponent = () =>
    <>
      <div className="row mr-3 pr-3 pl-3 pt-3">
        <h3 className=''>About Us</h3>
      </div>
      <hr/>
      <div className="row mr-3 pr-3 pl-3 ">
        <h6>
          Are you tired of looking for cheap flight tickets on various sites
          only to find out the prices have been increased when you
          actually try to book it?<br/><br/>
          Do you feel lazy to look up for currencies rates every time you think
          of traveling?
          <br/><br/>
          Are you fed up of ever-growing promotional suggestions based on your
          search history?
          <br/><br/>
          Welcome to <span className="highlight">TravelOPort</span>, your one
          stop solution for everything about traveling to a new place.
          From currencies to hotels all bundled up in one site.
          <br/>
          <br/>
          We believe in giving you all the choices, and helping you make
          informed decisions.
          We don’t re-order results, have hidden fees, or charge commission.
          We do use cookies to deliver our services,
          but we do not use them to raise prices or manipulate demand –
          so no need to use incognito mode to find those great deals!
          We believe in maintaining your trust strongly. And giving you
          unadulterated search results just like the good old times.
          <br/>
          <br/>
          Go ahead and give it try. No logins or signups required. We only ask
          user to register or login when you want to book.
        </h6>
        <h6 className='highlight'>To access the full features of the site, we
          would recommend you to login so that we can serve
          you better.</h6>
        <span style={{"font-size": "0.9rem"}}>Currently flights to <span
            className="highlight font-italic">Latin America and
          Caribbean Islands</span> are not supported. We appreciate your
          co-operation. </span>
      </div>
      <hr/>
    </>;
