import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

// configure Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders without crashing", () => {
  const wrapper = shallow(<App />);
  console.log(wrapper.debug());
});
