import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";

describe("Dashboard", () => {
  let wrapper;
  let parentWrapper;
  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(Dashboard);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe("fetchData", () => {
    it("should call getUserRequests", () => {
      const spy = jest.spyOn(wrapper.instance(), "getUserRequests");
      wrapper.instance().fetchData();
      expect(spy).toBeCalled();
    });
  });

  describe("getUserRequests", () => {
    it("should render user requests", async () => {
      const requests = [
        {
          id: 1,
          header: "this is a header",
          details: "here are some details",
          approved: false,
          resolved: false
        },
        {
          id: 2,
          header: "this is another header",
          details: "here are some more details",
          approved: false,
          resolved: false
        }
      ];
      moxios.stubRequest("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests", {
        status: 200,
        response: { requests }
      });
      const res = await wrapper.instance().getUserRequests();
      expect(res.data.requests).toBe(requests);
    });
  });

  describe("getUserRequests", () => {
    it("should throw an error", async () => {
      moxios.stubRequest("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests", {
        status: 400
      });
      const res = await wrapper.instance().getUserRequests();
      expect(wrapper.instance().state.loader).toBe("");
    });
  });

  describe("fetchData", () => {
    it("should call handleResponse", async () => {
      const requests = [
        {
          id: 1,
          header: "this is a header",
          details: "here are some details",
          approved: false,
          resolved: false
        },
        {
          id: 2,
          header: "this is another header",
          details: "here are some more details",
          approved: false,
          resolved: false
        }
      ];
      moxios.stubRequest("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests", {
        status: 200,
        response: { requests }
      });
      const spy = jest.spyOn(wrapper.instance(), "handleResponse");
      await wrapper.instance().fetchData();
      expect(spy).toBeCalled();
    });
  });

  describe("checkListSize", () => {
    it("should show indicator", () => {
      wrapper.instance().setState({
        requests: []
      });
      wrapper.instance().checkListSize();
      expect(wrapper.instance().state.showIndicator).toBe("block");
    });
  });
});
