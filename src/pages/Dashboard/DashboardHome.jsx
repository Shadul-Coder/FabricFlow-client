const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-(--color-heading) mb-4">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Welcome!</h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
