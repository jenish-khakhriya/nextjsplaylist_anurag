interface LoaderProps {
  text?: string;
  fullPage?: boolean;
}

export default function Loader({ text = "Loading...", fullPage = false }: LoaderProps) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        {text && <p className="mt-4 text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}
