(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  }

  const form = $("lead-form");
  if (!form) return;

  const successEl = $("form-success");
  const errorEl = $("form-error");
  const submitBtn = $("lead-submit");

  function hide(el) {
    if (el) el.style.display = "none";
  }

  function show(el) {
    if (el) el.style.display = "block";
  }

  function setSubmitting(isSubmitting) {
    if (!submitBtn) return;
    submitBtn.disabled = isSubmitting;
    submitBtn.textContent = isSubmitting ? "Sending..." : "Submit";
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    hide(successEl);
    hide(errorEl);
    setSubmitting(true);

    const firstname = e.target.firstname?.value || "";
    const email = e.target.email?.value || "";

    const payload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "email", value: email }
      ],
      context: {
        hutk: getCookie("hubspotutk"),
        pageUri: window.location.href,
        pageName: document.title
      }
    };

    try {
      const res = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/146828710/add43d94-a32e-427c-888e-53be9f6c42ae",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error("HubSpot submission failed");

      form.style.display = "none";
      show(successEl);
    } catch (err) {
      show(errorEl);
    } finally {
      setSubmitting(false);
    }
  });
})();
