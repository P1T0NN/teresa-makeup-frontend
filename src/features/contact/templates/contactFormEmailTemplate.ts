// CONFIG
import { COMPANY_DATA } from '@/shared/constants';

type ContactFormEmailData = {
	name: string;
	email: string;
	message: string;
};

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

export function buildContactFormEmail({ name, email, message }: ContactFormEmailData) {
	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
	const receivedAt = new Date().toLocaleString('es-ES', {
		timeZone: COMPANY_DATA.SALON_TIMEZONE,
		dateStyle: 'full',
		timeStyle: 'short'
	});

	const subject = `Nuevo mensaje de ${name} — ${COMPANY_DATA.NAME}`;

	const text = [
		`Nuevo mensaje del formulario de contacto — ${COMPANY_DATA.NAME}`,
		`Recibido: ${receivedAt}`,
		'',
		`Nombre: ${name}`,
		`Correo: ${email}`,
		'',
		'Mensaje:',
		message
	].join('\n');

	const html = `<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="color-scheme" content="light" />
		<meta name="supported-color-schemes" content="light" />
		<title>${escapeHtml(subject)}</title>
	</head>
	<body style="margin:0;padding:0;background-color:#f6f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f1b16;">
		<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
			${escapeHtml(`Nuevo mensaje de ${name}: ${message.slice(0, 90)}`)}
		</div>
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f1ec;padding:32px 16px;">
			<tr>
				<td align="center">
					<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(31,27,22,0.06);">
						<tr>
							<td style="padding:28px 32px;background:linear-gradient(135deg,#2b211b 0%,#3d2f25 100%);color:#f6f1ec;">
								<p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.75;">${escapeHtml(COMPANY_DATA.NAME)}</p>
								<h1 style="margin:6px 0 0 0;font-size:22px;font-weight:600;letter-spacing:-0.01em;">Nuevo mensaje del formulario de contacto</h1>
							</td>
						</tr>
						<tr>
							<td style="padding:28px 32px 8px 32px;">
								<p style="margin:0 0 4px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8a7d72;">Recibido</p>
								<p style="margin:0 0 24px 0;font-size:14px;color:#3d2f25;">${escapeHtml(receivedAt)}</p>

								<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;">
									<tr>
										<td style="padding:14px 16px;background-color:#f9f5f1;border-radius:8px;">
											<p style="margin:0 0 2px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a7d72;">De</p>
											<p style="margin:0;font-size:16px;font-weight:600;color:#1f1b16;">${safeName}</p>
											<p style="margin:4px 0 0 0;font-size:14px;">
												<a href="mailto:${safeEmail}" style="color:#7a5a3f;text-decoration:none;">${safeEmail}</a>
											</p>
										</td>
									</tr>
								</table>

								<div style="height:20px;line-height:20px;">&nbsp;</div>

								<p style="margin:0 0 8px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a7d72;">Mensaje</p>
								<div style="padding:18px 20px;background-color:#ffffff;border:1px solid #ece4dc;border-left:3px solid #7a5a3f;border-radius:6px;font-size:15px;line-height:1.6;color:#1f1b16;">${safeMessage}</div>

								<div style="height:28px;line-height:28px;">&nbsp;</div>

								<table role="presentation" cellpadding="0" cellspacing="0" border="0">
									<tr>
										<td style="border-radius:6px;background-color:#2b211b;">
											<a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: tu mensaje — ' + COMPANY_DATA.NAME)}"
												style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#f6f1ec;text-decoration:none;border-radius:6px;">
												Responder a ${safeName}
											</a>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td style="padding:24px 32px 28px 32px;border-top:1px solid #ece4dc;">
								<p style="margin:0;font-size:12px;color:#8a7d72;">
									Este mensaje se ha enviado desde el formulario de contacto de
									<a href="https://teresamakeup.es" style="color:#7a5a3f;text-decoration:none;">teresamakeup.es</a>.
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>`;

	return { subject, html, text, replyTo: email };
}
