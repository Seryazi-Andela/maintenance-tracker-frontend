import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { notify } from "react-notify-toast";
import { CreateRequest } from "../CreateRequest/CreateRequest";

describe("CreateRequest", () => {
  let wrapper;
  let parentWrapper;

  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <CreateRequest />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(CreateRequest);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe("Title Input", () => {
    it("should call onTitleChange()", () => {
      const spy = jest.spyOn(wrapper.instance(), "onTitleChange");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="heading"]');
      userInput.simulate("change", {
        target: { value: "this is a title", name: "heading" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Details Input", () => {
    it("should call onDetailsChange()", () => {
      const spy = jest.spyOn(wrapper.instance(), "onDetailsChange");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('textarea[name="details"]');
      userInput.simulate("change", {
        target: { value: "here are a few details", name: "details" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Submit Button", () => {
    it("should call submitRquest()", () => {
      notify.show = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), "submitRequest");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("#submitBtn").first();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Submit Button with set state", () => {
    it("should call submitRquest()", () => {
      notify.show = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), "submitRequest");
      wrapper.instance().forceUpdate();
      wrapper
        .find('input[name="heading"]')
        .simulate("change", { target: { value: "this is a heading" } });
      wrapper
        .find('textarea[name="details"]')
        .simulate("change", { target: { value: "here are some details" } });

      const btn = wrapper.find("#submitBtn").first();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Submit Request", () => {
    it("should call submitToAPI", async () => {
      notify.show = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), "submitToAPI");
      wrapper.instance().forceUpdate();
      wrapper
        .find('input[name="heading"]')
        .simulate("change", { target: { value: "this is a heading" } });
      wrapper
        .find('textarea[name="details"]')
        .simulate("change", { target: { value: "here are some details" } });

      wrapper.instance().submitRequest();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Submit Request", () => {
    it("should call showSuccess()", async () => {
      notify.show = jest.fn();
      wrapper.instance().setState({
        title: "this a title",
        details: "these are some details"
      });
      moxios.stubRequest("http://127.0.0.1:5000/v1/users/requests", {
        status: 201,
        response: { data: { message: "new request created" } }
      });
      const spy = jest.spyOn(wrapper.instance(), "showSuccess");
      await wrapper.instance().submitRequest();
      expect(spy).toBeCalled();
    });
  });

  describe("Submit Request", () => {
    it("should call showFailure()", async () => {
      notify.show = jest.fn();
      wrapper.instance().setState({
        title: "this a title",
        details: "these are some details"
      });
      moxios.stubRequest("http://127.0.0.1:5000/v1/users/requests", {
        status: 400,
        response: { data: { message: "admin can not create request" } }
      });
      const spy = jest.spyOn(wrapper.instance(), "showFailure");
      await wrapper.instance().submitRequest();
      expect(spy).toBeCalled();
    });
  });
});
