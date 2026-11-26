export function transformContactForm(copy, contactInformation, language) {
  //Build Contact Form UI structure
  return {
    type: "contactForm",
    content: {
      web3FormsAccessKey: contactInformation.web3FormsAccessKey,
      instructions: copy.instructions[language],
      labels: {
        fullName: copy.labels.fullName[language],
        email: copy.labels.email[language],
        fullAddress: copy.labels.fullAddress[language],
        telNumber: copy.labels.telNumber[language],
        message: copy.labels.message[language],
      },
      consentLabel: copy.consentLabel[language],
      submitLabel: copy.submitLabel[language],
      messages: {
        required: copy.requiredError[language],
        consent: copy.consentError[language],
        success: copy.successMessage[language],
        sendError: copy.sendError[language],
      },
    },
  };
}
