function pop(el) {
  var popup = document.getElementById("imgPopup");
  var img = popup.querySelector("img");
  img.src = el.currentSrc || el.src;
  img.alt = el.alt || "";
  popup.style.display = "flex";
}

function toggleAcc(btn) {
  var content = btn.nextElementSibling;
  var open = content.style.display === "block";
  content.style.display = open ? "none" : "block";
  btn.setAttribute("aria-expanded", open ? "false" : "true");
}

function closePopup() {
  var popup = document.getElementById("thankYouPopup");
  if (popup) popup.style.display = "none";
}

function closeImg() {
  var popup = document.getElementById("imgPopup");
  if (popup) popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("form[data-freeclass]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      fetch(form.action, {
        method: "POST",
        body: new FormData(form)
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (!data || data.success === false) {
            throw new Error("submit failed");
          }
          var popup = document.getElementById("thankYouPopup");
          if (popup) popup.style.display = "flex";
          form.reset();
        })
        .catch(function () {
          alert("Error sending message. Please try again or call 253-254-6538.");
        })
        .finally(function () {
          if (button) button.disabled = false;
        });
    });
  });

  var video = document.getElementById("academyVideo");
  var playBtn = document.getElementById("academyVideoPlay");
  if (video && playBtn) {
    var loadAndPlay = function () {
      if (!video.getAttribute("src")) {
        video.src = video.getAttribute("data-src");
        video.controls = true;
      }
      playBtn.hidden = true;
      var playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {});
      }
    };
    playBtn.addEventListener("click", loadAndPlay);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePopup();
    closeImg();
  }
});
