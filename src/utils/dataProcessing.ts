import { ThreatData, VulnerabilityData, IncidentData } from '../context/DataContext';
export async function processCsvFile(file: File, type: 'threats' | 'vulnerabilities' | 'incidents'): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        // Validate CSV format first
        validateCSVFormat(text, type);
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        const processedData = rows.slice(1).filter(row => row.trim() !== '').map((row, index) => {
          const values = row.split(',').map(value => value.trim());
          const record: any = {
            id: index + 1
          };
          headers.forEach((header, i) => {
            let value = values[i];
            // Remove quotes if present
            if (value && value.startsWith('"') && value.endsWith('"')) {
              value = value.slice(1, -1);
            }
            // Convert specific fields based on data type
            if (header === 'confidence' || header === 'cvss_score') {
              const numValue = parseFloat(value);
              if (isNaN(numValue)) {
                throw new Error(`Invalid number format for "${header}" in row ${index + 2}`);
              }
              value = numValue;
            } else if (header === 'severity') {
              const validSeverities = ['Critical', 'High', 'Medium', 'Low'];
              const matchedSeverity = validSeverities.find(s => s.toLowerCase() === value.toLowerCase());
              if (!matchedSeverity) {
                throw new Error(`Invalid severity "${value}" in row ${index + 2}. Must be one of: ${validSeverities.join(', ')}`);
              }
              value = matchedSeverity;
            }
            record[header] = value;
          });
          return record;
        });
        validateData(processedData, type);
        resolve(processedData);
      } catch (error) {
        reject(new Error(`Error processing CSV file: ${(error as Error).message}`));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsText(file);
  });
}
function validateData(data: any[], type: 'threats' | 'vulnerabilities' | 'incidents') {
  const requiredFields = {
    threats: ['name', 'category', 'severity', 'source', 'timestamp', 'description', 'confidence', 'status'],
    vulnerabilities: ['name', 'severity', 'cvss_score', 'affected_systems', 'status', 'discovered_date', 'description'],
    incidents: ['name', 'type', 'severity', 'status', 'timestamp', 'description', 'affected_assets']
  };
  const required = requiredFields[type];
  data.forEach((item, index) => {
    required.forEach(field => {
      if (item[field] === undefined || item[field] === '') {
        throw new Error(`Missing required field "${field}" in row ${index + 1}`);
      }
    });
    // Additional type-specific validations
    if (type === 'threats' && (item.confidence < 0 || item.confidence > 1)) {
      throw new Error(`Confidence score must be between 0 and 1 in row ${index + 1}`);
    }
    if (type === 'vulnerabilities' && (item.cvss_score < 0 || item.cvss_score > 10)) {
      throw new Error(`CVSS score must be between 0 and 10 in row ${index + 1}`);
    }
  });
}
function validateCSVFormat(text: string, type: 'threats' | 'vulnerabilities' | 'incidents' | 'compliance'): void {
  const rows = text.split('\n');
  if (rows.length < 2) {
    throw new Error('CSV file must contain at least a header row and one data row');
  }
  const headers = rows[0].toLowerCase().split(',').map(h => h.trim());
  const requiredFields = {
    threats: ['name', 'category', 'severity', 'source', 'timestamp', 'description', 'confidence', 'status'],
    vulnerabilities: ['name', 'severity', 'cvss_score', 'affected_systems', 'status', 'discovered_date', 'description'],
    incidents: ['name', 'type', 'severity', 'status', 'timestamp', 'description', 'affected_assets'],
    compliance: ['framework', 'control', 'status', 'score', 'finding']
  };
  const missingFields = requiredFields[type].filter(field => !headers.includes(field));
  if (missingFields.length > 0) {
    throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
  }
  // Validate each row
  rows.slice(1).forEach((row, index) => {
    if (row.trim() === '') return; // Skip empty rows
    const values = row.split(',').map(v => v.trim());
    if (values.length !== headers.length) {
      throw new Error(`Row ${index + 2} has ${values.length} columns but should have ${headers.length} columns`);
    }
    // Create a map of field names to values
    const rowData = headers.reduce((acc, header, i) => {
      acc[header] = values[i];
      return acc;
    }, {} as Record<string, string>);
    // Check required fields have values
    requiredFields[type].forEach(field => {
      const value = rowData[field];
      if (!value || value.trim() === '') {
        throw new Error(`Empty value found for "${field}" in row ${index + 2}. All required fields must have values.`);
      }
    });
    // Validate severity if present
    if (rowData['severity']) {
      const validSeverities = ['Critical', 'High', 'Medium', 'Low'];
      const severity = rowData['severity'].trim();
      if (!validSeverities.some(v => v.toLowerCase() === severity.toLowerCase())) {
        throw new Error(`Invalid severity "${severity}" in row ${index + 2}. Must be one of: ${validSeverities.join(', ')}`);
      }
    }
  });
}
export function generateCsvTemplate(type: 'threats' | 'vulnerabilities' | 'incidents'): string {
  const headers = {
    threats: ['name', 'category', 'severity', 'source', 'timestamp', 'description', 'confidence', 'status'],
    vulnerabilities: ['name', 'severity', 'cvss_score', 'affected_systems', 'status', 'discovered_date', 'description'],
    incidents: ['name', 'type', 'severity', 'status', 'timestamp', 'description', 'affected_assets']
  };
  const examples = {
    threats: ['Example Threat', 'Malware', 'High', 'SIEM', '2024-01-01 00:00:00', 'Description here', '0.85', 'Active'],
    vulnerabilities: ['Example Vulnerability', 'Critical', '7.5', 'Web Server', 'Open', '2024-01-01', 'Description here'],
    incidents: ['Example Incident', 'Breach', 'High', 'Open', '2024-01-01 00:00:00', 'Description here', 'Server-01']
  };
  return headers[type].join(',') + '\n' + examples[type].join(',');
}
export function generateSampleCsv(type: 'threats' | 'vulnerabilities' | 'incidents'): string {
  const sampleData = {
    threats: [{
      name: "Trojan Malware ABC",
      category: "Malware",
      severity: "High",
      source: "SIEM",
      timestamp: "2023-10-15 08:23:45",
      description: "Detected trojan malware attempting to establish C2 communication.",
      confidence: 0.87,
      status: "Active"
    }, {
      name: "Crypto Ransomware XYZ",
      category: "Ransomware",
      severity: "Critical",
      source: "Endpoint Protection",
      timestamp: "2023-10-22 14:56:32",
      description: "Potential crypto ransomware activity detected with file encryption attempts.",
      confidence: 0.92,
      status: "Investigating"
    }],
    vulnerabilities: [{
      name: "SQL Injection",
      severity: "Critical",
      cvss_score: 9.2,
      affected_systems: "Application Web Server",
      status: "Open",
      discovered_date: "2023-11-01",
      description: "SQL injection vulnerability in login form"
    }, {
      name: "Cross-Site Scripting",
      severity: "High",
      cvss_score: 7.5,
      affected_systems: "Web Application",
      status: "In Progress",
      discovered_date: "2023-11-02",
      description: "XSS vulnerability in user profile page"
    }],
    incidents: [{
      name: "Ransomware Attack",
      type: "Ransomware",
      severity: "Critical",
      status: "In Progress",
      timestamp: "2023-11-10 14:23:42",
      description: "Ransomware encrypting database backup files detected.",
      affected_assets: "Database Server"
    }, {
      name: "Unauthorized Access",
      type: "Access Control",
      severity: "High",
      status: "Resolved",
      timestamp: "2023-11-09 08:17:36",
      description: "Unauthorized login detected from unusual location",
      affected_assets: "Authentication System"
    }]
  };
  const headers = {
    threats: ['name', 'category', 'severity', 'source', 'timestamp', 'description', 'confidence', 'status'],
    vulnerabilities: ['name', 'severity', 'cvss_score', 'affected_systems', 'status', 'discovered_date', 'description'],
    incidents: ['name', 'type', 'severity', 'status', 'timestamp', 'description', 'affected_assets']
  };
  const data = sampleData[type];
  const header = headers[type].join(',');
  const rows = data.map(item => headers[type].map(key => typeof item[key as keyof typeof item] === 'string' ? `"${item[key as keyof typeof item]}"` : item[key as keyof typeof item]).join(','));
  return [header, ...rows].join('\n');
}
export async function processBulkCsvFiles(files: File[]): Promise<{
  threats?: any[];
  vulnerabilities?: any[];
  incidents?: any[];
  compliance?: any[];
}> {
  const results: {
    threats?: any[];
    vulnerabilities?: any[];
    incidents?: any[];
    compliance?: any[];
  } = {};
  for (const file of files) {
    const fileName = file.name.toLowerCase();
    try {
      if (fileName.includes('threat')) {
        results.threats = await processCsvFile(file, 'threats');
      } else if (fileName.includes('vulnerabilit')) {
        results.vulnerabilities = await processCsvFile(file, 'vulnerabilities');
      } else if (fileName.includes('incident')) {
        results.incidents = await processCsvFile(file, 'incidents');
      } else if (fileName.includes('compliance')) {
        // Process compliance data with specific validation
        const data = await processCsvFile(file, 'compliance');
        results.compliance = data;
      }
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
      throw new Error(`Error processing ${fileName}: ${(error as Error).message}`);
    }
  }
  return results;
}