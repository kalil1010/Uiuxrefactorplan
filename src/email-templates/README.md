# ZokaiHub Email Templates for Supabase

Professional, branded HTML email templates for Supabase authentication events.

## 📧 Templates Included

1. **signup-confirmation.html** - Welcome email with email verification
2. **invite-user.html** - User invitation to join ZokaiHub
3. **magic-link.html** - Passwordless sign-in link
4. **change-email-address.html** - Confirm new email address
5. **reset-password.html** - Password reset link
6. **reauthentication.html** - Identity verification for sensitive actions
7. **password-changed.html** - Confirmation of password change
8. **email-changed.html** - Confirmation of email address change
9. **phone-changed.html** - Confirmation of phone number change
10. **identity-linked.html** - Social provider linked notification
11. **identity-unlinked.html** - Social provider unlinked notification
12. **mfa-added.html** - Two-factor authentication enabled
13. **mfa-removed.html** - Two-factor authentication disabled

## 🎨 Design Features

- **Brand Colors**: Purple (#6556C6), Magenta (#D20EC1), Pink (#C1004C), Coral (#F04050), Yellow (#FFC600)
- **Gradients**: Multiple gradient combinations matching ZokaiHub brand
- **Responsive**: Mobile-optimized layouts
- **Email-Safe**: Inline CSS, table-based layouts for maximum compatibility
- **Professional**: Clean, modern design with proper typography
- **Accessible**: Clear CTAs, readable text, proper contrast

## 📝 Supabase Variables

These templates use Supabase's template variables:

| Variable | Description | Used In |
|----------|-------------|---------|
| `{{ .ConfirmationURL }}` | Action confirmation link | Most templates |
| `{{ .Email }}` | User's email address | All templates |
| `{{ .Token }}` | Verification token | Various |
| `{{ .SentAt }}` | Timestamp of email | Confirmation templates |
| `{{ .Provider }}` | OAuth provider name | Identity templates |
| `{{ .Phone }}` | User's phone number | Phone change |
| `{{ .Factor }}` | MFA method type | MFA templates |

## 🚀 How to Use with Supabase

### Step 1: Access Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Email Templates**

### Step 2: Upload Templates

For each template type:

1. Select the template type (e.g., "Confirm signup")
2. Copy the HTML content from the corresponding file
3. Paste into the Supabase editor
4. Click **Save**

### Template Mapping

| Supabase Template | File to Use |
|-------------------|-------------|
| Confirm signup | `signup-confirmation.html` |
| Invite user | `invite-user.html` |
| Magic Link | `magic-link.html` |
| Change Email Address | `change-email-address.html` |
| Reset Password | `reset-password.html` |

### Step 3: Test Your Templates

```bash
# Test email sending via Supabase CLI or dashboard
supabase functions deploy

# Or use the Supabase dashboard to send test emails
```

## 🎯 Customization

### Update Logo

The templates currently use text-based logo. To add an image logo:

```html
<!-- Replace this: -->
<h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">ZokaiHub</h1>

<!-- With this: -->
<img src="https://your-cdn.com/zokaihub-logo-white.png" alt="ZokaiHub" style="height: 40px;" />
```

### Change Colors

Find and replace these color values:

- `#6556C6` → Primary Purple
- `#D20EC1` → Accent Magenta  
- `#C1004C` → Brand Pink
- `#F04050` → Brand Coral
- `#FFC600` → Brand Yellow

### Customize Support Email

Replace `support@zokaihub.com` with your actual support email address.

### Update Links

Replace placeholder links:
```html
href="https://zokaihub.com/settings/security"
```

## 📱 Testing

### Email Client Testing

Test your templates in:

- Gmail (Web, iOS, Android)
- Outlook (Web, Desktop)
- Apple Mail (macOS, iOS)
- Yahoo Mail
- ProtonMail

### Tools

- [Litmus](https://litmus.com) - Email testing platform
- [Email on Acid](https://www.emailonacid.com) - Email preview tool
- [MailTrap](https://mailtrap.io) - Email testing inbox

## 🔒 Security Best Practices

1. **Never include sensitive data** in email templates
2. **Use HTTPS** for all links
3. **Implement rate limiting** for email sends
4. **Monitor bounce rates** and adjust accordingly
5. **Use SPF, DKIM, and DMARC** for email authentication

## 🌍 Localization

To add multiple languages:

1. Create language-specific versions (e.g., `signup-confirmation-ar.html`)
2. Use Supabase's locale detection
3. Set up language routing in your auth flow

## 📊 Analytics

Track email engagement:

```html
<!-- Add UTM parameters to links -->
<a href="{{ .ConfirmationURL }}?utm_source=email&utm_medium=auth&utm_campaign=signup">
```

## 🛠️ Troubleshooting

### Emails Not Sending

1. Check Supabase email settings
2. Verify SMTP configuration
3. Check spam folders
4. Review Supabase logs

### Styling Issues

1. Use inline CSS only
2. Avoid CSS shorthand
3. Test in multiple clients
4. Use table-based layouts

### Variables Not Replacing

1. Ensure correct variable syntax: `{{ .VariableName }}`
2. Check Supabase documentation for available variables
3. Test with actual auth flows

## 📞 Support

For issues with these templates:
- Email: support@zokaihub.com
- GitHub: [Your Repo]
- Supabase Docs: https://supabase.com/docs/guides/auth/auth-email-templates

## 📄 License

These templates are part of the ZokaiHub project. Please maintain brand consistency when using them.

---

**Created with ❤️ for ZokaiHub**
