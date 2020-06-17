import React from "react";
import { Header as SHeader, Icon, Radio } from "semantic-ui-react";

const Header = (props) => {
  return (
    <div>
      <SHeader as="h2">
        <Icon name="settings" />
        <SHeader.Content>Graph Controls</SHeader.Content>
      </SHeader>
      <div>
        <Radio
          onChange={(e, s) => {
            props.onChange(s.checked);
          }}
          label="bidirectional"
          toggle
        ></Radio>
      </div>
    </div>
  );
};

export default Header;
