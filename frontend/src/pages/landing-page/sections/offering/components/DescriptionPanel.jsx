export function DescriptionPanel({ description }) {
  return (
    <div className="bg-black px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
