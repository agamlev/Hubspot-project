document.getElementById("lead-form").addEventListener("submit", function(e) {
  e.preventDefault();

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

  fetch(
    "https://api.hsforms.com/submissions/v3/integration/submit/146828710/add43d94-a32e-427c-888e-53be9f6c42ae",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  ).then(res => {
    if (res.ok) {
      document.getElementById("lead-form").style.display = "none";
      document.getElementById("form-success").style.display = "block";
    }
  });
});
