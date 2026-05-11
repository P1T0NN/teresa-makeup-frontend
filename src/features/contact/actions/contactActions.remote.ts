// SVELTEKIT IMPORTS
import { RESEND_API_KEY } from '$env/static/private';
import { command } from '$app/server';

// LIBRARIES
import { Resend } from 'resend';
import { m } from '@/shared/lib/paraglide/messages';

// CONFIG
import { COMPANY_DATA } from '@/shared/constants';

// SCHEMAS
import { sendContactFormEmailSchema } from '@/features/contact/schemas/contactSchemas';

// TEMPLATES
import { buildContactFormEmail } from '@/features/contact/templates/contactFormEmailTemplate';

const resend = new Resend(RESEND_API_KEY);

export const sendContactFormEmail = command(
    sendContactFormEmailSchema,
    async (data) => {
		const { subject, html, text, replyTo } = buildContactFormEmail(data);

		const { error } = await resend.emails.send({
			from: `Formulario de Contacto Web <${COMPANY_DATA.RESEND_EMAIL}>`,
			to: [COMPANY_DATA.EMAIL],
			replyTo,
			subject,
			html,
			text
		});

		if (error) {
			return {
                success: false,
                message: error.message,
                data: null,
            }
		}

		return {
            success: true,
            message: m["GenericMessages.EMAIL_SENT_SUCCESSFULLY"](),
            data: null,
        }
    }
);
