from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class ContactForm(BaseModel):
    name: str
    email: str
    phone: str
    message: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to Thao Truong Art API"}

@app.post("/api/contact")
async def send_email(contact: ContactForm):
    try:
        # Email configuration
        sender_email = os.getenv("EMAIL_USER")
        receiver_email = os.getenv("RECEIVER_EMAIL")
        password = os.getenv("EMAIL_PASSWORD")

        # Create message container
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"New Contact Form Submission from {contact.name}"
        msg['From'] = sender_email
        msg['To'] = receiver_email

        # Create HTML content
        html = f"""
        <html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }}
                    .header {{
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }}
                    .content {{
                        background-color: white;
                        padding: 20px;
                        border-radius: 5px;
                        border: 1px solid #e9ecef;
                    }}
                    .field {{
                        margin-bottom: 15px;
                    }}
                    .label {{
                        font-weight: bold;
                        color: #495057;
                    }}
                    .value {{
                        color: #212529;
                    }}
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="label">Name:</div>
                        <div class="value">{contact.name}</div>
                    </div>
                    <div class="field">
                        <div class="label">Email:</div>
                        <div class="value">{contact.email}</div>
                    </div>
                    <div class="field">
                        <div class="label">Phone:</div>
                        <div class="value">{contact.phone}</div>
                    </div>
                    <div class="field">
                        <div class="label">Message:</div>
                        <div class="value">{contact.message}</div>
                    </div>
                </div>
            </body>
        </html>
        """

        # Attach HTML content
        msg.attach(MIMEText(html, 'html'))

        # Send email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, password)
            server.send_message(msg)

        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 