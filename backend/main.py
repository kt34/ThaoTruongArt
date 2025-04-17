from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
from datetime import datetime

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

@app.get("/ping")
async def ping():
    return {"message": "pong"}

def send_confirmation_email(client_email: str, client_name: str):
    sender_email = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASSWORD")

    msg = MIMEMultipart('alternative')
    msg['Subject'] = "Thank You for Reaching Out - Thao Truong Art"
    msg['From'] = sender_email
    msg['To'] = client_email

    current_year = datetime.now().year

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
                    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
                    padding: 40px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }}
                .logo-text {{
                    color: white;
                    font-size: 32px;
                    font-weight: bold;
                    margin: 0;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                    letter-spacing: 1px;
                }}
                .content {{
                    background-color: white;
                    padding: 30px;
                    border-radius: 5px;
                    border: 1px solid #e9ecef;
                }}
                .greeting {{
                    font-size: 24px;
                    color: #2c3e50;
                    margin-bottom: 20px;
                }}
                .message {{
                    margin-bottom: 20px;
                    color: #34495e;
                }}
                .signature {{
                    margin-top: 30px;
                    font-style: italic;
                    color: #7f8c8d;
                }}
                .footer {{
                    margin-top: 30px;
                    text-align: center;
                    font-size: 12px;
                    color: #95a5a6;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h1 class="logo-text">Thao Truong Art</h1>
            </div>
            <div class="content">
                <div class="greeting">Dear {client_name},</div>
                <div class="message">
                    Thank you for reaching out to Thao Truong Art. We have received your message and appreciate your interest in our work.
                </div>
                <div class="message">
                    Thao will review your inquiry personally and will be in touch with you soon to discuss your needs and how we can work together.
                </div>
                <div class="message">
                    In the meantime, feel free to explore our collections on our website and follow us on social media for the latest updates and artwork.
                </div>
                <div class="signature">
                    Warm regards,<br>
                    Thao Truong Art Team
                </div>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply to this email.</p>
                <p>© {current_year} Thao Truong Art. All rights reserved.</p>
            </div>
        </body>
    </html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender_email, password)
        server.send_message(msg)

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
                        background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
                        padding: 40px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        text-align: center;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }}
                    .logo-text {{
                        color: white;
                        font-size: 32px;
                        font-weight: bold;
                        margin: 0;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                        letter-spacing: 1px;
                    }}
                    .content {{
                        background-color: white;
                        padding: 30px;
                        border-radius: 5px;
                        border: 1px solid #e9ecef;
                    }}
                    .field {{
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: #f8f9fa;
                        border-radius: 5px;
                    }}
                    .label {{
                        font-weight: bold;
                        color: #495057;
                        margin-bottom: 5px;
                        display: block;
                    }}
                    .value {{
                        color: #212529;
                    }}
                </style>
            </head>
            <body>
                <div class="header">
                    <h1 class="logo-text">New Contact Form Submission</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Name:</span>
                        <div class="value">{contact.name}</div>
                    </div>
                    <div class="field">
                        <span class="label">Email:</span>
                        <div class="value">{contact.email}</div>
                    </div>
                    <div class="field">
                        <span class="label">Phone:</span>
                        <div class="value">{contact.phone}</div>
                    </div>
                    <div class="field">
                        <span class="label">Message:</span>
                        <div class="value">{contact.message}</div>
                    </div>
                </div>
            </body>
        </html>
        """

        # Attach HTML content
        msg.attach(MIMEText(html, 'html'))

        # Send email to admin
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, password)
            server.send_message(msg)

        # Send confirmation email to client
        send_confirmation_email(contact.email, contact.name)

        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 