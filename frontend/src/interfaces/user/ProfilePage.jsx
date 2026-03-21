import EditProfile from "../../components/user/EditProfile";
import BackButton from "../../components/ui/BackButton";

function ProfilePage() {
  return (
    <div className="main-container">
      <BackButton />
      <EditProfile />
    </div>
  );
}

export default ProfilePage;
