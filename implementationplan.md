# Pak Petrol Price (`pakpetrolprice.pk`) Complete Production Implementation Plan

This implementation plan provides the complete step-by-step setup for deploying **Pak Petrol Price** (`pakpetrolprice.pk`), configuring **Cloudflare DNS/CDN**, routing the core web application to **Netlify**, and connecting your headless CMS/blog hosted on **Namecheap**.

---

## 1. System Architecture

```
                                  ┌───────────────────────────────┐
                                  │     Easy Host (Registrar)     │
                                  │   pakpetrolprice.pk Domain    │
                                  │    Delegates Nameservers      │
                                  └───────────────┬───────────────┘
                                                  │
                                                  ▼
                                  ┌───────────────────────────────┐
                                  │      Cloudflare Edge DNS      │
                                  │      (SSL, CDN, Anycast)      │
                                  └───────┬───────────────┬───────┘
                                          │               │
                         A / CNAME (@, www)               │ A Record (cms/blog)
                                          ▼               ▼
                        ┌───────────────────┐   ┌───────────────────┐
                        │  Netlify Hosting  │   │ Namecheap Hosting │
                        │ (Next.js Web App) │   │  (Headless CMS)   │
                        └─────────┬─────────┘   └───────────────────┘
                                  │
                                  ▼
                        ┌───────────────────┐
                        │     Supabase      │
                        │ (PostgreSQL / RLS)│
                        └───────────────────┘
```

| Component | Provider | Role | Subdomain / Address |
|---|---|---|---|
| **Domain Registrar** | Easy Host (`easyhost.pk`) | Domain ownership & nameserver delegation | `pakpetrolprice.pk` |
| **DNS, CDN & Security** | Cloudflare (Free Plan) | Authoritative DNS, Edge Caching, DDoS Protection, SSL | Anycast DNS |
| **Main Web Application** | Netlify | Next.js App Router (OGRA rates, calculators, charts) | `pakpetrolprice.pk` & `www` |
| **Database** | Supabase | Verified price records, products catalog, crawler logs | `qaekfjurwdpauhgknuea.supabase.co` |
| **Automated Crawler** | GitHub Actions | 6-hour cron crawler fetching & verifying rates | `pakpetrolprice/Pak-Petrol-Price` |
| **Headless CMS / Blog** | Namecheap Hosting | WordPress / Ghost / Strapi headless CMS | `cms.pakpetrolprice.pk` |

---

## 2. Credentials & Environment Reference

All components utilize the following shared production parameters:

```env
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://qaekfjurwdpauhgknuea.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<SEE_LOCAL_DOTENV>
SUPABASE_SERVICE_ROLE_KEY=<SEE_LOCAL_DOTENV>

# Crawler Security Secret
CRON_SECRET=<SEE_LOCAL_DOTENV>

# Production Base URL
NEXT_PUBLIC_SITE_URL=https://pakpetrolprice.pk

# Advertising (default off until approved)
NEXT_PUBLIC_ADSENSE_ENABLED=false
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-0000000000000000
```

---

## 3. Phase-by-Phase Execution

### Phase 1: GitHub Secrets & Crawler Automation

1. Navigate to your repository secrets page:
   `https://github.com/pakpetrolprice/Pak-Petrol-Price/settings/secrets/actions`
2. Add the following **Repository Secrets**:
   - `SITE_URL` = `https://pakpetrolprice.pk`
   - `CRON_SECRET` = `695ad9c1f065fba1afa78c9a0eb5f4cc0c675509aec0f64b`
3. Under **Settings** $\rightarrow$ **Actions** $\rightarrow$ **General**:
   - Under *Actions permissions*, select **Allow all actions and reusable workflows**.
   - Under *Workflow permissions*, select **Read and write permissions**.
   - Click **Save**.

---

### Phase 2: Netlify Deployment Configuration

1. In your **Netlify Project Overview**, go to **Site configuration** $\rightarrow$ **Environment variables**.
2. Ensure all 7 variables from Section 2 are imported.
3. Under **Build settings**, verify:
   - **Repository**: `pakpetrolprice/Pak-Petrol-Price`
   - **Branch**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
4. Go to **Deploys** $\rightarrow$ **Trigger deploy** $\rightarrow$ **Deploy site** to build the production site.
5. In **Domain management** $\rightarrow$ click **Add a custom domain**:
   - Type: `pakpetrolprice.pk` $\rightarrow$ click **Verify** $\rightarrow$ **Add domain**.
   - Note down the auto-assigned Netlify site domain (e.g. `your-site-name.netlify.app`).

---

### Phase 3: Cloudflare Setup (Central Traffic Controller)

1. Log into [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Click **Add a site** (or **+ Add Domain**).
3. Enter: `pakpetrolprice.pk` and click **Continue**.
4. Select the **Free ($0/month)** plan and click **Continue**.
5. Cloudflare will scan for existing records; click **Continue** to reach the nameserver assignment screen.
6. Note the **two assigned Cloudflare Nameservers**, for example:
   - `ns1.cloudflare.com` *(example - use your actual assigned names)*
   - `ns2.cloudflare.com`

---

### Phase 4: Easy Host Nameserver Delegation

1. Log in to your **Easy Host Client Portal** (`easyhost.pk`).
2. Go to **Domains** $\rightarrow$ **My Domains** $\rightarrow$ Select **`pakpetrolprice.pk`**.
3. In the management menu, click **Nameservers**.
4. Choose **Custom Nameservers** and enter your 2 Cloudflare nameservers from Phase 3:
   - **Nameserver 1**: *(Cloudflare Nameserver 1)*
   - **Nameserver 2**: *(Cloudflare Nameserver 2)*
5. Click **Save Changes** / **Change Nameservers**.
   *(Note: PKNIC registry updates typically take between 15 and 60 minutes).*

---

### Phase 5: Cloudflare DNS Configuration

In Cloudflare, navigate to **DNS** $\rightarrow$ **Records** and configure the following records:

#### 1. Main Next.js Web Application (Netlify)
- **Record 1 (Apex Domain)**:
  - **Type**: `A`
  - **Name**: `@`
  - **IPv4 Address**: `75.2.60.5`
  - **Proxy status**: **DNS only (Grey Cloud)** during initial verification, switch to **Proxied (Orange Cloud)** after SSL issuance.
  - **TTL**: `Auto`
- **Record 2 (WWW Subdomain)**:
  - **Type**: `CNAME`
  - **Name**: `www`
  - **Target**: `your-site-name.netlify.app` *(your actual Netlify address)*
  - **Proxy status**: **DNS only (Grey Cloud)** initially.
  - **TTL**: `Auto`

#### 2. Headless CMS / Blog (Namecheap Hosting)
- **Record 3 (Headless CMS Subdomain)**:
  - **Type**: `A`
  - **Name**: `cms` (resolves to `cms.pakpetrolprice.pk`)
  - **IPv4 Address**: *(Your Namecheap Shared IP Address from cPanel)*
  - **Proxy status**: **Proxied (Orange Cloud)**
  - **TTL**: `Auto`

---

### Phase 6: Namecheap Headless CMS Configuration

1. Log in to your **Namecheap cPanel**.
2. Locate **General Information** in the right sidebar and copy your **Shared IP Address**.
3. Under **Domains** $\rightarrow$ **Create a New Domain** (or **Subdomains**):
   - **Domain**: `cms.pakpetrolprice.pk` (or `blog.pakpetrolprice.pk`)
   - Uncheck *"Share document root"*
   - Set directory: `/public_html/cms`
   - Click **Submit**.
4. Install your CMS application (e.g. WordPress, Ghost, or Strapi via Softaculous):
   - Choose installation URL: `https://cms.pakpetrolprice.pk`
   - Configure Headless mode (e.g., enable WP REST API or GraphQL plugin `WPGraphQL`).

---

### Phase 7: SSL / TLS and Security Settings in Cloudflare

To prevent infinite redirect loops (`ERR_TOO_MANY_REDIRECTS`) across Cloudflare, Netlify, and Namecheap:

1. In Cloudflare, go to **SSL/TLS** $\rightarrow$ **Overview**.
2. Set SSL/TLS encryption mode to **Full** or **Full (Strict)**.
   *(Do NOT use "Flexible" mode).*
3. In **SSL/TLS** $\rightarrow$ **Edge Certificates**:
   - Turn **Always Use HTTPS** $\rightarrow$ **ON**
   - Turn **Automatic HTTPS Rewrites** $\rightarrow$ **ON**
   - Turn **Minimum TLS Version** $\rightarrow$ **1.2**

---

## 4. Post-Deployment Verification Checklist

Execute these checks after DNS propagation:

- [ ] **Main Site Loads Securely**: Visit `https://pakpetrolprice.pk` — verifies brand logo, navigation, theme toggle, and calculators.
- [ ] **WWW Redirect**: Visit `https://www.pakpetrolprice.pk` — redirects cleanly to `https://pakpetrolprice.pk`.
- [ ] **Database Connectivity**: Verify live fuel price cards show current rates and historical change paisa.
- [ ] **Headless CMS Access**: Visit `https://cms.pakpetrolprice.pk/wp-json` (or `/graphql`) — returns valid JSON payload.
- [ ] **GitHub Crawler Workflow**: Go to GitHub **Actions** $\rightarrow$ **Scheduled Fuel Price Crawler** $\rightarrow$ click **Run workflow** $\rightarrow$ check that the step returns `HTTP 200` and all rates are verified.
