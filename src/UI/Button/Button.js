import React from 'react';
import { MdDehaze } from 'react-icons/md';

const Button = ({ children, small, optinText, shortcutKey, bg, bgOpacity }) => {
  return (
    <button>
      <div
        className={
          'group relative flex items-center justify-center rounded' +
          (small ? ' h-5 w-5' : ' p-1 h-7 w-7') +
          (bg ? ` hover:bg-${bg}-${bgOpacity}` : ' hover:bg-red-100') +
          ' hover:bg-opacity-25'
        }
      >
        <>{children}</>
        {optinText ? (
          <div className="hidden group-hover:block absolute whitespace-nowrap w-auto transform translate-y-full z-10">
            <div className="flex h-8 space-x-2 items-center text-xs bg-gray-800 py-1 px-2 rounded">
              <span className="text-xs">{optinText}</span>
              {shortcutKey ? (
                <span className="flex h-5 w-5 items-center justify-center block bg-gray-600 py-1 px-2 text-gray-300 rounded">
                  {shortcutKey}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </button>
  );
};

export default Button;
