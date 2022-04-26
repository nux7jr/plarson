function afterDOMContentLoaded(callback) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "interactive") {
      callback();
      document.addEventListener("DOMContentLoaded", () => {
        callback();
      });
    }
  });
}

const myFunction = () => {
  console.log("hello world");
};

afterDOMContentLoaded(myFunction);

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded");
});
