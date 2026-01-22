(function () {
  const form = document.getElementById("lead-form");
  const successEl = document.getElementById("form-success");
  const errorEl = document.getElementById("form-error");
  const submitBtn = document.getElementById("lead-submit");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (successEl) successEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const payload = {
      fields: [
        { name: "firstname", value: e.target.firstname.value },
        { name: "email", value: e.target.email.value }
      ],
      context: {
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
      if (successEl) successEl.style.display = "block";
    } catch (err) {
      if (errorEl) errorEl.style.display = "block";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      }
    }
  });
})();
