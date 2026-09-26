import ProfileView from "@/components/ProfileView";
import { sampleProfile } from "@/lib/sample-profile";

export default function Home() {
  return <ProfileView {...sampleProfile} />;
}
