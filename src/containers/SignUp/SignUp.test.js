import { mount, shallow } from "enzyme";
import moxios from "moxios";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SignUp } from "../SignUp/SignUp";
import { createMemoryHistory } from "history";

describe("SignUp", () => {
  let wrapper;
  let parentWrapper;
  beforeEach(() => {
    moxios.install();
    const history = createMemoryHistory("/");
    parentWrapper = mount(
      <BrowserRouter>
        <SignUp history={history} />
      </BrowserRouter>
    );
    wrapper = parentWrapper.find(SignUp);
  });

  afterEach(() => {
    moxios.uninstall();
    parentWrapper.unmount();
  });

  describe("validateUsername", () => {
    it("should call validateUsername() and hide warning", () => {
      const spy = jest.spyOn(wrapper.instance(), "validateUsername");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="username"]');
      userInput.simulate("change", {
        target: { value: "seryazi", name: "username" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("validateUsername", () => {
    it("should call validateUsername() and show a warning", () => {
      const spy = jest.spyOn(wrapper.instance(), "validateUsername");
      wrapper.instance().forceUpdate();

      const userInput = wrapper.find('input[name="username"]');
      userInput.simulate("change", {
        target: { value: "ser", name: "username" }
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onDismissUsernameAlert", () => {
    it("should hide username alert", () => {
      wrapper.instance().setState({
        showUsernameAlert: true
      });
      wrapper.instance().onDismissUsernameAlert();
      expect(wrapper.instance().state.showUsernameAlert).toBe(false);
    });
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

  describe("onDismissEmailAlert", () => {
    it("should hide email alert", () => {
      wrapper.instance().setState({
        showEmailAlert: true
      });
      wrapper.instance().onDismissEmailAlert();
      expect(wrapper.instance().state.showEmailAlert).toBe(false);
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

  describe("onDismissPasswordAlert", () => {
    it("should hide password alert", () => {
      wrapper.instance().setState({
        showPasswordAlert: true
      });
      wrapper.instance().onDismissPasswordAlert();
      expect(wrapper.instance().state.showPasswordAlert).toBe(false);
    });
  });

  describe("onAsAdminChange", () => {
    it("should test true case", () => {
      wrapper.instance().setState({
        isAdmin: false
      });
      wrapper.instance().onAsAdminChange();
      expect(wrapper.instance().state.isAdmin).toBe(true);
    });
  });

  describe("onAsAdminChange", () => {
    it("should test false case", () => {
      wrapper.instance().setState({
        isAdmin: true
      });
      wrapper.instance().onAsAdminChange();
      expect(wrapper.instance().state.isAdmin).toBe(false);
    });
  });

  describe("signupUser", () => {
    it("should call signupUser()", () => {
      const spy = jest.spyOn(wrapper.instance(), "signupUser");
      wrapper.instance().forceUpdate();
      wrapper
        .find('input[name="username"]')
        .simulate("change", { target: { value: "iamauser" } });
      wrapper
        .find('input[name="email"]')
        .simulate("change", { target: { value: "user@gmail.com" } });
      wrapper
        .find('input[name="password"]')
        .simulate("change", { target: { value: "#abc@12234" } });

      const btn = wrapper.find("#signupBtn").first();
      btn.simulate("click", { preventDefault: () => {} });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("signupUser", () => {
    it("should push to login", async () => {
      wrapper.instance().setState({
        email: "user@gamil.com",
        username: "iamauseryall",
        password: "aaaaaaaaaa",
        validEmail: true,
        validUsername: true,
        validPassword: true
      });
      moxios.stubRequest("http://127.0.0.1:5000/v1/auth/signup", {
        status: 201,
        response: { message: "new user created" }
      });
      const spy = jest.spyOn(wrapper.instance(), "pushTologin");
      await wrapper.instance().signupUser();
      expect(spy).toHaveBeenCalled();
    });
  });
});
