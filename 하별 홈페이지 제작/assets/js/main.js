document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var navigation = document.querySelector(".site-navigation");
  var navigationLinks = document.querySelectorAll(".site-navigation a");
  var copyButtons = document.querySelectorAll("[data-copy-text]");

  function setMenuState(isOpen) {
    if (!menuToggle || !navigation) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    menuToggle.classList.toggle("is-open", isOpen);
    navigation.classList.toggle("is-open", isOpen);
  }

  function closeMenu() {
    setMenuState(false);
  }

  function copyText(button) {
    var text = button.getAttribute("data-copy-text");
    var originalText = button.getAttribute("data-original-text") || button.textContent;
    var successText = button.getAttribute("data-copy-success") || "복사되었습니다";

    if (!text) {
      return;
    }

    button.setAttribute("data-original-text", originalText);

    function showResult(message) {
      button.textContent = message;
      window.setTimeout(function () {
        button.textContent = originalText;
      }, 1800);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () {
        showResult(successText);
      }).catch(function () {
        showResult("복사에 실패했습니다");
      });
      return;
    }

    var helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();

    try {
      document.execCommand("copy");
      showResult(successText);
    } catch (error) {
      showResult("복사에 실패했습니다");
    }

    document.body.removeChild(helper);
  }

  if (menuToggle && navigation) {
    setMenuState(false);

    menuToggle.addEventListener("click", function () {
      var isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isExpanded);
    });

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 980) {
          closeMenu();
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (window.innerWidth >= 980) {
        return;
      }

      if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 980) {
        closeMenu();
      }
    });
  }

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      copyText(button);
    });
  });
});
