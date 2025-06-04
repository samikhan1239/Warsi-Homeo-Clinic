import Sidebar from "../../../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar role="ADMIN" />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
