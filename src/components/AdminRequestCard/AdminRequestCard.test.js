import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { notify } from "react-notify-toast";
import { AdminRequestCard } from "../AdminRequestCard/AdminRequestCard";

describe("AdminRequestCard", () => {
  let wrapper;
  let parentWrapper;
  const props = {
    id: 1,
    title: "title",
    details: "details",
    approved: true
  };

  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <AdminRequestCard {...props} />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(AdminRequestCard);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe("Approve Button", () => {
    it("should call approve() ", () => {
      const spy = jest.spyOn(wrapper.instance(), "approve");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("#approveBtn");
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Approve Button", () => {
    it("should call showApproved()", async () => {
      notify.show = jest.fn();
      moxios.stubRequest("http://127.0.0.1:5000/v1/requests/1/approve", {
        status: 201
      });
      const spy = jest.spyOn(wrapper.instance(), "showApproved");
      await wrapper.instance().approve();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Approve Button", () => {
    it("should call showFailure()", async () => {
      notify.show = jest.fn();
      moxios.stubRequest("http://127.0.0.1:5000/v1/requests/1/approve", {
        status: 400
      });
      const spy = jest.spyOn(wrapper.instance(), "showFailure");
      await wrapper.instance().approve();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Dispprove Button", () => {
    it("should call disapprove() ", () => {
      const spy = jest.spyOn(wrapper.instance(), "disapprove");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("#disapproveBtn");
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Disapprove Button", () => {
    it("should call showDisapproved()", async () => {
      notify.show = jest.fn();
      moxios.stubRequest("http://127.0.0.1:5000/v1/requests/1/disapprove", {
        status: 201
      });
      const spy = jest.spyOn(wrapper.instance(), "showDisapproved");
      await wrapper.instance().disapprove();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Disapprove Button", () => {
    it("should call showFailure()", async () => {
      notify.show = jest.fn();
      moxios.stubRequest("http://127.0.0.1:5000/v1/requests/1/disapprove", {
        status: 400
      });
      const spy = jest.spyOn(wrapper.instance(), "showFailure");
      await wrapper.instance().disapprove();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Resolve Button", () => {
    it("should call resolve() ", () => {
      const spy = jest.spyOn(wrapper.instance(), "resolve");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("#resolveBtn");
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Resolve Button", () => {
    it("should call showResolved()", async () => {
      notify.show = jest.fn();
      moxios.stubRequest("http://127.0.0.1:5000/v1/requests/1/resolve", {
        status: 201
      });
      const spy = jest.spyOn(wrapper.instance(), "showResolved");
      await wrapper.instance().resolve();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Resolve Button", () => {
    it("should call showFailure()", async () => {
      notify.show = jest.fn();
      moxios.stubRequest("http://127.0.0.1:5000/v1/requests/1/resolve", {
        status: 400
      });
      const spy = jest.spyOn(wrapper.instance(), "showFailure");
      await wrapper.instance().resolve();
      expect(spy).toHaveBeenCalled();
    });
  });
});
