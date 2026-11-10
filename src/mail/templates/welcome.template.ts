export interface WelcomeTemplateParams {
  name: string;
  subject?: string;
}

export function buildWelcomeHtml({ name, subject }: WelcomeTemplateParams): string {
  const safeName = name.trim();
  const safeSubject = subject?.trim() ?? '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>¡Bienvenido/a a FisioNat!</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f7f9;font-family:'Roboto',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f6f7f9;">
    Hola ${safeName}, recibimos tu mensaje sobre ${safeSubject}. Gracias por escribirnos a FisioNat  y un especialista te va a contactar en breve.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f7f9;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
          <tr>
            <td align="center" bgcolor="#f6f2f3" style="background-color:#f2e1e5;background-image:linear-gradient(135deg,#f6f2f3 0%,#fdb5c7 100%);padding:32px 24px;text-align:center;">
              <!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:100%;"><v:fill type="gradient" color="#fb9bb3" color2="#fdb5c7" angle="135" /><v:textbox inset="0,0,0,0"><![endif]-->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr>
                  <td align="center">
                    <img src="https://i.postimg.cc/RFFVF1wh/logo-Fisio-Nat.png" width="220" alt="FisioNat" draggable="false" style="display:block;margin:0 auto;border:0;outline:none;text-decoration:none;cursor:default;pointer-events:none;-webkit-user-drag:none;user-select:none;" />
                  </td>
                </tr>
              </table>
              <!--[if mso]></v:textbox></v:rect><![endif]-->
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 0;">
              <h1 style="margin:0 0 16px;color:#1a1a1a;font-family:'Roboto',Arial,sans-serif;font-size:26px;font-weight:bold;line-height:1.35;">¡Hola ${safeName}!</h1>
              <p style="margin:0 0 16px;color:#444444;font-size:15px;line-height:1.8;">Gracias por escribirnos y por confiar en el equipo de FisioNat . Hemos recibido correctamente tu mensaje y estamos muy contentos de que hayas dado este paso.</p>
              <p style="margin:0 0 8px;color:#444444;font-size:15px;line-height:1.8;">Tu consulta sobre <strong style="color:#b04a67;">${safeSubject}</strong> fue registrada correctamente.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#fdf3f6;border:2px dashed #f79fb5;border-radius:12px;">
                <tr>
                  <td style="padding:22px;">
                    <p style="margin:0 0 6px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">¿Qué sigue ahora?</p>
                    <p style="margin:0 0 8px;color:#1a1a1a;font-size:14px;line-height:1.7;">Un especialista de FisioNat  se pondrá en contacto en un plazo de 24 a 48 horas hábiles para coordinar la valoración virtual.</p>
                    <p style="margin:0;color:#1a1a1a;font-size:13px;line-height:1.7;">Mientras tanto, podés escribirnos a <a href="mailto:fisionat1416@gmail.com" style="color:#1a1a1a;">fisionat1416@gmail.com</a>.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="#F79FB5" style="border-radius:50px;background-color:#F79FB5;background-image:linear-gradient(135deg,#F79FB5 0%,#FDB5C7 100%);box-shadow:0 6px 20px rgba(247,159,181,0.35);">
                    <a href="mailto:fisionat1416@gmail.com" target="_blank" style="display:inline-block;padding:14px 32px;font-family:'Roboto',Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:50px;">Hablar con nuestro equipo</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 36px 36px;">
              <p style="margin:0 0 12px;color:#444444;font-size:14px;line-height:1.8;">Estamos muy contentos de que hayas llegado hasta nosotros. Tu recuperación está en buenas manos.</p>
              <p style="margin:0 0 12px;color:#444444;font-size:14px;line-height:1.8;">En breve un especialista se pondrá en contacto para coordinar la valoración. Mientras tanto, no dudes en escribirnos si tenés cualquier duda.</p>
              <p style="margin:24px 0 0;color:#1a1a1a;font-size:14px;line-height:1.8;">Saludos cordiales,<br />El equipo de FisioNat </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;padding:24px;text-align:center;">
              <p style="margin:0 0 6px;color:#595959;font-size:12px;line-height:1.6;">© 2026 FisioNat  S.A. — Rehabilitación Virtual. Todos los derechos reservados.</p>
              <p style="margin:0;color:#595959;font-size:12px;line-height:1.6;">fisionat1416@gmail.com | 661619</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
