
interface SecurityTopic {
  keywords: string[];
  response: string;
}

export const securityTopics: SecurityTopic[] = [
  {
    keywords: ['malware', 'virus', 'trojan', 'spyware', 'ransomware', 'worm', 'malicious', 'infection'],
    response: "Malware is malicious software designed to damage or gain unauthorized access to systems. Common types include viruses, trojans, ransomware, and spyware. Always use updated antivirus software and avoid downloading files from untrusted sources."
  },
  {
    keywords: ['phishing', 'scam', 'fraud', 'fake', 'email', 'spam', 'social engineering'],
    response: "Phishing is a cyber attack where attackers pose as legitimate entities to steal sensitive information. Look for: suspicious sender emails, urgent requests, grammatical errors, and hover over links before clicking."
  },
  {
    keywords: ['encryption', 'encrypt', 'cipher', 'cryptography', 'secure', 'hash'],
    response: "Encryption is the process of converting data into a code to prevent unauthorized access. Always use HTTPS websites and encrypt sensitive files using strong algorithms like AES-256."
  },
  {
    keywords: ['firewall', 'filter', 'block', 'network security', 'protection'],
    response: "A firewall is a network security device that monitors and filters incoming/outgoing traffic. It's crucial for preventing unauthorized access and protecting against network-based threats."
  },
  {
    keywords: ['vpn', 'virtual private network', 'proxy', 'tunnel', 'private browsing'],
    response: "A VPN (Virtual Private Network) encrypts your internet traffic and masks your IP address. Use it when connecting to public WiFi or accessing sensitive information online."
  },
  {
    keywords: ['password', 'authentication', 'login', 'credential', '2fa', 'mfa', 'two factor'],
    response: "Create strong passwords using a mix of uppercase, lowercase, numbers, and symbols. Use unique passwords for each account and consider a password manager. Enable 2FA when available."
  }
];

export const calculateSimilarity = (str1: string, str2: string): number => {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  
  if (str1 === str2) return 1;
  if (str1.includes(str2) || str2.includes(str1)) return 0.8;
  
  const str1Length = str1.length;
  const str2Length = str2.length;
  
  const matrix = Array(str1Length + 1).fill(null).map(() => Array(str2Length + 1).fill(null));
  
  for (let i = 0; i <= str1Length; i++) matrix[i][0] = i;
  for (let j = 0; j <= str2Length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= str1Length; i++) {
    for (let j = 1; j <= str2Length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  
  const distance = matrix[str1Length][str2Length];
  const maxLength = Math.max(str1Length, str2Length);
  return 1 - distance / maxLength;
};

export const analyzeSecurityQuestion = (question: string): string => {
  const words = question.toLowerCase().split(/\s+/);
  let bestMatch = {
    topic: null as SecurityTopic | null,
    similarity: 0
  };
  
  for (const word of words) {
    for (const topic of securityTopics) {
      for (const keyword of topic.keywords) {
        const similarity = calculateSimilarity(word, keyword);
        if (similarity > 0.7 && similarity > bestMatch.similarity) {
          bestMatch = {
            topic,
            similarity
          };
        }
      }
    }
  }
  
  return bestMatch.topic
    ? bestMatch.topic.response
    : "I can help you with cybersecurity topics like malware, phishing, encryption, firewalls, VPNs, and password security. Please ask a security-related question.";
};
