import React from "react";
import CreatePostBox from "../components/atoms/post/CreatePostBox";
import PostContainer from "./PostContainer";

const FeedContainer: React.FC = () => {
  return (
    <div className="m-auto w-[42.5rem]">
      <div className="mt-6 h-full w-full pb-5">
        {/* Create Post       */}
        <CreatePostBox />
        {/* All posts */}
        <PostContainer />
      </div>
    </div>
  );
};

export default FeedContainer;
