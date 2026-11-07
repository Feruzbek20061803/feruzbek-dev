# FERUZBEK.DEV — Personal IT Universe

**Learn · Build · Share · Improve**

A bilingual (Uzbek/English) personal IT portfolio and open learning platform by Normamatov Feruzbek.

## What is inside

- Personal portfolio, CV, projects and certificate gallery
- Open Knowledge Base for Linux, Cisco networking and MikroTik
- 24-week **CCNA Academy** learning path targeting Cisco 200-301 v2.0
- 24-week **Linux Academy** path from beginner fundamentals to system administration
- Daily lesson checklists and local browser progress tracking
- Interactive learning tools and command library
- PHP admin area for adding/editing lessons and uploading learning resources
- Responsive dark cyber-tech interface
- Character-by-character name intro animation

## Learning tracks

| Track | Length | Planned study time |
|---|---:|---:|
| CCNA Academy | 24 weeks | 168 hours |
| Linux Academy | 24 weeks | 168 hours |
| **Combined routine** | **24 weeks** | **336 hours** |

The intended daily routine is 60 minutes of CCNA plus 60 minutes of Linux. The 24-week plans contain 7 checklist items per week: five guided study days, one practical lab day, and one review/assessment day.

### CCNA scope

The CCNA path is aligned to the Cisco 200-301 v2.0 exam blueprint. It covers network foundations, Ethernet, IPv4/IPv6, subnetting, wireless, switching, VLANs, trunking, STP, routing, OSPF, NAT, ACLs, security, network operations and automation/AI concepts.

**Exam note:** verify the current Cisco exam blueprint and transition dates before scheduling an exam. This independent learning plan is not a Cisco course and does not guarantee certification.

### Linux scope

The Linux path progresses through shell basics, filesystem navigation, text processing, users/groups, permissions, packages, processes, systemd, storage, LVM, RAID, networking, SSH, firewall, monitoring, scheduling, Bash, security, virtualization, Git, Ansible and a final server project.

This is an independent curriculum inspired by common Linux administration skills. It is not a Linux Foundation course or credential and does not guarantee LFCS/RHCSA certification.

## Technology

- PHP 8.2+
- HTML5 / CSS3
- Vanilla JavaScript
- JSON files for the current content store
- Apache-compatible `.htaccess`

The site is a PHP application. **GitHub Pages cannot run this PHP application.** GitHub is used for source control; FPS.ms Web Hosting remains the production host.

## Repository safety

This repository intentionally does **not** include:

- `config.php`
- `data/admin.json`
- `.env` files
- runtime uploads

These files are ignored by `.gitignore`. Do not add production passwords, API keys, database passwords, session tokens or other secrets to commits.

The `certificates/` folder contains the certificate images/PDF intended for the public portfolio. Review these files before making the repository public.

## Local setup

1. Use PHP 8.2 or newer with the `fileinfo` extension enabled.
2. Copy `config.example.php` to `config.php`.
3. Edit `config.php` and set a unique admin username and password hash.
4. Create `data/admin.json` only if you prefer a separate runtime admin credential file; do not commit it.
5. Run a local PHP server from the repository root:

   ```bash
   php -S 127.0.0.1:8000
   ```

6. Open `http://127.0.0.1:8000`.

Generate a password hash from a local terminal:

```bash
php -r "echo password_hash('YOUR-UNIQUE-PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
```

Paste the resulting hash into `ADMIN_PASSWORD_HASH` in `config.php`. Use a unique password of at least 12 characters. Do not reuse the temporary password used during earlier setup.

## Deploy to FPS.ms

1. Back up the live `public_html` directory and the site's current content files.
2. Upload the repository files to the FPS.ms web-hosting `public_html` directory using the provider's file manager or SFTP.
3. Create `config.php` on the server based on `config.example.php`; never upload `config.php` to GitHub.
4. Ensure `data/`, `includes/` and `uploads/` retain their access protection files.
5. Preserve live `data/articles.json`, `data/resources.json`, `data/admin.json` and uploaded resources when deploying code updates.
6. Confirm `index.php` is the DirectoryIndex and verify the site using HTTPS.
7. Test the admin area, lesson pages and uploads after deployment.

This PHP hosting setup is not automatically deployed by GitHub Pages. An FTP/SFTP-based deployment workflow may be configured later if the host supports it and its credentials can be stored securely as GitHub Actions secrets.

## Useful routes

- Home: `index.php`
- Academy hub: `index.php?page=academy`
- CCNA path: `index.php?page=course&track=ccna`
- Linux path: `index.php?page=course&track=linux`
- Knowledge Base: `index.php?page=knowledge`
- Labs: `index.php?page=labs`
- Admin: `admin.php`

## References

- [Cisco CCNA exam topics](https://learningnetwork.cisco.com/s/ccna-exam-topics)
- [Cisco 200-301 v2.0 exam topics PDF](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Linux Foundation — Introduction to Linux](https://training.linuxfoundation.org/training/introduction-to-linux/)
- [Linux Foundation — LFCS instructions](https://docs.linuxfoundation.org/tc-docs/certification/instructions-lfcs-and-lfce)

## Maintainer

Normamatov Feruzbek

- Telegram: [@normamatovferuz](https://t.me/normamatovferuz)
- Instagram: [@feruzbeknormamatovv](https://instagram.com/feruzbeknormamatovv)
- GitHub profile: [Feruzbek20061803](https://github.com/Feruzbek20061803)
