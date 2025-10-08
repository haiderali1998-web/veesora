# Veesora Digital Marketing — Starter Site

This folder contains a small, responsive starter website for the Veesora Digital Marketing Team based on the provided project brief.

Files:
- `index.html` — Home / hero / services preview / testimonials
- `about.html` — About, team and values
- `services.html` — Detailed services
- `portfolio.html` — Case studies / projects
- `contact.html` — Contact form and contact info
- `styles/style.css` — Main stylesheet
- `scripts/main.js` — Small interactive bits (testimonial slider, year)

To view locally:
1. Open `index.html` in a browser (double click or right-click -> Open with...). For local testing with relative paths, use a simple static server.

Example using Python (if installed):
```powershell
# from inside the `veesora-site` folder
python -m http.server 8000; Start-Process "http://localhost:8000"
```

Notes and next steps:
- Replace placeholder analytics snippet in `index.html` with your Google Analytics / GTM ID.
- The contact form currently uses `mailto:` as a placeholder. For production, integrate a backend endpoint or use a service (Formspree, Netlify Forms, or a serverless function) to handle submissions and validation.
- Consider adding images, case study pages, and SEO meta tags per page.

Contact form and payment setup

1) Hosted form endpoint (recommended quick option)

GitHub Pages deploy (workflow added)
----------------------------------

This repository includes a GitHub Actions workflow that will deploy the site to GitHub Pages when you push to `main`.

Steps to publish:
1. Create a GitHub repository (public or private).
	 - Locally you can run (replace REPO_URL):
		 ```powershell
		 git remote add origin REPO_URL
		 git push -u origin main
		 ```
2. In the repository settings -> Pages, ensure GitHub Pages is enabled (the Actions workflow will handle deployment). If Pages requires branch selection, select 'gh-pages' or follow the Actions guidance.

If you want, I can prepare the `git remote add` and attempt to push from here — you'll be prompted for credentials on your machine.

2) Mailto fallback
- If no endpoint is set, the form will open the user's email client with the filled details.

3) Payments
- For simple payments you can use:
	- Stripe Payment Links (create a payment link in your Stripe dashboard and paste the URL into `contact.html` where it says `REPLACE_WITH_PAYMENT_LINK`).
	- PayPal 'Buy Now' or Smart Buttons (PayPal provides hosted links or embedded buttons).
	- Shopify Buy Button for single products.

Security and production notes
- Do not include secret API keys in client-side JS. Use server-side functions for secure payment capture and to keep keys secret.
- For higher reliability and spam protection, use server-side validation, CAPTCHA, and send transactional emails from your server or email provider (SendGrid, Mailgun).

