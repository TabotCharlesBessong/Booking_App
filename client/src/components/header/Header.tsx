import React from 'react';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'nav',
      { className: 'p-4 bg-gray-200' },
      React.createElement(
        'ul',
        { className: 'flex space-x-4' },
        React.createElement(
          'li',
          { className: 'mr-4' },
          React.createElement(
            'a',
            {
              href: '#',
              className: 'px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white',
            },
            'Home'
          )
        ),
        React.createElement(
          'li',
          { className: 'mr-4' },
          React.createElement(
            'a',
            {
              href: '#',
              className: 'px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white',
            },
            'About'
          )
        ),
        React.createElement(
          'li',
          { className: 'mr-4' },
          React.createElement(
            'a',
            {
              href: '#',
              className: 'px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white',
            },
            'Services'
          )
        ),
        React.createElement(
          'li',
          { className: 'mr-4' },
          React.createElement(
            'a',
            {
              href: '#',
              className: 'px-4 py-2 rounded text-black-800 hover:bg-gray-800 hover:text-white',
            },
            'Contact'
          )
        )
      )
    )
  );
};

export default Header;
