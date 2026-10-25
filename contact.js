(() => {
  const form = document.querySelector('#collaboration-form');
  const status = document.querySelector('#form-status');
  const recipient = 'jothsnapraveena1421@gmail.com';
  function draft() {
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const topic = data.get('topic');
    const message = data.get('message').trim();
    if (!name || !message) {
      status.textContent = 'Please enter your name and a message.';
      return null;
    }
    return {
      subject: `${topic} — ${name}`,
      body: `Hi Jothsna,\n\n${message}\n\nFrom: ${name}\nReply email: ${email}`
    };
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const content = draft();
    if (!content) return;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(content.subject)}&body=${encodeURIComponent(content.body)}`;
    status.textContent = 'Email draft requested. Send it from your email app. If nothing opened, use Copy message and paste it into an email to ' + recipient + '.';
  });
  document.querySelector('#copy-message').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const content = draft();
    if (!content) return;
    try {
      await navigator.clipboard.writeText(`To: ${recipient}\nSubject: ${content.subject}\n\n${content.body}`);
      status.textContent = 'Copied. Paste into your email app and send to ' + recipient + '.';
    } catch {
      status.textContent = 'Copy is unavailable in this browser. You can select your message above and copy it manually, then email ' + recipient + '.';
    }
  });
})();
