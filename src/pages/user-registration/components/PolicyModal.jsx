import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PolicyModal = ({ isOpen, onClose, type = 'terms' }) => {
  if (!isOpen) return null;

  const termsContent = `Welcome to TripDuo! These Terms of Service govern your use of our travel companion matching platform.

1. ACCEPTANCE OF TERMS
By creating an account and using TripDuo, you agree to be bound by these terms and conditions.

2. USER ELIGIBILITY
- You must be at least 18 years old to use our service
- You must provide accurate and complete information during registration
- You are responsible for maintaining the confidentiality of your account

3. PLATFORM USAGE
- TripDuo facilitates connections between travelers seeking opposite-gender travel companions
- Users must interact respectfully and follow community guidelines
- Harassment, inappropriate behavior, or misuse of the platform is strictly prohibited

4. SAFETY AND VERIFICATION
- We encourage users to verify their identity and travel documents
- Users are responsible for their own safety during travel arrangements
- TripDuo provides tools but cannot guarantee the safety of offline interactions

5. MATCHING ALGORITHM
- Our algorithm matches users based on travel preferences, destinations, and compatibility
- Matches are suggestions only; users have full control over their connections
- We do not guarantee successful matches or travel arrangements

6. PRIVACY AND DATA
- Your personal information is protected according to our Privacy Policy
- Profile information may be visible to potential matches
- We may use aggregated data to improve our services

7. PAYMENT AND FEES
- Account creation is free; premium features may require payment
- Payment splitting features are provided as a convenience tool
- Users are responsible for their own travel expenses and arrangements

8. PROHIBITED ACTIVITIES
- Creating fake profiles or misrepresenting yourself
- Using the platform for commercial purposes without permission
- Sharing inappropriate content or engaging in harassment
- Attempting to circumvent safety features or verification processes

9. LIMITATION OF LIABILITY
TripDuo is not responsible for:
- Actions or behavior of other users
- Travel arrangements made between users
- Loss, damage, or injury during travel
- Technical issues or service interruptions

10. TERMINATION
We reserve the right to suspend or terminate accounts that violate these terms or engage in inappropriate behavior.

11. CHANGES TO TERMS
We may update these terms periodically. Continued use of the platform constitutes acceptance of updated terms.

12. CONTACT INFORMATION
For questions about these terms, contact us at legal@tripduo.com

Last updated: September 4, 2025`;

  const privacyContent = `TripDuo Privacy Policy

We respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.

1. INFORMATION WE COLLECT

Personal Information:
- Name, email address, date of birth, gender, location
- Profile photos and travel preferences
- Communication history within the platform
- Travel history and reviews

Automatically Collected:
- Device information and IP address
- Usage patterns and platform interactions
- Location data (with your permission)
- Cookies and similar tracking technologies

2. HOW WE USE YOUR INFORMATION

To Provide Services:
- Create and maintain your account
- Facilitate matching with compatible travel partners
- Enable communication between users
- Process payments and transactions

To Improve Our Platform:
- Analyze usage patterns and preferences
- Develop new features and services
- Conduct research and analytics
- Provide customer support

For Safety and Security:
- Verify user identities
- Detect and prevent fraud or abuse
- Enforce our terms of service
- Protect user safety and platform integrity

3. INFORMATION SHARING

We may share your information with:
- Other users (profile information for matching purposes)
- Service providers who help operate our platform
- Law enforcement when required by law
- Business partners for integrated services (with your consent)

We do not sell your personal information to third parties.

4. DATA SECURITY

We implement industry-standard security measures:
- Encryption of sensitive data
- Secure data transmission protocols
- Regular security audits and updates
- Limited access to personal information

5. YOUR RIGHTS AND CHOICES

You have the right to:
- Access and update your personal information
- Delete your account and associated data
- Control visibility of your profile information
- Opt out of marketing communications
- Request data portability

6. DATA RETENTION

We retain your information:
- While your account is active
- For legitimate business purposes
- As required by law
- Until you request deletion (subject to legal requirements)

7. INTERNATIONAL TRANSFERS

Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place.

8. CHILDREN'S PRIVACY

Our service is not intended for users under 18. We do not knowingly collect information from minors.

9. COOKIES AND TRACKING

We use cookies to:
- Remember your preferences
- Analyze platform usage
- Provide personalized experiences
- Enable certain platform features

You can control cookie settings through your browser.

10. THIRD-PARTY SERVICES

Our platform may integrate with third-party services (maps, payment processors). Their privacy policies apply to their services.

11. CHANGES TO THIS POLICY

We may update this privacy policy periodically. We'll notify you of significant changes through the platform or email.

12. CONTACT US

For privacy-related questions or requests:
- Email: privacy@tripduo.com
- Address: TripDuo Privacy Team, 123 Travel Street, San Francisco, CA 94105

Last updated: September 4, 2025`;

  const content = type === 'terms' ? termsContent : privacyContent;
  const title = type === 'terms' ? 'Terms of Service' : 'Privacy Policy';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-elevated max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed font-sans">
              {content}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <Button
            variant="default"
            onClick={onClose}
            fullWidth
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;