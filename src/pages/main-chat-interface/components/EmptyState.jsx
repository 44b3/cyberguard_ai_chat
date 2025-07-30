import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ onQuickStart }) => {
  const quickStartPrompts = [
    {
      icon: "Shield",
      title: "Network Vulnerability Assessment", 
      description: "Guide me through conducting a comprehensive network security assessment",
      prompt: "I need to perform a network vulnerability assessment for my organization. Can you provide a step-by-step methodology including reconnaissance, scanning, enumeration, and reporting phases? Include recommended tools and techniques for each phase."
    },
    {
      icon: "Search",
      title: "Web Application Penetration Testing",
      description: "Help me test web applications for security vulnerabilities",
      prompt: "I'm conducting a web application penetration test. Walk me through the OWASP testing methodology, focusing on the top 10 vulnerabilities. Include practical examples of how to test for SQL injection, XSS, and authentication bypasses."
    },
    {
      icon: "AlertTriangle",
      title: "Red Team Social Engineering",
      description: "Learn ethical social engineering techniques for security testing",
      prompt: "I need to conduct social engineering assessments as part of a red team engagement. Provide guidance on ethical phishing campaigns, pretexting techniques, and physical security testing while maintaining professional boundaries."
    },
    {
      icon: "Code",
      title: "Malware Analysis Fundamentals",
      description: "Understand malware analysis techniques and tools",
      prompt: "Teach me the fundamentals of malware analysis for incident response. Cover static and dynamic analysis techniques, sandbox environments, and tools like IDA Pro, Ghidra, and Wireshark for malware investigation."
    },
    {
      icon: "Database",
      title: "Database Security Testing",
      description: "Learn to assess database security configurations",
      prompt: "I need to perform security testing on database systems. Guide me through database enumeration, privilege escalation techniques, and common misconfigurations to look for in MySQL, PostgreSQL, and MSSQL environments."
    },
    {
      icon: "Wifi",
      title: "Wireless Network Security",
      description: "Test wireless network security implementations",
      prompt: "Help me conduct wireless network security assessments. Cover WPA/WPA2/WPA3 testing methodologies, tools like Aircrack-ng and Kismet, and techniques for detecting rogue access points and evil twin attacks."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* AI Avatar */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent via-primary to-secondary cosmic-glow-intense flex items-center justify-center">
          <Icon name="Shield" size={32} className="text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center animate-cosmic-pulse">
          <Icon name="Zap" size={16} className="text-background" />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
          Welcome to CyberGuard AI
        </h2>
        <p className="text-lg text-muted-foreground mb-2">
          Your advanced cybersecurity assistant specialized in red team operations
        </p>
        <p className="text-sm text-muted-foreground font-data">
          Powered by <span className="text-accent">tngtech/deepseek-r1t2-chimera</span> • Optimized for security testing
        </p>
      </div>

      {/* Capabilities */}
      <div className="mb-8 max-w-4xl">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
          Specialized Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStartPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 text-left hover:cosmic-glow transition-all duration-300 group"
              onClick={() => onQuickStart(prompt.prompt)}
            >
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={prompt.icon} 
                    size={20} 
                    className="text-primary group-hover:text-accent transition-colors" 
                  />
                  <span className="font-medium text-foreground text-sm">
                    {prompt.title}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {prompt.description}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-2xl text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Click on any topic above to get started, or type your own cybersecurity question below.
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} className="text-success" />
            <span>Ethical Testing Only</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span>Authorized Assessments</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} className="text-success" />
            <span>Best Practices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;