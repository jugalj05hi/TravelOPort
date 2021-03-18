import React from "react";
import NavBarComponent from "./NavBarComponent";

const HeaderComponent = ({user, login, history}) =>
    <div>
      <NavBarComponent
          user={user}
          login={login}
          history={history}
      />
    </div>;

export default HeaderComponent
