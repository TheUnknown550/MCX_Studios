import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaShieldAlt, FaUserShield, FaFileContract, FaEnvelope, FaMobile, FaChartLine } from 'react-icons/fa';

const SudokuPrivacy: React.FC = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: FaUserShield,
      content: [
        'Sudoku Master is designed with privacy in mind. We do not collect personal information such as names, email addresses, phone numbers, or any other personally identifiable information.',
        'The app operates entirely offline for gameplay, ensuring your puzzle-solving sessions remain private.',
        'No account creation or registration is required to use the full functionality of our app.'
      ]
    },
    {
      id: 'ads',
      title: 'Advertising and Analytics',
      icon: FaChartLine,
      content: [
        'We use Google AdMob to display advertisements within the app. AdMob may collect anonymized device information to provide relevant ads.',
        'Information collected by AdMob may include: Device identifier (advertising ID), Device type and operating system, App usage patterns, and Geographic location (country/region level only).',
        'This data is used solely for ad personalization and performance measurement.',
        'You can opt out of personalized advertising through your device settings (Android: Google Settings > Ads, iOS: Settings > Privacy & Security > Apple Advertising).'
      ]
    },
    {
      id: 'usage',
      title: 'How We Use Information',
      icon: FaMobile,
      content: [
        'Any data collected is used exclusively for:',
        '• Displaying relevant and personalized advertisements',
        '• Improving app performance and stability',
        '• Understanding general usage patterns to enhance user experience',
        '• Ensuring optimal game difficulty and feature development',
        'We do not use this information for any other purposes or share it with third parties beyond our advertising partners.'
      ]
    },
    {
      id: 'sharing',
      title: 'Information Sharing and Disclosure',
      icon: FaFileContract,
      content: [
        'We do not sell, trade, or otherwise transfer your information to third parties.',
        'The only data sharing occurs through Google AdMob for advertising purposes, which is governed by Google\'s Privacy Policy.',
        'We may disclose information if required by law or to protect our rights, property, or safety.',
        'In the event of a business transfer or merger, user information may be transferred as part of the business assets.'
      ]
    },
    {
      id: 'children',
      title: 'Children\'s Privacy Protection',
      icon: FaShieldAlt,
      content: [
        'Sudoku Master is suitable for all ages but is not specifically directed toward children under 13.',
        'We do not knowingly collect personal information from children under 13 years of age.',
        'If you are a parent or guardian and believe your child has provided personal information, please contact us immediately.',
        'Upon verification, we will take steps to remove such information from our systems.',
        'Parents can help protect their children\'s privacy by supervising their online and mobile app activities.'
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 p-6 sm:p-8 backdrop-blur-md rounded-3xl shadow-xl ${
          isDark 
            ? 'bg-gray-800/80 border border-gray-700/50' 
            : 'bg-white/80 border border-white/50'
        }`}>
          <div className="flex justify-center mb-4">
            <FaShieldAlt className={`w-12 h-12 sm:w-16 sm:h-16 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Sudoku Master Privacy Policy
          </h1>
          <p className={`text-lg sm:text-xl ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your privacy is our priority
          </p>
          <div className={`mt-4 inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            isDark 
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' 
              : 'bg-purple-100 text-purple-700 border border-purple-200'
          }`}>
            Last Updated: August 22, 2025
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                className={`p-6 sm:p-8 backdrop-blur-md rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isDark 
                    ? 'bg-gray-800/60 border border-gray-700/30 hover:bg-gray-800/80' 
                    : 'bg-white/60 border border-white/30 hover:bg-white/80'
                }`}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`p-3 rounded-xl ${
                    isDark 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                </div>
                
                <div className="ml-16 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      } ${paragraph.includes('•') ? 'font-medium' : ''}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className={`mt-8 sm:mt-12 p-6 sm:p-8 backdrop-blur-md rounded-2xl shadow-lg text-center ${
          isDark 
            ? 'bg-gradient-to-r from-purple-800/60 to-blue-800/60 border border-purple-700/30' 
            : 'bg-gradient-to-r from-purple-100/60 to-blue-100/60 border border-purple-200/30'
        }`}>
          <div className="flex justify-center mb-4">
            <FaEnvelope className={`w-8 h-8 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Contact Us
          </h2>
          <p className={`text-sm sm:text-base mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            If you have any questions, concerns, or requests regarding this privacy policy or your data, please don't hesitate to contact us:
          </p>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-gray-800/80 text-purple-300 border border-purple-500/30' 
              : 'bg-white/80 text-purple-700 border border-purple-200'
          }`}>
            <FaEnvelope className="w-4 h-4" />
            <a 
              href="mailto:support@mattcoshx@gmail.com"
              className="font-semibold hover:underline"
            >
              support@mattcoshx@gmail.com
            </a>
          </div>
          <p className={`mt-4 text-xs sm:text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We aim to respond to all inquiries within 48 hours
          </p>
        </div>

        {/* Data Rights Section */}
        <div className={`mt-6 sm:mt-8 p-6 sm:p-8 backdrop-blur-md rounded-2xl shadow-lg ${
          isDark 
            ? 'bg-green-800/30 border border-green-700/30' 
            : 'bg-green-50/60 border border-green-200/30'
        }`}>
          <h2 className={`text-lg sm:text-xl font-bold mb-3 ${
            isDark ? 'text-green-300' : 'text-green-800'
          }`}>
            Your Rights and Choices
          </h2>
          <div className="space-y-2 text-sm sm:text-base">
            <p className={`${isDark ? 'text-green-200' : 'text-green-700'}`}>
              • <strong>Opt-out of personalized ads:</strong> Adjust your device's advertising settings
            </p>
            <p className={`${isDark ? 'text-green-200' : 'text-green-700'}`}>
              • <strong>Data deletion:</strong> Uninstalling the app removes all local data
            </p>
            <p className={`${isDark ? 'text-green-200' : 'text-green-700'}`}>
              • <strong>Questions or concerns:</strong> Contact us using the information above
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className={`text-xs sm:text-sm ${
            isDark ? 'text-gray-500' : 'text-gray-600'
          }`}>
            This privacy policy is effective as of the date shown above and may be updated periodically.
            <br />
            Continued use of Sudoku Master constitutes acceptance of any changes to this policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SudokuPrivacy;
