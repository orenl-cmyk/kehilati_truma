(function () {

  const community = decodeURIComponent(
    new URL(window.location.href).searchParams.get("community") || ""
  );

  if (!community) return;

  const add = () => {

    const box = document.querySelector(".content-box");
    if (!box) return;

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

  setInterval(add, 300);

})();
