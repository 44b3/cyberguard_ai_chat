import OpenAI from 'openai';

/**
 * OpenAI Service for CyberGuard AI
 * Specialized for cybersecurity and red team operations
 */
class OpenAIService {
  constructor() {
    this.model = 'tngtech/deepseek-r1t2-chimera:free';
    this.client = null;
    this.apiKey = null;
    this.initializeClient();
    
    this.systemPrompt = `You are CyberGuard AI, an advanced cybersecurity assistant specialized in red team operations, penetration testing, and security analysis. Your primary focus is helping security professionals with:

- Vulnerability assessment and exploitation techniques
- Network security testing methodologies  
- Social engineering tactics (for defensive training)
- Malware analysis and reverse engineering
- Security tool usage and configuration
- Compliance and security frameworks
- Incident response procedures
- Threat hunting techniques

Always provide:
1. Detailed technical explanations
2. Practical examples and code snippets when relevant
3. Security best practices and ethical considerations
4. Tool recommendations with proper usage instructions
5. References to industry standards (NIST, OWASP, etc.)

Remember: All advice should be used for legitimate security testing with proper authorization. Always emphasize ethical hacking principles and legal compliance.

Format your responses with clear sections, use technical terminology appropriately, and include relevant security tags for categorization.`;
  }

  /**
   * Initialize OpenAI client with proper error handling
   */
  initializeClient() {
    try {
      // Get API key from environment with fallback
      this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || '';
      
      if (!this.apiKey) {
        console.warn('OpenRouter Service: No API key found in environment variables');
        return;
      }

      if (!this.validateApiKeyFormat(this.apiKey)) {
        console.warn('OpenRouter Service: Invalid API key format detected');
        return;
      }

      this.client = new OpenAI({
        apiKey: this.apiKey,
        baseURL: 'https://openrouter.ai/api/v1',
        dangerouslyAllowBrowser: true,
        timeout: 30000, // 30 second timeout
        maxRetries: 2
      });

      console.log('OpenRouter Service: Client initialized successfully');
    } catch (error) {
      console.error('OpenRouter Service: Failed to initialize client:', error);
      this.client = null;
    }
  }

  /**
   * Validate API key format for OpenRouter
   * @param {string} apiKey - The API key to validate
   */
  validateApiKeyFormat(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') return false;
    
    // OpenRouter API keys start with 'sk-or-v1-'
    return apiKey.trim().startsWith('sk-or-v1-') && apiKey.trim().length > 20;
  }

  /**
   * Update API key and reinitialize client
   * @param {string} newApiKey - New API key
   */
  updateApiKey(newApiKey) {
    this.apiKey = newApiKey;
    // Update environment variable for current session
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      import.meta.env.VITE_OPENROUTER_API_KEY = newApiKey;
    }
    this.initializeClient();
  }

  /**
   * Send a chat message to the AI and get streaming response
   * @param {string} userMessage - The user's message
   * @param {Function} onChunk - Callback for streaming chunks
   * @param {Array} conversationHistory - Previous messages for context
   */
  async getChatCompletion(userMessage, onChunk = null, conversationHistory = []) {
    // Validate client and API key before making request
    if (!this.client) {
      throw {
        type: 'config_error',
        message: 'OpenAI client not initialized. Please check your API key configuration.',
        details: 'Client initialization failed',
        code: 'CLIENT_001',
        status: 401
      };
    }

    if (!this.validateApiKeyFormat(this.apiKey)) {
      throw {
        type: 'auth_error',
        message: 'Invalid OpenRouter API key format. Please check your configuration.',
        details: 'API key validation failed',
        code: 'AUTH_002',
        status: 401
      };
    }

    try {
      const messages = [
        { role: 'system', content: this.systemPrompt }
      ];

      // Add conversation history (keep last 10 messages for context)
      const recentHistory = conversationHistory.slice(-10);
      messages.push(...recentHistory);
      
      // Add current user message
      messages.push({ role: 'user', content: userMessage });

      const requestConfig = {
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      };

      if (onChunk) {
        // Streaming response
        const stream = await this.client.chat.completions.create({
          ...requestConfig,
          stream: true
        });

        let fullResponse = '';
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            fullResponse += content;
            onChunk(content);
          }
        }

        return this.formatResponse(fullResponse);
      } else {
        // Non-streaming response
        const response = await this.client.chat.completions.create(requestConfig);
        const content = response.choices[0].message.content;
        return this.formatResponse(content);
      }
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw this.handleAPIError(error);
    }
  }

  /**
   * Format the AI response with proper structure
   * @param {string} content - Raw AI response
   */
  formatResponse(content) {
    const response = {
      content: content.trim(),
      tags: this.extractTags(content),
      codeBlock: this.extractCodeBlock(content)
    };

    return response;
  }

  /**
   * Extract security-related tags from the response
   * @param {string} content - AI response content
   */
  extractTags(content) {
    const securityKeywords = [
      'penetration testing', 'vulnerability', 'exploit', 'malware',
      'social engineering', 'red team', 'blue team', 'nmap', 'metasploit',
      'sql injection', 'xss', 'csrf', 'owasp', 'nist', 'reconnaissance',
      'enumeration', 'privilege escalation', 'lateral movement',
      'persistence', 'evasion', 'cryptography', 'forensics',
      'incident response', 'threat hunting', 'compliance',
      'network security', 'web security', 'mobile security',
      'cloud security', 'authentication', 'authorization'
    ];

    const contentLower = content.toLowerCase();
    const foundTags = [];

    securityKeywords.forEach(keyword => {
      if (contentLower.includes(keyword.toLowerCase())) {
        // Capitalize first letter of each word
        const formattedTag = keyword.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        if (!foundTags.includes(formattedTag)) {
          foundTags.push(formattedTag);
        }
      }
    });

    // Limit to 3 most relevant tags
    return foundTags.slice(0, 3);
  }

  /**
   * Extract code blocks from the response
   * @param {string} content - AI response content
   */
  extractCodeBlock(content) {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
    const match = content.match(codeBlockRegex);
    
    if (match) {
      return {
        language: match[1] || 'text',
        content: match[2].trim()
      };
    }

    // Look for inline code or command examples
    const commandRegex = /`([^`]+)`/g;
    const commands = [];
    let commandMatch;
    
    while ((commandMatch = commandRegex.exec(content)) !== null) {
      commands.push(commandMatch[1]);
    }

    if (commands.length > 0) {
      return {
        language: 'bash',
        content: commands.join('\n')
      };
    }

    return null;
  }

  /**
   * Handle API errors with user-friendly messages
   * @param {Error} error - The API error
   */
  handleAPIError(error) {
    // Log full error for debugging
    console.error('Full API Error Details:', {
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type,
      headers: error.headers
    });

    if (error.status === 401 || error.message?.includes('401') || error.message?.includes('auth')) {
      return {
        type: 'auth_error',
        message: 'Authentication failed. Please verify your OpenRouter API key is correct and active.',
        details: `API Error: ${error.message || 'Invalid credentials'}`,
        code: 'AUTH_001',
        status: 401
      };
    }

    if (error.status === 429) {
      return {
        type: 'rate_limit',
        message: 'Rate limit exceeded. Please wait a moment before sending another message.',
        details: 'Too many requests',
        code: 'RATE_001',
        status: 429
      };
    }

    if (error.status === 500 || error.status >= 500) {
      return {
        type: 'server_error',
        message: 'OpenRouter service is temporarily unavailable. Please try again later.',
        details: 'Internal server error',
        code: 'SERVER_001',
        status: error.status || 500
      };
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.message?.includes('network')) {
      return {
        type: 'network_error',
        message: 'Network connection failed. Please check your internet connection.',
        details: 'Connection error',
        code: 'NETWORK_001',
        status: 0
      };
    }

    if (error.message?.includes('timeout')) {
      return {
        type: 'timeout_error',
        message: 'Request timed out. Please try again.',
        details: 'Request timeout',
        code: 'TIMEOUT_001',
        status: 408
      };
    }

    return {
      type: 'api_error',
      message: 'An unexpected error occurred while communicating with the AI service.',
      details: error.message || 'Unknown error',
      code: 'API_001',
      status: error.status || 500
    };
  }

  /**
   * Validate API key format (public method)
   */
  validateApiKey() {
    return this.validateApiKeyFormat(this.apiKey) && this.client !== null;
  }

  /**
   * Get current API key status for debugging
   */
  getApiKeyStatus() {
    return {
      hasApiKey: !!this.apiKey,
      isValidFormat: this.validateApiKeyFormat(this.apiKey),
      clientInitialized: !!this.client,
      keyPrefix: this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'No key'
    };
  }

  /**
   * Get conversation history format for API
   * @param {Array} messages - Chat messages
   */
  formatConversationHistory(messages) {
    return messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
  }
}

export default new OpenAIService();