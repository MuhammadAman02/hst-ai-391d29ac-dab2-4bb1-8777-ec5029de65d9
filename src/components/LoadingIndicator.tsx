const LoadingIndicator = () => {
  console.log('LoadingIndicator rendered');
  
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-ai-blue-500 rounded-full animate-typing"></div>
        <div className="w-2 h-2 bg-ai-blue-500 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-ai-blue-500 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-sm text-gray-500">AI is thinking...</span>
    </div>
  );
};

export default LoadingIndicator;