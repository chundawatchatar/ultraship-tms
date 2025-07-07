import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header";
import { EmployeeGrid } from "@/components/employee-grid";
import { EmployeeTiles } from "@/components/employee-tiles";
import { EmployeeDetail } from "@/components/employee-detail";
import { Pagination } from "@/components/pagination";
import { useEmployees } from "@/hooks/useEmployees1";
import type { Employee, PaginationInfo } from "@/types/employee";

export const Route = createFileRoute("/")({
  component: EmployeeDashboard,
});

function EmployeeDashboard() {
  const [isGridView, setIsGridView] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {
    data: employeesResponse,
    loading,
    error,
  } = useEmployees({ page: currentPage, limit: itemsPerPage });

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!employeesResponse)
      return { paginatedEmployees: [], paginationInfo: null };
    const paginatedEmployees = employeesResponse.employees.data;
    const total = employeesResponse.employees.total

    const paginationInfo: PaginationInfo = {
      currentPage,
      totalPages: Math.ceil(total / itemsPerPage),
      totalItems: total,
      itemsPerPage,
    };

    return { paginatedEmployees, paginationInfo };
  }, [employeesResponse, currentPage, itemsPerPage]);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDetailOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleViewToggle = (isGrid: boolean) => {
    setIsGridView(isGrid);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedEmployee(null);
  };

  const handleAction = () => {
    alert("working");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header isGridView={isGridView} onViewToggle={handleViewToggle} />
        <main className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-lg text-red-600 mb-2">
                Error loading employees
              </p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header isGridView={isGridView} onViewToggle={handleViewToggle} />

      <main className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading employees...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {isGridView ? (
              <EmployeeGrid
                employees={paginatedData.paginatedEmployees}
                onEmployeeClick={handleEmployeeClick}
              />
            ) : (
              <EmployeeTiles
                employees={paginatedData.paginatedEmployees}
                onEmployeeClick={handleEmployeeClick}
                onAction={handleAction}
              />
            )}

            {paginatedData.paginationInfo && (
              <Pagination
                paginationInfo={paginatedData.paginationInfo}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </div>
        )}
      </main>

      {/* Employee Detail Modal */}
      <EmployeeDetail
        employee={selectedEmployee}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onAction={handleAction}
      />
    </div>
  );
}
