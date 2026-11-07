export interface NotificationTemplateParams {
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  subject: string;
  message: string;
}

export function buildNotificationHtml({
  name,
  lastName,
  email,
  cellphone,
  subject,
  message,
}: NotificationTemplateParams): string {
  const fullName = `${name} ${lastName}`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Nueva consulta recibida - FisioNat</title>
</head>
<body style="margin:0;padding:0;background-color:#f6f7f9;font-family:'Roboto',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f6f7f9;">
    Nueva consulta de ${fullName} sobre ${subject}. Revisa los datos y responde a la brevedad.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f7f9;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
          <tr>
            <td align="center" bgcolor="#f6f2f3" style="background-color:#f2e1e5;background-image:linear-gradient(135deg,#f6f2f3 0%,#fdb5c7 100%);padding:32px 24px;text-align:center;">
              <!--[if mso]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:100%;"><v:fill type="gradient" color="#f7bbca" color2="#fdb5c7" angle="135" /><v:textbox inset="0,0,0,0"><![endif]-->
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
              <p style="margin:0 0 10px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Formulario web</p>
              <h1 style="margin:0 0 12px;color:#1a1a1a;font-family:'Roboto',Arial,sans-serif;font-size:26px;font-weight:bold;line-height:1.35;">Nueva consulta recibida</h1>
              <p style="margin:0 0 20px;color:#444444;font-size:15px;line-height:1.8;">Ingresó una nueva solicitud de valoración desde el sitio web. Revisa los datos del paciente y responde para coordinar el seguimiento.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:separate;border-spacing:0;background-color:#fffafc;border:1px solid #f1d7df;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:18px 20px;background-color:#fdf3f6;border-bottom:1px solid #f1d7df;">
                    <p style="margin:0 0 4px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;">Paciente</p>
                    <p style="margin:0;color:#1a1a1a;font-size:18px;font-weight:bold;line-height:1.4;">${fullName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 20px;background-color:#fdf3f6;border-bottom:1px solid #f1d7df;">
                    <p style="margin:0 0 4px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;">Servicio de interés</p>
                    <p style="margin:0;color:#1a1a1a;font-size:15px;font-weight:bold;line-height:1.6;">${subject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 20px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                      <tr>
                        <td width="50%" valign="top" style="width:50%;padding:14px 10px 0 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border:1px solid #ececec;border-radius:10px;">
                            <tr>
                              <td style="padding:14px;">
                                <p style="margin:0 0 6px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Correo</p>
                                <p style="margin:0;color:#1a1a1a;font-size:14px;line-height:1.6;word-break:break-word;">${email}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" valign="top" style="width:50%;padding:14px 0 0 10px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border:1px solid #ececec;border-radius:10px;">
                            <tr>
                              <td style="padding:14px;">
                                <p style="margin:0 0 6px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">WhatsApp</p>
                                <p style="margin:0;color:#1a1a1a;font-size:14px;line-height:1.6;">${cellphone}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#ffffff;border:1px solid #ececec;border-left:4px solid #f79fb5;border-radius:10px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 8px;color:#595959;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">Descripción del caso</p>
                    <p style="margin:0;color:#1a1a1a;font-size:14px;line-height:1.8;white-space:pre-line;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="#F79FB5" style="border-radius:50px;background-color:#F79FB5;background-image:linear-gradient(135deg,#F79FB5 0%,#FDB5C7 100%);box-shadow:0 6px 20px rgba(247,159,181,0.35);">
                    <a href="https://wa.me/${encodeURIComponent(cellphone)}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:'Roboto',Arial,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:50px;">Responder por WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 36px 36px;">
              <p style="margin:0;color:#444444;font-size:14px;line-height:1.8;">Responde al paciente a la brevedad para coordinar la valoración y definir el siguiente paso.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#fafafa;padding:24px;text-align:center;">
              <p style="margin:0 0 6px;color:#595959;font-size:12px;line-height:1.6;">© 2026 FisioNat S.A. — Rehabilitación Virtual. Todos los derechos reservados.</p>
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
