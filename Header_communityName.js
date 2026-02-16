(function () {

  function getParam(name) {
    return new URL(window.location.href).searchParams.get(name) || "";
  }

  const community = getParam("community");
  if (!community) return;

  const waitForBox = () => {
    const box = document.querySelector(".content-box");

    if (!box) {
      requestAnimationFrame(waitForBox);
      return;
    }

    if (!document.getElementById("communityTitle")) {
      box.insertAdjacentHTML(
        "afterend",
        `<div id="communityTitle"
          style="text-align:center;font-size:18pt;font-weight:bold;color:#236fa1;margin:10px 0">
          רישום לקהילת ${community}
        </div>`
      );
    }
  };

  waitForBox();

})();
