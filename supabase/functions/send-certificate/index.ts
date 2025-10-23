import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CertificateEmailRequest {
  donorName: string;
  email: string;
  treeSpecies: string;
  treeId: string;
  plantingDate: string;
  amount: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      donorName,
      email,
      treeSpecies,
      treeId,
      plantingDate,
      amount,
    }: CertificateEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Green Legacy <onboarding@resend.dev>",
      to: [email],
      subject: "🌳 Your Tree Planting Certificate - GREEN LEGACY",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 2px solid #22c55e; border-radius: 0 0 10px 10px; }
            .certificate { background: #f0fdf4; padding: 20px; border-left: 4px solid #22c55e; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #22c55e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">🌳 GREEN LEGACY</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px;">Certificate of Tree Plantation</p>
            </div>
            <div class="content">
              <h2 style="color: #22c55e;">Congratulations, ${donorName}! 🎉</h2>
              <p>Thank you for your contribution to a greener planet. Your tree has been successfully planted!</p>
              
              <div class="certificate">
                <h3 style="color: #22c55e; margin-top: 0;">Certificate Details</h3>
                <p><strong>Donor Name:</strong> ${donorName}</p>
                <p><strong>Tree Species:</strong> ${treeSpecies}</p>
                <p><strong>Tree ID:</strong> ${treeId}</p>
                <p><strong>Planting Date:</strong> ${plantingDate}</p>
                <p><strong>Contribution Amount:</strong> ₹${amount}</p>
              </div>

              <h3 style="color: #22c55e;">Your Environmental Impact</h3>
              <ul>
                <li>Your tree will absorb approximately <strong>22 kg of CO₂</strong> annually</li>
                <li>It will release enough oxygen for <strong>2 people</strong> per year</li>
                <li>Helps conserve <strong>thousands of liters</strong> of water</li>
              </ul>

              <p style="text-align: center;">
                <a href="${Deno.env.get("SUPABASE_URL")?.replace('//', '//').split('/')[2]}/impact" class="button">View Your Impact Dashboard</a>
              </p>

              <h3 style="color: #22c55e;">What's Next?</h3>
              <p>We will send you periodic updates about your tree's growth, including:</p>
              <ul>
                <li>Photos at 3, 6, and 12 months</li>
                <li>Health status and maintenance updates</li>
                <li>Exact geo-tagged location</li>
              </ul>

              <p>You can track your tree anytime by visiting our Impact page with your Tree ID: <strong>${treeId}</strong></p>

              <div class="footer">
                <p>Thank you for being a part of GREEN LEGACY!</p>
                <p style="margin: 5px 0;">🌳 Plant a Memory, Grow a Legacy 🌳</p>
                <p style="font-size: 12px; color: #999; margin-top: 15px;">
                  This is an automated email. Please do not reply directly.<br>
                  For questions, contact us at info@greenlegacy.org
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Certificate email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-certificate function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
