const fs = require('fs');

// Configuration
const TOTAL_LOGS = 1000;
const SUSPICIOUS_RATIO = 0.1; // 10%

// Helper to get random integer
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to get random item from array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Data pools
const protocols = ['TCP', 'UDP', 'HTTP', 'HTTPS'];
const normalPorts = [80, 443, 8080, 3000];
const suspiciousPorts = [22, 23, 3389, 445, 1433];
const normalStatuses = [200, 201];
const suspiciousStatuses = [403, 401, 502, 503];

const logs = [];

for (let i = 0; i < TOTAL_LOGS; i++) {
    const isSuspicious = Math.random() < SUSPICIOUS_RATIO;

    // Choose port and status based on type
    const port = isSuspicious ? randomItem(suspiciousPorts) : randomItem(normalPorts);
    const status = isSuspicious ? randomItem(suspiciousStatuses) : randomItem(normalStatuses);

    const log = {
        timestamp: new Date(Date.now() - randomInt(0, 86400000)).toISOString(),
        source_ip: `192.168.1.${randomInt(1, 254)}`,
        destination_ip: `10.0.0.${randomInt(1, 254)}`,
        protocol: randomItem(protocols),
        port: port, // Now using the port variable
        payload_size: isSuspicious ? randomInt(5000, 50000) : randomInt(100, 1500),
        status_code: status, // Now using the status variable
        type: isSuspicious ? 'SUSPICIOUS' : 'NORMAL',
        details: isSuspicious ? 'Port scan attempt detected' : 'Standard request'
    };

    logs.push(log);
}

// Write to file
const outputPath = '../traffic_logs.json';
fs.writeFileSync(outputPath, JSON.stringify(logs, null, 2));

console.log(`Successfully generated ${TOTAL_LOGS} logs to ${outputPath}`);
console.log(`Suspicious logs: ${logs.filter(l => l.type === 'SUSPICIOUS').length}`);
console.log(`Normal logs: ${logs.filter(l => l.type === 'NORMAL').length}`);