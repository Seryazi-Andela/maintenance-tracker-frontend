import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { EditRequest } from "../EditRequest/EditRequest";
import { notify } from "react-notify-toast";

describe("EditRequest", () => {
  let wrapper;
  let parentWrapper;
  const props = {
    location: { state: { id: "id", title: "title", details: "details" } }
  };
  beforeEach(() => {
    moxios.install();
    parentWrapper = mount(
      <BrowserRouter>
        <EditRequest {...props} />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(EditRequest);
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

  describe("Edit Button", () => {
    it("should call submitEdit()", () => {
      notify.show = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), "submitEdit");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("#submitBtn").first();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Edit button", () => {
    it("should not pass empty values if case", () => {
      notify.show = jest.fn();
      wrapper.instance().setState({ id: "", title: "", details: "" });
      const spy = jest.spyOn(wrapper.instance(), "submitEdit");
      wrapper.instance().forceUpdate();

      const btn = wrapper.find("#submitBtn").first();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Submit Edit", () => {
    it("should call showSuccess()", async () => {
      notify.show = jest.fn();
      wrapper.instance().setState({
        id: 1,
        title: "this a title",
        details: "these are some details"
      });
      moxios.stubRequest("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests/1", {
        status: 201,
        response: { data: { message: "Success! entry edited" } }
      });
      const spy = jest.spyOn(wrapper.instance(), "showSuccess");
      await wrapper.instance().submitEdit();
      expect(spy).toBeCalled();
    });
  });

  describe("Submit Edit", () => {
    it("should call showFailure()", async () => {
      notify.show = jest.fn();
      wrapper.instance().setState({
        id: 1,
        title: "this a title",
        details: "these are some details"
      });
      moxios.stubRequest("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests/1", {
        status: 400,
        response: { data: { message: "admin can not create request" } }
      });
      const spy = jest.spyOn(wrapper.instance(), "showFailure");
      await wrapper.instance().submitEdit();
      expect(spy).toBeCalled();
    });
  });
});
