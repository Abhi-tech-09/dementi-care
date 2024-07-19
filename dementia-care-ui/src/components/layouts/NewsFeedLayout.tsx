import React, { PropsWithChildren } from 'react';
import MainContentContainer from '../common';

const NewsFeedLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className="flex min-h-full w-full flex-col">
      {/* <Navbar /> */}
      <MainContentContainer>
        <div className="flex">
          {/* <LeftSidebar /> */}
          <div className="flex-1">{children}</div>
          {/* <RightSidebar /> */}
        </div>
      </MainContentContainer>
    </div>
  );
};

export default NewsFeedLayout;
