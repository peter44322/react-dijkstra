import React from "react";
import { Header as SHeader, Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <div>
      <SHeader as="h2">
        <Icon name="settings" />
        <SHeader.Content>Graph Controls</SHeader.Content>
      </SHeader>
    </div>
  );
};

export default Header;
