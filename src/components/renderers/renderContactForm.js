import { track } from "../../utils/analytics.js";

function createTextField(id, type, label) {
  const field = document.createElement("div");
  field.className = "contact-form-field";

  const labelEl = document.createElement("label");
  labelEl.className = "contact-form-label";
  labelEl.setAttribute("for", id);
  labelEl.textContent = label;

  const input = document.createElement("input");
  input.className = "contact-form-input";
  input.type = type;
  input.id = id;
  input.name = id;
  input.required = true;

  field.append(labelEl, input);
  return { field, input };
}

export function renderContactForm(
  contactFormUI,
  instructionsContainer,
  messagesContainer,
  form,
) {
  const { content } = contactFormUI;

  //Clear existing content
  instructionsContainer.innerHTML = "";
  messagesContainer.innerHTML = "";
  form.innerHTML = "";

  //Instructions
  const instructions = document.createElement("p");
  instructions.className = "form-instructions-text";
  instructions.textContent = content.instructions;
  instructionsContainer.appendChild(instructions);

  //Form fields — `form` is already the <form class="contact-form"> element from contact.html
  form.noValidate = true;

  const { field: fullNameField, input: fullNameInput } = createTextField(
    "contact-full-name",
    "text",
    content.labels.fullName,
  );
  const { field: emailField, input: emailInput } = createTextField(
    "contact-email",
    "email",
    content.labels.email,
  );
  const { field: addressField, input: addressInput } = createTextField(
    "contact-full-address",
    "text",
    content.labels.fullAddress,
  );
  const { field: telField, input: telInput } = createTextField(
    "contact-tel-number",
    "tel",
    content.labels.telNumber,
  );

  //Message field (textarea)
  const messageField = document.createElement("div");
  messageField.className = "contact-form-field";
  const messageLabel = document.createElement("label");
  messageLabel.className = "contact-form-label";
  messageLabel.setAttribute("for", "contact-message");
  messageLabel.textContent = content.labels.message;
  const messageInput = document.createElement("textarea");
  messageInput.className = "contact-form-textarea";
  messageInput.id = "contact-message";
  messageInput.name = "contact-message";
  messageInput.required = true;
  messageField.append(messageLabel, messageInput);

  //Consent checkbox
  const consentField = document.createElement("div");
  consentField.className = "contact-form-consent";
  const consentInput = document.createElement("input");
  consentInput.className = "contact-form-checkbox";
  consentInput.type = "checkbox";
  consentInput.id = "contact-consent";
  consentInput.name = "contact-consent";
  consentInput.required = true;
  const consentLabel = document.createElement("label");
  consentLabel.className = "contact-form-consent-label";
  consentLabel.setAttribute("for", "contact-consent");
  consentLabel.textContent = content.consentLabel;
  consentField.append(consentInput, consentLabel);

  //Submit button
  const submitButton = document.createElement("button");
  submitButton.className = "btn-pill btn-pill--solid contact-form-submit";
  submitButton.type = "submit";
  submitButton.textContent = content.submitLabel;

  form.append(
    fullNameField,
    emailField,
    addressField,
    telField,
    messageField,
    consentField,
    submitButton,
  );

  //Status message helper
  function showMessage(text, status) {
    messagesContainer.innerHTML = "";
    const message = document.createElement("p");
    message.className = `form-message form-message--${status}`;

    const icon = document.createElement("i");
    icon.className =
      status === "success"
        ? "fa-solid fa-circle-check"
        : "fa-solid fa-circle-exclamation";

    const messageText = document.createElement("span");
    messageText.textContent = text;

    message.append(icon, messageText);
    messagesContainer.appendChild(message);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const requiredInputs = [
      fullNameInput,
      emailInput,
      addressInput,
      telInput,
      messageInput,
    ];
    const hasEmptyField = requiredInputs.some(
      (input) => input.value.trim() === "",
    );

    if (hasEmptyField) {
      showMessage(content.messages.required, "error");
      return;
    }

    if (!consentInput.checked) {
      showMessage(content.messages.consent, "error");
      return;
    }

    submitButton.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: content.web3FormsAccessKey,
          subject: `New inquiry from ${fullNameInput.value.trim()}`,
          "Full Name": fullNameInput.value.trim(),
          "Email": emailInput.value.trim(),
          "Full Address": addressInput.value.trim(),
          "Phone Number": telInput.value.trim(),
          "Message": messageInput.value.trim(),
        }),
      });
      const result = await response.json();

      if (result.success) {
        track("contact_form_submitted");
        showMessage(content.messages.success, "success");
        form.reset();
      } else {
        showMessage(content.messages.sendError, "error");
      }
    } catch (error) {
      showMessage(content.messages.sendError, "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}
