import { useAuth } from "../contexts/AuthContextProvider";

const Stories = () => {
  const { user } = useAuth();

  return (
    <>
      {user !== null && (
        <p>
          Hi {user.name} with uid as {user.uid}
        </p>
      )}
    </>
  );
};

export default Stories;
