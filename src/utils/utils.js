import { notify } from "react-notify-toast";

const showToast = (message = "", backgroundColor = "", textColor = "") => {
  let myColor = { background: backgroundColor, text: textColor };
  notify.show(message, "custom", 2000, myColor);
};
export default showToast;
