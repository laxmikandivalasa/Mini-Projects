import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import date

# === CONFIGURATION ===
EMAIL = "laxmikandivalasa47@gmail.com"       # Your Gmail
PASSWORD = "lfrxtvmclqaelhgz"                # App password

recipients = [
    "322103310100@gvpce.ac.in"
    "322103310103@gvpce.ac.in",
    "322103310070@gvpce.ac.in",
    "322103310116@gvpce.ac.in"
    "322103310115@gvpce.ac.in"
    # Add more emails here
]

# === Email Content ===
subject = f"Your Daily Journal - {date.today().strftime('%B %d, %Y')}"
google_form_link = "https://forms.gle/pFXHaN8H9qSbPCdz7"  # Replace with actual link

# --- HTML Email Content ---
html = f"""
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
      <h2 style="color: #4CAF50;">Helloooo! 🌞</h2>
      <p>Click the button and tell me about your day👇</p>
      <a href="{google_form_link}" style="display: inline-block; padding: 10px 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Write My Journal</a>
      <p style="color: gray; font-size: 0.9em; margin-top: 20px;">Stay consistent, you're doing great!<br>– Your Friendly Journal Bot</p>
    </div>
  </body>
</html>
"""

# === Setup the Email ===
msg = MIMEMultipart("alternative")
msg['Subject'] = subject
msg['From'] = EMAIL
msg['To'] = ", ".join(recipients)

# Attach HTML
msg.attach(MIMEText(html, "html"))

# === Send the Email ===
try:
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(EMAIL, PASSWORD)
        server.sendmail(EMAIL, recipients, msg.as_string())
    print("✅ Journal email sent!")
except Exception as e:
    print("❌ Failed to send email:", e)
