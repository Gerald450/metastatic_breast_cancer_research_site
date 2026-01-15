interface PlaceholderProps {
  label: string;
  notes?: string[];
}

export default function Placeholder({ label, notes }: PlaceholderProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Planned – Future Development
        </p>
        <p className="mt-2 text-base font-semibold leading-relaxed text-gray-700 dark:text-gray-300">
          {label}
        </p>
      </div>
      {notes && notes.length > 0 && (
        <ul className="mt-4 space-y-2.5 text-left">
          {notes.map((note, index) => (
            <li
              key={index}
              className="flex items-start text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            >
              <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

