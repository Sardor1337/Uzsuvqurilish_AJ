import React from 'react';
import { 
  UserGroupIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const UserHamkorlar = () => {
  const partners = [
    { name: 'Developers', Icon: UserGroupIcon },
    { name: 'Banks', Icon: BuildingOfficeIcon },
    { name: 'Governments', Icon: BuildingLibraryIcon },
    { name: 'EDGE Experts', Icon: SparklesIcon },
  ];

  return (
    <div className="bg-white py-16 px-[4rem]">
      <div className="flex  items-center justify-between ">
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Partnering for a Greener Future:
            <br className="hidden md:block" />
            Everyone Benefits from Sustainable Building
          </h2>
          <p className="text-lg text-gray-700 max-w-lg">
            By uniting designers, developers, financiers, and policymakers, EDGE fosters collaboration
            and accelerates the adoption of sustainable building practices.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 lg:mt-0 lg:w-1/2">
          {partners.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 bg-gradient-to-r from-[#2CF8A2] to-[#565CFD] hover:cursor-pointer">
                <Icon className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHamkorlar;
