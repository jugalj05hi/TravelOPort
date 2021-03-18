import React from "react";
import {fetchProfile} from "../../services/services";
import HeaderComponent from "../Headers/HeaderComponent";

export default class PrivacyComponent extends React.Component {

  state = {
    user: '',
    login: false
  };

  componentDidMount() {
    fetchProfile().then(user => {
      if (user) {
        this.setState({
          user: user,
          login: true
        })
      } else {
        this.setState({
          login: false
        })
      }
    })
  }

  render() {
    return (
        <>
          <HeaderComponent
              history={this.props.history}
              login={this.state.login}
              user={this.state.user}/>
          <div className="container container-background">
            <div className="row pt-3 pb-5">
              <div className="col">
                <h2>Privacy Policy</h2>
                <hr/>
                <p align="justify">This policy was last updated on April 20,
                  2020.</p>

                <p align="justify">This Privacy Policy describes our policies
                  and procedures on the
                  collection, use and disclosure of Your information when You
                  use the
                  Service and tells You about Your privacy rights and how the
                  law
                  protects You.We use Your Personal data to provide and improve
                  the
                  Service. By using the Service, You agree to the collection and
                  use
                  of information in accordance with this Privacy Policy.</p>

                <h4>Web Privacy Policy</h4>
                <p align="justify">We consider privacy as one of the fundamental
                  rights and we would
                  like you to know how we collect, use and protect your
                  information.
                  You can consider our website’s offline equivalent as your
                  local
                  travel agent that you would visit to book flights, check the
                  foreign
                  exchange rates and book hotels. We collect little information
                  on
                  users that is absolutely needed for them to use the features
                  of the
                  website. We do not collect more information without your
                  knowledge,
                  nor do we track you or your activities online. </p>

                <h4>What information we collect</h4>
                <h4>Information you give us</h4>
                <p align="justify">We welcome and respect each and every user on
                  the site irrespective
                  of them sharing their personal details. To access certain
                  features
                  of the site i.e. booking flight tickets, searching for hotels
                  and
                  converting currencies, one would have to register with the
                  website
                  if not already registered or login to the site if already
                  registered. At the time of logging in, a user would be asked
                  the
                  following credentials: First Name, Last Name, Email address
                  and
                  password, these credentials would be stored securely in a
                  database
                  for strictly identifying users and nothing else. If a user
                  decides
                  to book a flight from the website then his/hers booking
                  history
                  would be stored in the database that would enable users to
                  keep a
                  track on their ticket history if they decide to look it up in
                  the
                  future. </p>

                <h4>Information we collect automatically</h4>
                <p align="justify">Whenever a user interacts with the website,
                  certain information
                  like browser type, IP address and operating system is
                  automatically
                  collected for ensuring a smooth experience for the user and
                  also for
                  proper functioning of the website. This type of information is
                  neither stored nor persisted for future use. The information
                  is only
                  collected and used for that particular session when the user
                  accesses the website. The information is destroyed
                  automatically
                  once the user closes the browser tab or closes the browser
                  itself.</p>

                <h4>Monetization</h4>

                <p align="justify">We condemn the use of data for monetization
                  purposes in any form.
                  Hence we would never use a user's personal information such as
                  an
                  email address and name for generating revenues. As of present
                  day we
                  have not monetized the website in any form. But if in future
                  we wish
                  to monetize the website, we would only use generic data such
                  as site
                  traffic and statistics and of course we would notify the
                  change
                  prior hand with enough time for users to delete their data
                  from the
                  website if they want to. </p>

                <h4>Third Party tie-ups</h4>

                <p align="justify">As of now, we have not integrated any third
                  party services like
                  Google, Facebook or Twitter on the website. Should we in
                  future
                  decide to add third party features, we would update this
                  section and
                  simultaneously notify users beforehand about any changes. </p>


                <h4>Data transfer and retention practices</h4>

                <p align="justify">Our team believes user privacy and security
                  are of the utmost
                  importance and hence we adopt the best practices out there to
                  ensure
                  user’s sensitive information like password is not leaked out
                  or is
                  not accessed by any malicious entity. To walk you through the
                  practices, let us take user registration for example, whenever
                  the
                  user enters his/her details in the registration form and
                  clicks
                  submit. The sensitive information such as email address and
                  password
                  is encrypted using a military grade encryption technique. And
                  the
                  data is further hashed on the server side and stored in the DB
                  making it impossible for anyone(including us) to decrypt it.
                  To
                  conclude your data is stored in a secured DB as hashes that
                  makes it
                  virtually impenetrable. And if ever in future a user decides
                  to take
                  away his/hers data. He/She can delete the profile under the
                  profile
                  tab on the website. Doing so would result in deleting data
                  permanently that cannot be recovered in the future. </p>


                <h4>Motivation</h4>

                <p align="justify">Our team believes user privacy as a
                  fundamental right to a human
                  being. And even though we have the option to sell user’s data
                  such
                  as email and flight history, we believe it is against our
                  principles
                  to sell data without any consent. And hence we again make it
                  clear
                  that user data is stored only for the website’s functionality
                  and to
                  improve user experience.</p>

                <h4>Privacy Policy Updates</h4>
                <p align="justify">The privacy policy is subject to change as we
                  integrate more
                  services and we use novel technologies for the betterment of
                  the
                  website. If we make significant changes to the privacy policy,
                  we’ll
                  post a prominent message on the website.</p>

                <h4>Contact Information</h4>

                <p align="justify">If you have any questions regarding the
                  privacy policy, please feel
                  free to reach us at <span
                      className="color-red">joshi.ju@husky.neu.edu</span> or
                  <span
                      className="color-red"> madgi.a@husky.neu.edu</span>
                </p>
                <hr/>
              </div>
            </div>
          </div>
        </>
    )
  }
}
