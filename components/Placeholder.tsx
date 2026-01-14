interface PlaceholderProps {
  text?: string;
}

export default function Placeholder({ text = 'Content placeholder' }: PlaceholderProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  );
}

