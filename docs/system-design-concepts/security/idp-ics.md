## **IDS/IPS Overview**

**IDS** = **Intrusion Detection System**
**IPS** = **Intrusion Prevention System**

These are security technologies that monitor network traffic and system activities for malicious behavior and policy violations.

## **Key Differences**

| Aspect | IDS (Detection) | IPS (Prevention) |
|---|---|---|
| **Primary Function** | **Monitors and Alerts** | **Monitors and Blocks** |
| **Response** | Passive - notifies about threats | Active - stops threats in real-time |
| **Network Position** | Out-of-band (parallel to traffic flow) | In-line (traffic flows through it) |
| **Impact on Performance** | Minimal - doesn't affect traffic flow | Can add latency - all traffic passes through |
| **False Positives** | Alerts only - no service disruption | Can block legitimate traffic |

## **How They Work**

### **IDS (Intrusion Detection System)**
```
Internet → Firewall → Router → [Traffic Copy] → IDS → Alert/Log
                           ↓
                        Servers (traffic continues normally)
```

**IDS Process:**
1. Monitors network traffic passively
2. Analyzes patterns against known attack signatures
3. Generates alerts when suspicious activity detected
4. Logs incidents for forensic analysis
5. **Does NOT block traffic**

### **IPS (Intrusion Prevention System)**
```
Internet → Firewall → IPS → Router → Servers
                      ↑
                 (Blocks malicious traffic)
```

**IPS Process:**
1. All network traffic flows through IPS
2. Real-time analysis of packets
3. Compares against threat signatures and behavioral patterns
4. **Automatically blocks** malicious traffic
5. Allows legitimate traffic to continue

## **Detection Methods**

### **1. Signature-Based Detection**
- Matches traffic against database of known attack patterns
- Example signatures:
```
SQL Injection: "SELECT * FROM users WHERE id='1' OR '1'='1'"
Buffer Overflow: Specific byte patterns that exploit vulnerabilities
Malware Communication: Known command-and-control server communications
```

### **2. Anomaly-Based Detection**
- Establishes baseline of "normal" network behavior
- Detects deviations from normal patterns
- Examples:
```
- Unusual data transfer volumes
- Connections to suspicious geographic locations
- Abnormal login patterns (time, frequency, location)
- Unexpected protocol usage
```

### **3. Behavioral Analysis**
- Monitors user and system behavior over time
- Detects insider threats and advanced persistent threats (APTs)