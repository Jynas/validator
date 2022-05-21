import { shallowMount } from "@vue/test-utils";
import validatorCard from "@/views/validatorCard";

describe("validatorCard", () => {
  it("Меньше 16 символов", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({ cardNumber: "44443333" });
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });
  it("Больше 16 символов", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({ cardNumber: "44443333222211110000000000000000" });
    expect(wrapper.find(".errorBig")).toBeTruthy();
  });
  it("Карта не поддерживается", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({
      cardNumber: "000000000000000000000000000000000000000000000",
    });
    expect(wrapper.find(".text_type")).toBeTruthy();
  });

  it("Mir", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({
      cardNumber: "2222222222222222",
    });
    expect(wrapper.find(".Img")).toBeTruthy();
  });
  it("Visa", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({
      cardNumber: "4444444444444444",
    });
    expect(wrapper.find(".Img")).toBeTruthy();
  });
  it("Mastercard", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({
      cardNumber: "5252525252525252",
    });
    expect(wrapper.find(".Img")).toBeTruthy();
  });
  it("Sber", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({
      cardNumber: "547942",
    });
    expect(wrapper.find(".Img2")).toBeTruthy();
  });
  it("Tinkoff", () => {
    const wrapper = shallowMount(validatorCard, {
      data() {
        return {
          cardNumber: "",
        };
      },
    });
    wrapper.setData({
      cardNumber: "518901",
    });
    expect(wrapper.find(".Img2")).toBeTruthy();
  });
});
