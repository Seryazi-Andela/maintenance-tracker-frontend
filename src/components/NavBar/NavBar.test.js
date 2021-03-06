import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "../NavBar/NavBar";

describe("NavBar", () => {
  let wrapper;
  let parentWrapper;

  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(NavBar);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe("toggle", () => {
    it("should change the state", () => {
      wrapper.instance().setState({
        isOpen: false
      });
      wrapper.instance().toggle();
      expect(wrapper.instance().state.isOpen).toBe(true);
    });
  });

  describe("NavLink", () => {
    it("call logout", () => {
      const spy = jest.spyOn(wrapper.instance(), "logout");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("NavLink").last();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });
});
