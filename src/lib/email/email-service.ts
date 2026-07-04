import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface BookingConfirmationEmail {
  to: string;
  name: string;
  bookingReference: string;
  selectedTier: string;
  isUrgent: boolean;
  totalPrice: number;
  preferredDate: string;
  preferredTime: string;
  legalArea: string;
  phone: string;
  message?: string;
}

export async function sendBookingConfirmationEmail(
  data: BookingConfirmationEmail,
) {
  const {
    to,
    name,
    bookingReference,
    selectedTier,
    isUrgent,
    totalPrice,
    preferredDate,
    preferredTime,
    legalArea,
    phone,
    message,
  } = data;

  const tierNames = {
    basic: "Basis Beratung",
    premium: "Premium Beratung",
  };

  // Format date to German format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Buchungsbestätigung</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0; opacity: 0.9; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .booking-ref { background: #e5e7eb; padding: 10px 15px; border-radius: 6px; font-family: monospace; font-weight: bold; }
          .details { margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: 600; color: #4b5563; }
          .detail-value { color: #1f2937; }
          .urgent-badge { background: #f97316; color: white; padding: 2px 10px; border-radius: 12px; font-size: 12px; display: inline-block; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; font-size: 14px; color: #6b7280; }
          .button { display: inline-block; background: #1a1a2e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✓ Buchungsbestätigung</h1>
          <p>Ihre Beratung wurde erfolgreich gebucht</p>
        </div>
        
        <div class="content">
          <p>Hallo <strong>${name}</strong>,</p>
          
          <p>vielen Dank für Ihre Buchung bei <strong>JusticeHub</strong>. Ihre Anfrage wurde erfolgreich entgegengenommen und wir haben einen Termin für Sie reserviert.</p>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <strong>Ihre Buchungsreferenz:</strong>
            <div class="booking-ref">${bookingReference}</div>
          </div>
          
          <div class="details">
            <h3 style="margin-bottom: 10px;">Termindetails</h3>
            <div class="detail-row">
              <span class="detail-label">Datum:</span>
              <span class="detail-value">${formatDate(preferredDate)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Uhrzeit:</span>
              <span class="detail-value">${preferredTime}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Paket:</span>
              <span class="detail-value">${tierNames[selectedTier as keyof typeof tierNames] || selectedTier}</span>
            </div>
            ${
              isUrgent
                ? `
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value"><span class="urgent-badge">⚡ Eil-Service</span></span>
              </div>
            `
                : ""
            }
            <div class="detail-row">
              <span class="detail-label">Rechtsgebiet:</span>
              <span class="detail-value">${legalArea}</span>
            </div>
            ${
              phone
                ? `
              <div class="detail-row">
                <span class="detail-label">Telefon:</span>
                <span class="detail-value">${phone}</span>
              </div>
            `
                : ""
            }
            <div class="detail-row" style="font-weight: bold; border-bottom: 2px solid #d1d5db; padding-top: 12px;">
              <span class="detail-label">Gesamtpreis:</span>
              <span class="detail-value" style="font-size: 18px; color: #1a1a2e;">${formatPrice(totalPrice)}</span>
            </div>
          </div>
          
          ${
            message
              ? `
            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <strong>Ihre Nachricht:</strong>
              <p style="margin: 5px 0 0;">${message}</p>
            </div>
          `
              : ""
          }
          
          <div style="background: #dbeafe; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              <strong>📋 Was passiert als nächstes?</strong><br>
              Sie erhalten in Kürze eine separate Bestätigung von unserem Team mit weiteren Details zum Ablauf der Beratung.
            </p>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">
            Bei Fragen stehen wir Ihnen gerne zur Verfügung.<br>
            Kontaktieren Sie uns unter <a href="mailto:support@justicehub.com" style="color: #1a1a2e;">support@justicehub.com</a>
          </p>
          
          <div class="footer">
            <p style="margin: 0;">© ${new Date().getFullYear()} JusticeHub. Alle Rechte vorbehalten.</p>
            <p style="margin: 5px 0 0; font-size: 12px;">
              Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese E-Mail.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "JusticeHub <bookings@justicehub.com>",
      to: [to],
      subject: `Buchungsbestätigung - ${bookingReference}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send email");
    }

    console.log("Email sent successfully:", emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

// Send email to admin when new booking is created
export async function sendAdminNotificationEmail(
  data: BookingConfirmationEmail,
) {
  const {
    name,
    email,
    bookingReference,
    selectedTier,
    isUrgent,
    totalPrice,
    preferredDate,
    preferredTime,
    legalArea,
    phone,
    message,
  } = data;

  const tierNames = {
    basic: "Basis Beratung",
    premium: "Premium Beratung",
  };

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Neue Buchung - ${bookingReference}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a2e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: 600; color: #4b5563; }
          .detail-value { color: #1f2937; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 Neue Buchung eingegangen</h1>
        </div>
        <div class="content">
          <p><strong>Referenz:</strong> ${bookingReference}</p>
          <div class="detail-row"><span class="detail-label">Name:</span><span class="detail-value">${name}</span></div>
          <div class="detail-row"><span class="detail-label">Email:</span><span class="detail-value">${email}</span></div>
          <div class="detail-row"><span class="detail-label">Telefon:</span><span class="detail-value">${phone || "N/A"}</span></div>
          <div class="detail-row"><span class="detail-label">Rechtsgebiet:</span><span class="detail-value">${legalArea}</span></div>
          <div class="detail-row"><span class="detail-label">Paket:</span><span class="detail-value">${tierNames[selectedTier as keyof typeof tierNames]}</span></div>
          <div class="detail-row"><span class="detail-label">Datum:</span><span class="detail-value">${preferredDate}</span></div>
          <div class="detail-row"><span class="detail-label">Uhrzeit:</span><span class="detail-value">${preferredTime}</span></div>
          <div class="detail-row"><span class="detail-label">Eil-Service:</span><span class="detail-value">${isUrgent ? "✅ Ja" : "❌ Nein"}</span></div>
          <div class="detail-row"><span class="detail-label">Betrag:</span><span class="detail-value">€${totalPrice.toFixed(2)}</span></div>
          ${message ? `<div style="margin-top: 15px; padding: 10px; background: #f3f4f6; border-radius: 4px;"><strong>Nachricht:</strong><p>${message}</p></div>` : ""}
        </div>
      </body>
    </html>
  `;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM || "JusticeHub <notifications@justicehub.com>",
      to: [process.env.ADMIN_EMAIL || "admin@justicehub.com"],
      subject: `Neue Buchung - ${bookingReference}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Admin email send error:", error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Error sending admin email:", error);
    return { success: false, error };
  }
}
