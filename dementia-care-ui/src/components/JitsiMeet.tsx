import { JitsiMeeting } from '@jitsi/react-sdk';
import { useAuth } from '../contexts/AuthContextProvider';

const JitsiMeet = () => {
  
  return (
    <JitsiMeeting
        roomName="PleaseUseAGoodRoomName"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: "Abhishek",
          email: 'abhishekalien09@gmail.com'
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "400px";
        }}
      />
  )
}

export default JitsiMeet
