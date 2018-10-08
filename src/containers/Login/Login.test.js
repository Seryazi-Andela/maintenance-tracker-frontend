import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../Login/Login";
import { createMemoryHistory } from "history";

describe("login", () => {
  let wrapper;
  let parentWrapper;

  beforeEach(() => {
    moxios.install();
    const history = createMemoryHistory("/dashboard");
    parentWrapper = mount(
      <BrowserRouter>
        <Login history={history} />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(Login);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe("validateEmail", () => {
    it("should call validateEmail() and hide warning", () => {
      const spy = jest.spyOn(wrapper.instance(), "validateEmail");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="email"]');
      userInput.simulate("change", {
        target: { value: "user@gmail.com", name: "email" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("validateEmail", () => {
    it("should call validateEmail() and show warning", () => {
      const spy = jest.spyOn(wrapper.instance(), "validateEmail");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="email"]');
      userInput.simulate("change", {
        target: { value: "2222jjhjchgdhggdchvvcshjg", name: "email" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("validatePassword", () => {
    it("should call validatePassword() and hide warning", () => {
      const spy = jest.spyOn(wrapper.instance(), "validatePassword");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="password"]');
      userInput.simulate("change", {
        target: { value: "aaaaaaaaa", name: "password" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("validatePassword", () => {
    it("should call validatePassword() and show warning", () => {
      const spy = jest.spyOn(wrapper.instance(), "validatePassword");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="password"]');
      userInput.simulate("change", {
        target: { value: "aaa", name: "password" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("Login Button", () => {
    it("should call loginUser() ", () => {
      const spy = jest.spyOn(wrapper.instance(), "loginUser");
      wrapper.instance().forceUpdate();
      wrapper
        .find('input[name="email"]')
        .simulate("change", { target: { value: "x@gmail.com" } });
      wrapper
        .find('input[name="password"]')
        .simulate("change", { target: { value: "#abc@12234" } });

      const btn = wrapper.find("#loginBtn").first();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onDismissEmailAlert", () => {
    it("should hide email alert", () => {
      wrapper.instance().setState({
        showEmailAlert: true
      });
      wrapper.instance().onDismissEmailAlert();
      expect(wrapper.instance().state.showEmailAlert).toBe(false);
    });
  });

  describe("onDismissPasswordAlert", () => {
    it("should hide password alert", () => {
      wrapper.instance().setState({
        showPasswordAlert: true
      });
      wrapper.instance().onDismissPasswordAlert();
      expect(wrapper.instance().state.showPasswordAlert).toBe(false);
    });
  });

  describe("deactivateLoginButton", () => {
    it("should deactivate Login Button", () => {
      wrapper.instance().setState({
        disable: false
      });
      wrapper.instance().deactivateLoginButton();
      expect(wrapper.instance().state.disable).toBe(true);
    });
  });

  describe("loginUser", () => {
    it("should push to dahsboard", async () => {
      wrapper.instance().setState({
        email: "user@gamil.com",
        password: "aaaaaaaaaa"
      });
      moxios.stubRequest("https://maintenance-tracker-skipper.herokuapp.com/v1/auth/login", {
        status: 200,
        response: { token: "sssssssssss" }
      });
      const spy = jest.spyOn(wrapper.instance(), "setTokenAndPush");
      await wrapper.instance().loginUser();
      expect(spy).toHaveBeenCalled();
    });
  });

});
