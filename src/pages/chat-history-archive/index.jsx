import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CosmicBackground from '../../components/ui/CosmicBackground';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ConversationCard from './components/ConversationCard';
import BulkActions from './components/BulkActions';
import ConversationModal from './components/ConversationModal';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ChatHistoryArchive = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversations, setSelectedConversations] = useState(new Set());
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [filters, setFilters] = useState({
    domain: 'all',
    sortBy: 'date-desc',
    duration: 'all',
    dateRange: 'all'
  });

  // Mock conversation data
  const mockConversations = [
    {
      id: 1,
      title: "SQL Injection Vulnerability Assessment",
      domain: "vulnerability-assessment",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      duration: 1847, // seconds
      messageCount: 23,
      preview: "Discussed SQL injection techniques for web application testing, including union-based, boolean-based, and time-based blind SQL injection methods. Covered prevention strategies and secure coding practices.",
      tags: ["SQL Injection", "Web Security", "OWASP", "Database Security"],
      hasAttachments: true,
      isBookmarked: true,
      messages: [
        {
          role: "user",
          content: "I need help understanding SQL injection vulnerabilities for a web application penetration test.",
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          role: "assistant",
          content: "I'll help you understand SQL injection vulnerabilities. SQL injection is a code injection technique that exploits security vulnerabilities in an application's software when user input is not properly sanitized.\n\nHere are the main types:\n\n1. **Union-based SQL Injection**\n2. **Boolean-based Blind SQL Injection**\n3. **Time-based Blind SQL Injection**\n4. **Error-based SQL Injection**\n\nWould you like me to explain each type in detail?",
          timestamp: new Date(Date.now() - 86395000)
        }
      ]
    },
    {
      id: 2,
      title: "Network Penetration Testing Methodology",
      domain: "penetration-testing",
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      duration: 2156,
      messageCount: 31,
      preview: "Comprehensive discussion on network penetration testing phases including reconnaissance, scanning, enumeration, vulnerability assessment, exploitation, and post-exploitation activities.",
      tags: ["Network Security", "Penetration Testing", "Reconnaissance", "Exploitation"],
      hasAttachments: false,
      isBookmarked: false,
      messages: [
        {
          role: "user",
          content: "Can you walk me through a complete network penetration testing methodology?",
          timestamp: new Date(Date.now() - 172800000)
        },
        {
          role: "assistant",
          content: "Absolutely! Here's a comprehensive network penetration testing methodology:\n\n**Phase 1: Pre-Engagement**\n- Define scope and rules of engagement\n- Obtain proper authorization\n- Set up testing environment\n\n**Phase 2: Information Gathering**\n- Passive reconnaissance\n- Active reconnaissance\n- OSINT collection\n\n**Phase 3: Threat Modeling**\n- Identify attack vectors\n- Prioritize targets\n- Plan attack strategies\n\nWould you like me to dive deeper into any specific phase?",
          timestamp: new Date(Date.now() - 172795000)
        }
      ]
    },
    {
      id: 3,
      title: "Malware Analysis Techniques",
      domain: "malware-analysis",
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      duration: 3421,
      messageCount: 45,
      preview: "Deep dive into static and dynamic malware analysis techniques, including sandbox environments, reverse engineering tools, and behavioral analysis methods for identifying malicious code patterns.",
      tags: ["Malware Analysis", "Reverse Engineering", "Sandbox", "Dynamic Analysis"],
      hasAttachments: true,
      isBookmarked: true,
      messages: [
        {
          role: "user",
          content: "I need to analyze a suspicious executable file. What\'s the best approach for malware analysis?",
          timestamp: new Date(Date.now() - 259200000)
        },
        {
          role: "assistant",
          content: "Great question! Malware analysis should always be done in a controlled environment. Here's a systematic approach:\n\n**Static Analysis (Safe)**\n- File hash verification\n- String analysis\n- PE header examination\n- Entropy analysis\n\n**Dynamic Analysis (Sandboxed)**\n- Behavioral monitoring\n- Network traffic analysis\n- System call tracing\n- Memory analysis\n\n**Tools you'll need:**\n- IDA Pro or Ghidra for disassembly\n- Process Monitor for system monitoring\n- Wireshark for network analysis\n- Virtual machines for isolation\n\nAlways start with static analysis first. Would you like me to explain any specific technique?",
          timestamp: new Date(Date.now() - 259195000)
        }
      ]
    },
    {
      id: 4,
      title: "Social Engineering Attack Vectors",
      domain: "social-engineering",
      createdAt: new Date(Date.now() - 345600000), // 4 days ago
      duration: 1234,
      messageCount: 18,
      preview: "Exploration of social engineering tactics including phishing, pretexting, baiting, and tailgating. Discussed psychological principles and defense strategies for organizations.",
      tags: ["Social Engineering", "Phishing", "Human Psychology", "Security Awareness"],
      hasAttachments: false,
      isBookmarked: false,
      messages: [
        {
          role: "user",
          content: "What are the most effective social engineering techniques used in modern attacks?",
          timestamp: new Date(Date.now() - 345600000)
        },
        {
          role: "assistant",
          content: "Social engineering remains one of the most effective attack vectors. Here are the primary techniques:\n\n**1. Phishing**\n- Email-based deception\n- Spear phishing (targeted)\n- Whaling (executive targeting)\n\n**2. Pretexting**\n- Creating false scenarios\n- Impersonation attacks\n- Authority exploitation\n\n**3. Baiting**\n- Physical media drops\n- Malicious downloads\n- USB drops\n\n**4. Tailgating/Piggybacking**\n- Physical access exploitation\n- Following authorized personnel\n\nThe key is exploiting human psychology - trust, authority, urgency, and fear. Would you like me to elaborate on any specific technique?",
          timestamp: new Date(Date.now() - 345595000)
        }
      ]
    },
    {
      id: 5,
      title: "Web Application Security Testing",
      domain: "web-security",
      createdAt: new Date(Date.now() - 432000000), // 5 days ago
      duration: 2890,
      messageCount: 37,
      preview: "Comprehensive web application security assessment covering OWASP Top 10 vulnerabilities, authentication bypass techniques, and secure development practices.",
      tags: ["Web Security", "OWASP", "Authentication", "XSS", "CSRF"],
      hasAttachments: true,
      isBookmarked: true,
      messages: [
        {
          role: "user",
          content: "I\'m conducting a web application security assessment. Can you guide me through the OWASP Top 10?",
          timestamp: new Date(Date.now() - 432000000)
        },
        {
          role: "assistant",
          content: "Absolutely! The OWASP Top 10 2021 represents the most critical web application security risks:\n\n**A01:2021 – Broken Access Control**\n- Moved up from 5th position\n- 94% of applications tested had some form of broken access control\n\n**A02:2021 – Cryptographic Failures**\n- Previously known as Sensitive Data Exposure\n- Focus on failures related to cryptography\n\n**A03:2021 – Injection**\n- Dropped to 3rd position\n- Includes SQL, NoSQL, OS, and LDAP injection\n\n**A04:2021 – Insecure Design**\n- New category focusing on design flaws\n- Represents missing or ineffective control design\n\nWould you like me to continue with the remaining categories and testing methodologies for each?",
          timestamp: new Date(Date.now() - 431995000)
        }
      ]
    },
    {
      id: 6,
      title: "Threat Intelligence Analysis",
      domain: "threat-analysis",
      createdAt: new Date(Date.now() - 518400000), // 6 days ago
      duration: 1567,
      messageCount: 22,
      preview: "Analysis of current threat landscape including APT groups, attack patterns, and indicators of compromise. Discussed threat hunting methodologies and intelligence gathering techniques.",
      tags: ["Threat Intelligence", "APT", "IOC", "Threat Hunting"],
      hasAttachments: false,
      isBookmarked: false,
      messages: [
        {
          role: "user",
          content: "How do I effectively analyze threat intelligence data for my organization?",
          timestamp: new Date(Date.now() - 518400000)
        },
        {
          role: "assistant",
          content: "Effective threat intelligence analysis requires a structured approach:\n\n**1. Collection**\n- Open source intelligence (OSINT)\n- Commercial threat feeds\n- Government sources\n- Industry sharing groups\n\n**2. Processing**\n- Data normalization\n- Correlation analysis\n- Context enrichment\n- Quality assessment\n\n**3. Analysis**\n- Pattern recognition\n- Attribution analysis\n- Campaign tracking\n- Predictive analysis\n\n**4. Dissemination**\n- Tactical indicators\n- Strategic assessments\n- Operational intelligence\n- Technical reports\n\nKey frameworks to consider:\n- MITRE ATT&CK\n- Diamond Model\n- Cyber Kill Chain\n\nWhat specific aspect would you like to explore further?",
          timestamp: new Date(Date.now() - 518395000)
        }
      ]
    }
  ];

  // Filter and search conversations
  const filteredConversations = useMemo(() => {
    let filtered = [...mockConversations];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(conv => 
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply domain filter
    if (filters.domain !== 'all') {
      filtered = filtered.filter(conv => conv.domain === filters.domain);
    }

    // Apply duration filter
    if (filters.duration !== 'all') {
      filtered = filtered.filter(conv => {
        const minutes = conv.duration / 60;
        switch (filters.duration) {
          case 'short': return minutes < 5;
          case 'medium': return minutes >= 5 && minutes <= 30;
          case 'long': return minutes > 30;
          default: return true;
        }
      });
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(conv => {
        const convDate = new Date(conv.createdAt);
        const diffTime = now - convDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        switch (filters.dateRange) {
          case 'today': return diffDays < 1;
          case 'week': return diffDays < 7;
          case 'month': return diffDays < 30;
          case 'quarter': return diffDays < 90;
          case 'year': return diffDays < 365;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'duration-desc':
          return b.duration - a.duration;
        case 'duration-asc':
          return a.duration - b.duration;
        case 'messages-desc':
          return b.messageCount - a.messageCount;
        case 'messages-asc':
          return a.messageCount - b.messageCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockConversations, searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      domain: 'all',
      sortBy: 'date-desc',
      duration: 'all',
      dateRange: 'all'
    });
    setSearchQuery('');
  };

  const handleSelectConversation = (conversationId) => {
    setSelectedConversations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(conversationId)) {
        newSet.delete(conversationId);
      } else {
        newSet.add(conversationId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setSelectedConversations(new Set(filteredConversations.map(conv => conv.id)));
  };

  const handleDeselectAll = () => {
    setSelectedConversations(new Set());
  };

  const handleBulkExport = () => {
    const selectedConvs = filteredConversations.filter(conv => 
      selectedConversations.has(conv.id)
    );
    console.log('Exporting conversations:', selectedConvs);
    // Export functionality would be implemented here
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedConversations.size} conversations? This action cannot be undone.`)) {
      console.log('Deleting conversations:', Array.from(selectedConversations));
      setSelectedConversations(new Set());
      // Delete functionality would be implemented here
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleConversationExport = (conversation) => {
    console.log('Exporting conversation:', conversation);
    // Export functionality would be implemented here
  };

  const handleConversationDelete = (conversation) => {
    if (window.confirm(`Are you sure you want to delete "${conversation.title}"? This action cannot be undone.`)) {
      console.log('Deleting conversation:', conversation);
      setSelectedConversation(null);
      // Delete functionality would be implemented here
    }
  };

  const handleContinueConversation = (conversation) => {
    console.log('Continuing conversation:', conversation);
    navigate('/main-chat-interface', { state: { continueConversation: conversation } });
  };

  const handleStartChat = () => {
    navigate('/main-chat-interface');
  };

  const getEmptyStateType = () => {
    if (searchQuery && filteredConversations.length === 0) {
      return 'no-search-results';
    }
    if ((filters.domain !== 'all' || filters.duration !== 'all' || filters.dateRange !== 'all') && filteredConversations.length === 0) {
      return 'no-filtered-results';
    }
    return 'no-conversations';
  };

  const isAllSelected = filteredConversations.length > 0 && 
    filteredConversations.every(conv => selectedConversations.has(conv.id));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CosmicBackground animationIntensity="normal" deviceCapabilities="high" />
      <Header />
      <Sidebar />
      
      <main className="md:ml-64 pt-16 md:pt-16 pb-20 md:pb-8">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center cosmic-glow">
                <Icon name="Archive" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Chat History Archive
                </h1>
                <p className="text-muted-foreground">
                  Access and manage your cybersecurity analysis conversations
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <SearchBar
                onSearch={handleSearch}
                onClear={handleClearSearch}
                searchValue={searchQuery}
                placeholder="Search conversations, topics, or security domains..."
              />
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {filteredConversations.length} conversation{filteredConversations.length !== 1 ? 's' : ''}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStartChat}
                  iconName="Plus"
                  iconPosition="left"
                  className="cosmic-glow"
                >
                  New Chat
                </Button>
              </div>
            </div>

            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isExpanded={isFilterExpanded}
              onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
            />
          </div>

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedConversations.size}
            totalCount={filteredConversations.length}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onBulkExport={handleBulkExport}
            onBulkDelete={handleBulkDelete}
            isAllSelected={isAllSelected}
          />

          {/* Conversations Grid */}
          {filteredConversations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {filteredConversations.map((conversation) => (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  onSelect={handleConversationSelect}
                  onDelete={handleConversationDelete}
                  onExport={handleConversationExport}
                  isSelected={selectedConversations.has(conversation.id)}
                  onToggleSelect={handleSelectConversation}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type={getEmptyStateType()}
              onStartChat={handleStartChat}
              onClearFilters={handleClearFilters}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>

      {/* Conversation Modal */}
      {selectedConversation && (
        <ConversationModal
          conversation={selectedConversation}
          onClose={() => setSelectedConversation(null)}
          onContinue={handleContinueConversation}
          onExport={handleConversationExport}
          onDelete={handleConversationDelete}
        />
      )}
    </div>
  );
};

export default ChatHistoryArchive;