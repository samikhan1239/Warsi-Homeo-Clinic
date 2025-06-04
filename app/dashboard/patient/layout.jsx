import Sidebar from "../../../components/Sidebar";

export default function PatientLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar role="PATIENT" />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
