interface VisualPlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
}

export default function VisualPlaceholder({
  width = '100%',
  height = '300px',
  label = 'Visual placeholder',
}: VisualPlaceholderProps) {
  return (
    <div
      className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
      style={{ width, height }}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

