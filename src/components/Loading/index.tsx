export const Loading = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-90 z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-highlight border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white text-lg font-bold">Carregando...</span>
        </div>
      </div>
    );
  };
  